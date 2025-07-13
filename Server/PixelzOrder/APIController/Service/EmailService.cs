namespace APIController.Service
{
    public class EmailService
    {
        public bool SendEmailNotification(List<string> orderNos)
        {
            // Validate the orderNos object
            if (orderNos == null || orderNos.Count == 0)
            {
                return false;
            }
            // Here you would typically send email notifications
            // For demonstration, we will return a success message with the request data
            foreach (var orderNo in orderNos)
            {
                // Simulate sending an email notification for each order number
                // In a real application, you would call an email service here
                Console.WriteLine($"Email notification sent for order: {orderNo}");
            }
            return true;
        }
    }
}
