using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using server.Application;


namespace server.Presentation;

[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AdminSettings _adminSettings;

    public AuthController(IOptions<AdminSettings> adminSettings)
    {
        _adminSettings = adminSettings.Value;
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] string email, string password)
    {
        if (!string.Equals(email, _adminSettings.Email, StringComparison.OrdinalIgnoreCase))
        {
            return Unauthorized(new Response<string>
            {
                Success = false,
                Message = "Invalid email"
            });
        }

        if (!BCrypt.Net.BCrypt.Verify(password, _adminSettings.PasswordHash))
        {
            return Unauthorized(new Response<string>
            {
                Success = false,
                Message = "Invalid password."
            });
        }

        return Ok(new Response<string>
        {
            Success = true,
            Message = "Login done"
        });
    }
}