using Microsoft.Extensions.Options;

namespace server.Application;

public class AuthService
{
    private readonly TokenService _token;
    private readonly string _adminUsername;
    private readonly string _passwordHash;

    public AuthService(TokenService token, IOptions<AdminSettings> admin)
    {
        _token = token;

        var settings = admin.Value;
        _adminUsername = !string.IsNullOrEmpty(settings.Username)
            ? settings.Username
            : Environment.GetEnvironmentVariable("ADMIN_USERNAME") ?? string.Empty;

        var password = !string.IsNullOrEmpty(settings.Password)
            ? settings.Password
            : Environment.GetEnvironmentVariable("ADMIN_PASSWORD") ?? string.Empty;

        if (string.IsNullOrEmpty(_adminUsername) || string.IsNullOrEmpty(password))
        {
            throw new InvalidOperationException("Admin credentials are not configured.");
        }

        _passwordHash = password.StartsWith("$2")
            ? password
            : BCrypt.Net.BCrypt.HashPassword(password);
    }

    public Task<string> LoginService(LoginDTO login)
    {
        ArgumentNullException.ThrowIfNull(login);

        if (!string.Equals(login.Username, _adminUsername, StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException("Invalid email for login");
        }

        if (string.IsNullOrEmpty(login.Password)
            || !BCrypt.Net.BCrypt.Verify(login.Password, _passwordHash))
        {
            throw new UnauthorizedAccessException("Invalid password for login");
        }

        return Task.FromResult(_token.GenerateTokenAsync(login.Username));
    }

    public Task<UserProfileDTO> VerifyUserService(string? username)
    {
        if (string.IsNullOrWhiteSpace(username))
        {
            throw new UnauthorizedAccessException("User is not authenticated.");
        }

        if (!string.Equals(username, _adminUsername, StringComparison.OrdinalIgnoreCase))
        {
            throw new UnauthorizedAccessException("User profile could not be verified.");
        }

        return Task.FromResult(new UserProfileDTO
        {
            Username = username
        });
    }

    public Task RemoveVerificationService()
    {
        return Task.CompletedTask;
    }
}