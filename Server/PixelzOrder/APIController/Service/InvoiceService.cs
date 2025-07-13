using APIController.BO;
using System.Text.Json;

namespace APIController.Service
{
    public class InvoiceService
    {
        public ServiceResult CreateInvoice(List<Order> orders)
        {
            // Validate the orders object  
            if (orders == null || orders.Count == 0)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Invalid request data.",
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }

            // Here you would typically create the invoice logic  
            // For demonstration, we will return a success message with the request data  
            var invoiceFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "mockData", "invoice.json");

            // Get existing invoices from invoice.json  
            List<Invoice> invoices = File.Exists(invoiceFilePath)
                ? JsonSerializer.Deserialize<List<Invoice>>(File.ReadAllText(invoiceFilePath)) ?? new()
                : new();

            // Simulate creating an invoice for each order number
            foreach (var order in orders)
            {
                Console.WriteLine($"Creating invoice for order: {order}");
    //            {
    //                "InvoiceNo": "INV0010",
    //"OrderNo": "ORD0010",
    //"InvoiceDate": "2024-02-04",
    //"Amount": 2344.04,
    //"IssuedBy": "Eve"
    //            },
                var invoice = new Invoice
                {
                    InvoiceNo = $"INV{DateTime.Now.Ticks}",
                    OrderNo = order.OrderNo,
                    InvoiceDate = DateTime.Now,
                    Amount = order.TotalAmount, // Example amount, you can replace it with actual logic to calculate the amount
                    IssuedBy = order.CreatedBy // Example issuer, you can replace it with actual logic to get the issuer
                };
                // Add the invoice to the list
                invoices.Add(invoice);
                Console.WriteLine($"Invoice {invoice.InvoiceNo} created for order {order.OrderNo}.");
            }
            // Save updated invoices back to invoice.json
            var updatedJson = JsonSerializer.Serialize(invoices, new JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(invoiceFilePath, updatedJson);
            return new ServiceResult
            {
                Success = true,
                Message = "Invoices created successfully.",
                Data = orders,
                StatusCode = StatusCodes.Status200OK
            };
        }
    }
}
