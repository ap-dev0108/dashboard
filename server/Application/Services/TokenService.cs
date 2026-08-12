using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using server.Application.Configuration;

namespace server.Application;

public class TokenService
{
    private readonly TokenSettings _token;
    public TokenService(IOptions<TokenSettings> token)
    {
        _token = token.Value;
    }

    public string GenerateTokenAsync(string username)
    {
        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_token.Key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _token.Issuer,
            audience: _token.Audience,
            claims: claims,
            expires: DateTime.UtcNow.AddMinutes(_token.AccessTokenLifetimeMinutes),
            signingCredentials: creds
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}