using APIController.Service;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace APIController.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : BaseController
    {
        [HttpPost("Checkout")]
        public ServiceResult Checkout([FromBody] List<string> orderNos)
        {
            // Validate the pagingRequest object
            if (orderNos == null)
            {
                return new ServiceResult
                {
                    Success = false,
                    Message = "Invalid request data.",
                    StatusCode = StatusCodes.Status400BadRequest
                };
            }
            // Here you would typically process the order checkout logic
            // For demonstration, we will return a success message with the request data
            PaymentService paymentService = new PaymentService();
            paymentService.ProcessPayment(orderNos);

            return new ServiceResult
            {
                Success = true,
                Message = "Order checked out successfully.",
                Data = orderNos,
                StatusCode = StatusCodes.Status200OK
            };
        }
    }
}
