namespace APIController.BO
{
    public class Invoice
    {
        public string InvoiceNo { get; set; } = string.Empty;

        public string OrderNo { get; set; } = string.Empty;

        public DateTime InvoiceDate { get; set; }

        public decimal Amount { get; set; }

        public string IssuedBy { get; set; } = string.Empty;


        }
}
