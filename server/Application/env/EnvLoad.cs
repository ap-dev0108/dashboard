namespace server.Application;

public class EnvLoad
{
    public string adminEmail {get; set;}
    public string adminPassword {get; set;}
    public string connectionString {get; set;}
    public string tokenString {get; set;}

    public EnvLoad()
    {
        adminEmail = GetRequired("ADMIN_USERNAME");
        adminPassword = GetRequired("ADMIN_PASSWORD");
        connectionString = GetRequired("DATABASE_URL");
        tokenString = GetRequired("");
    }

    public static string GetRequired(string key)
    {
        return Environment.GetEnvironmentVariable(key) ??
            throw new KeyNotFoundException($"Environment: {key} cannot be found");
    }
}