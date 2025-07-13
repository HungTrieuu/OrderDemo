

using Microsoft.AspNetCore.Mvc;

namespace APIController
{
    [ApiController]
    public abstract class BaseController : ControllerBase
    {
        [HttpPost("Paging")]
        public ServiceResult Paging(PagingRequest pagingRequest)
        {
            var result = new ServiceResult();
            try
            {
                var moduleName = pagingRequest.ModuleName;
                if (string.IsNullOrEmpty(moduleName))
                {
                    result.Success = false;
                    result.Message = "ModuleName is required.";
                    result.StatusCode = 400;
                    return result;
                }

                List<Dictionary<string, object>>? dataList;

                var mockDataPath = Path.Combine(AppContext.BaseDirectory, "mockData", $"{moduleName}.json");
                if (!System.IO.File.Exists(mockDataPath))
                {
                    result.Success = false;
                    result.Message = $"Mock data file not found: {mockDataPath}";
                    result.StatusCode = 404;
                    return result;
                }

                var json = System.IO.File.ReadAllText(mockDataPath);
                dataList = System.Text.Json.JsonSerializer.Deserialize<List<Dictionary<string, object>>>(json);
                if (dataList == null)
                {
                    result.Success = false;
                    result.Message = "Failed to deserialize mock data.";
                    result.StatusCode = 500;
                    return result;
                }
                dataList = dataList.Select(d => new Dictionary<string, object>(d)).ToList();

                // Filtering (basic, by equality)
                if (pagingRequest.FilterObjects != null && pagingRequest.FilterObjects.Any())
                {
                    foreach (var filter in pagingRequest.FilterObjects)
                    {
                        dataList = dataList
                            .Where(d => d.ContainsKey(filter.FieldName) && d[filter.FieldName]?.ToString().Contains(filter.Value, StringComparison.OrdinalIgnoreCase) == true)
                            .ToList();
                    }
                }

                // Sorting
                if (!string.IsNullOrEmpty(pagingRequest.Sort))
                {
                    var sortField = pagingRequest.Sort.TrimStart('-');
                    var descending = pagingRequest.Sort.StartsWith("-");
                    dataList = descending
                        ? dataList.OrderByDescending(d => d.ContainsKey(sortField) ? d[sortField] : null).ToList()
                        : dataList.OrderBy(d => d.ContainsKey(sortField) ? d[sortField] : null).ToList();
                }

                // Paging
                var pageIndex = pagingRequest.PageIndex < 1 ? 0 : pagingRequest.PageIndex;
                var pageSize = pagingRequest.PageSize < 1 ? 10 : pagingRequest.PageSize;
                var pagedData = dataList.Skip((pageIndex) * pageSize).Take(pageSize).ToList();

                result.Success = true;
                result.Message = "Success";
                result.StatusCode = 200;
                result.Data = new
                {
                    Items = pagedData,
                    Total = dataList.Count
                };
            }
            catch (Exception ex)
            {
                result.Success = false;
                result.Message = ex.Message;
                result.StatusCode = 500;
            }

            return result;
        }

        [HttpDelete("Delete/{moduleName}/{keyField}/{keyValue}")]
        public ServiceResult Delete(string moduleName, string keyField, string keyValue)
        {
            var result = new ServiceResult();
            try
            {
                if (string.IsNullOrEmpty(moduleName) || string.IsNullOrEmpty(keyField) || string.IsNullOrEmpty(keyValue))
                {
                    result.Success = false;
                    result.Message = "ModuleName, KeyField, and KeyValue are required.";
                    result.StatusCode = 400;
                    return result;
                }
                var mockDataPath = Path.Combine(AppContext.BaseDirectory, "mockData", $"{moduleName}.json");
                List<Dictionary<string, object>> dataList;

                if (!System.IO.File.Exists(mockDataPath))
                {
                    result.Success = false;
                    result.Message = $"Mock data file not found: {mockDataPath}";
                    result.StatusCode = 404;
                    return result;
                }
                var json = System.IO.File.ReadAllText(mockDataPath);
                dataList = System.Text.Json.JsonSerializer.Deserialize<List<Dictionary<string, object>>>(json);
                if (dataList == null)
                {
                    result.Success = false;
                    result.Message = "Failed to deserialize mock data.";
                    result.StatusCode = 500;
                    return result;
                }
                List<string> deleteValues = keyValue.Split(',').Select(k => k.Trim()).ToList();

                foreach (var value in deleteValues)
                {
                    // Find the index of the item to delete
                    var index = dataList.FindIndex(d => d.ContainsKey(keyField) && d[keyField]?.ToString() == value);
                    if (index == -1)
                    {
                        continue; // Skip if not found
                    }
                    // Remove the item
                    dataList.RemoveAt(index);
                }

                // Save back to file
                var updatedJson = System.Text.Json.JsonSerializer.Serialize(dataList, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                System.IO.File.WriteAllText(mockDataPath, updatedJson);
                // Update cache
                result.Success = true;
                result.Message = "Deleted successfully.";
                result.StatusCode = 200;
            }
            catch (Exception ex)
            {
                result.Success = false;

            }
            return result;
        }

        [HttpPost("")]
        public ServiceResult Post([FromBody] Dictionary<string, object> data)
        {
            var result = new ServiceResult
            {
                Success = true,
                Data = data,
                StatusCode = 200
            };

            if (data != null && data.ContainsKey("ModuleName") && data.ContainsKey("entityState"))
            {
                var moduleName = data["ModuleName"]?.ToString();
                var entityState = data["entityState"]?.ToString()?.ToLower();

                if (string.IsNullOrEmpty(moduleName))
                {
                    result.Success = false;
                    result.Message = "ModuleName is required.";
                    result.StatusCode = 400;
                    return result;
                }

                if (string.IsNullOrEmpty(entityState) || (entityState != "insert" && entityState != "update"))
                {
                    result.Success = false;
                    result.Message = "entityState must be 'insert' or 'update'.";
                    result.StatusCode = 400;
                    return result;
                }

                var mockDataPath = Path.Combine(AppContext.BaseDirectory, "mockData", $"{moduleName}.json");
                List<Dictionary<string, object>> dataList;


                dataList = new List<Dictionary<string, object>>();
                if (System.IO.File.Exists(mockDataPath))
                {
                    var json = System.IO.File.ReadAllText(mockDataPath);
                    var deserialized = System.Text.Json.JsonSerializer.Deserialize<List<Dictionary<string, object>>>(json);
                    if (deserialized != null)
                        dataList = deserialized;
                }

                var keyField = moduleName + "No";
                var keyValue = data.ContainsKey(keyField) ? data[keyField]?.ToString() : null;

                if (string.IsNullOrEmpty(keyValue))
                {
                    result.Success = false;
                    result.Message = $"Key field '{keyField}' is required.";
                    result.StatusCode = 400;
                    return result;
                }

                if (entityState == "insert")
                {
                    var exists = dataList.Any(d => d.ContainsKey(keyField) && d[keyField]?.ToString() == keyValue);
                    if (exists)
                    {
                        result.Success = false;
                        result.Message = $"Duplicate entry for {keyField}: {keyValue}";
                        result.StatusCode = 409;
                        return result;
                    }
                    dataList.Add(new Dictionary<string, object>(data));
                }
                else if (entityState == "update")
                {
                    var index = dataList.FindIndex(d => d.ContainsKey(keyField) && d[keyField]?.ToString() == keyValue);
                    if (index == -1)
                    {
                        result.Success = false;
                        result.Message = $"No record found to update with {keyField}: {keyValue}";
                        result.StatusCode = 404;
                        return result;
                    }
                    dataList[index] = new Dictionary<string, object>(data);
                }

                // Save back to file
                var updatedJson = System.Text.Json.JsonSerializer.Serialize(dataList, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
                System.IO.File.WriteAllText(mockDataPath, updatedJson);

                // Update cache
                result.Success = true;
                result.Message = entityState == "insert" ? "Created successfully." : "Updated successfully.";
                result.StatusCode = 200;
                result.Data = data;
            }
            else
            {
                result.Success = false;
                result.Message = "Invalid data format.";
                result.StatusCode = 400;
            }

            return result;
        }
    }
}
