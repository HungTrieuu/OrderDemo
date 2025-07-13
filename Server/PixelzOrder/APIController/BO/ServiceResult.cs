

namespace APIController
{
    public class ServiceResult
    {
        public ServiceResult() { }

        public bool Success { get; set; } = true; // Default to true

        public string Message { get; set; } = string.Empty; // Default to empty string

        public object? Data { get; set; } // Nullable object to hold any data

        public int StatusCode { get; set; } = 200; // Default to HTTP 200 OK

    }
}
