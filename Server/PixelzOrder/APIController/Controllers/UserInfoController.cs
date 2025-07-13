
using Microsoft.AspNetCore.Mvc;

namespace APIController
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserInfoController : BaseController
    {
        public UserInfoController()
        {
            // Constructor logic if needed
        }

        [Route("")]
        [HttpGet]
        public IActionResult GetUserInfo()
        {
            // This method can be used to retrieve user information.
            // For now, it returns a simple message.
            return Ok(new { Message = "User information retrieved successfully." });
        }
    }
}
