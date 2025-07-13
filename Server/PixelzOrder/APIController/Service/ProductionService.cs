using APIController.BO;

namespace APIController.Service
{
    public class ProductionService
    {
        public ProductionService() { }

        public bool PushOrdersToProduction(List<Order> orders)
        {
            // Validate the orderNos object
            if (orders == null || orders.Count == 0)
            {
                return false;
            }
            // Here you would typically push orders to the production system
            // update Status column to "In Production" for each order number
            foreach (var order in orders)
            {
                // Simulate pushing order to production for each order number
                // In a real application, you would call an API or service here
                Console.WriteLine($"Pushing order {order.OrderNo} to production with status 'In Production'.");
                // Update the status of the order to "In Production"
                order.Status = "In Production";
            }
            // Simulate successful push to production
            Console.WriteLine("All orders pushed to production successfully.");

            // Here you would typically save the updated orders back to a database or file
            var orderFilePath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "mockData", "order.json");
            // Load existing orders from order.json
            List<Order> existingOrders = new List<Order>();
            if (File.Exists(orderFilePath))
            {
                var json = File.ReadAllText(orderFilePath);
                existingOrders = System.Text.Json.JsonSerializer.Deserialize<List<Order>>(json) ?? new List<Order>();
            }
            // Update the existing orders with the new status
            foreach (var order in orders)
            {
                var existingOrder = existingOrders.FirstOrDefault(o => o.OrderNo == order.OrderNo);
                if (existingOrder != null)
                {
                    existingOrder.Status = order.Status; // Update the status to "In Production"
                }
            }
            // Save updated orders back to order.json
            var updatedJson = System.Text.Json.JsonSerializer.Serialize(existingOrders, new System.Text.Json.JsonSerializerOptions { WriteIndented = true });
            File.WriteAllText(orderFilePath, updatedJson);
            // Return true to indicate success`
            Console.WriteLine("Orders updated successfully in order.json.");

            return true;
        }
    }
}
