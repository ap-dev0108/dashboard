using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using server.Application;

namespace server.Presentation;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _auth;

    public AuthController(AuthService auth)
    {
        _auth = auth;
    }

    [AllowAnonymous]
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDTO loginDTO)
    {
        var token = await _auth.LoginService(loginDTO);

        return Ok(new Response<string>
        {
            Success = true,
            Message = "Login success",
            Data = token
        });
    }

    [Authorize]
    [HttpGet("verify")]
    public async Task<IActionResult> VerifyProfile()
    {
        var username = User.FindFirstValue(JwtRegisteredClaimNames.Sub)
            ?? User.FindFirstValue(ClaimTypes.NameIdentifier);

        var profile = await _auth.VerifyUserService(username);

        return Ok(new Response<UserProfileDTO>
        {
            Success = true,
            Message = "User verified",
            Data = profile
        });
    }

    [Authorize]
    [HttpDelete("verify")]
    public async Task<IActionResult> RemoveVerification()
    {
        await _auth.RemoveVerificationService();

        return Ok(new Response<string>
        {
            Success = true,
            Message = "Verification removed. Discard the access token on the client.",
            Data = string.Empty
        });
    }
}
