namespace APIController.BO
{
    public class Order
    {
        public string OrderNo { get; set; } = string.Empty;

        public string Status { get; set; } = string.Empty;

        public string CreatedBy { get; set; } = string.Empty;

        public decimal TotalAmount { get; set; }
        public bool Checkout { get; set; }
        // Add other properties as needed
    }
}
