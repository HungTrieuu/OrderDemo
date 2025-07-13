namespace APIController
{

    //    {
    //    "pageSize": 5,
    //    "sort": ""
    //}
    public class PagingRequest
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; } = 10; // Default page size
        public string Sort { get; set; } = string.Empty; // Default sort order (empty means no sorting)

        public string ModuleName { get; set; } = string.Empty;

        public List<FilterObject>? FilterObjects { get; set; }
    }

    public class FilterObject
    {
        public string FieldName { get; set; } = string.Empty; // Field to filter on
        public string Operator { get; set; } = string.Empty; // Operator for filtering (e.g., "equals", "contains")
        public string Value { get; set; } = string.Empty; // Value to filter by
        public FilterObject() { }
        public FilterObject(string field, string @operator, string value)
        {
            FieldName = field;
            Operator = @operator;
            Value = value;
        }
    }
}
