using APIController.BO;

namespace APIController.Service
{
    public class PaymentService
    {
        public ServiceResult ProcessPayment(List<string> orderNos)
        {
            // Validate the pagingRequest object
            if (orderNos == null || orderNos.Count == 0)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Invalid request data.",
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            // Here you would typically process the payment logic
            // For demonstration, we will return a success message with the request data

            // send email notification successfully checkout
            EmailService emailService = new EmailService();
            emailService.SendEmailNotification(orderNos);


            // Load orders from order.json
            var orderFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "mockData", "order.json");

            List<Order> orders = new List<Order>();
            if (File.Exists(orderFilePath))
            {
                var json = File.ReadAllText(orderFilePath);
                orders = System.Text.Json.JsonSerializer.Deserialize<List<Order>>(json) ?? new List<Order>();
            }

            // Simulate processing payment for each order number
            foreach (var orderNo in orderNos)
            {
                var order = orders.FirstOrDefault(o => o.OrderNo == orderNo);
                Console.WriteLine($"Processing payment for order: {orderNo}");

                // update status Completed to each order number
                Console.WriteLine($"Order {orderNo} status updated to Completed.");

                // Update Checkout = true for successful order
                if (order != null)
                {
                    order.Checkout = true;
                    order.Status = "Checkedout";
                }
            }

            // Save updated orders back to order.json
            var updatedJson = System.Text.Json.JsonSerializer.Serialize(orders, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(orderFilePath, updatedJson);

            // create invoice for each order number using invoiceservice and save to invoice.json
            InvoiceService invoiceService = new InvoiceService();
            invoiceService.CreateInvoice(orders.Where(x => orderNos.Exists(y => y == x.OrderNo)).ToList());

            // push order to be processed by our internal system using production service
            // This is a placeholder for the actual logic to push orders to the production service
            ProductionService productionService = new ProductionService();
            productionService.PushOrdersToProduction(orders.Where(x => orderNos.Exists(y => y == x.OrderNo)).ToList());


            return new ServiceResult
            {
                Success = true,
                Message = "Payment processed successfully.",
                Data = orderNos,
                StatusCode = StatusCodes.Status200OK
            };
        }

    }
}
