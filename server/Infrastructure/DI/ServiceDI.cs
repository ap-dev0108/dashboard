using Microsoft.Extensions.DependencyInjection;
using server.Application;

namespace server.Infra;

public static class ServiceDI
{
    public static IServiceCollection ServiceInjection(this IServiceCollection services)
    {
        services.AddScoped<MediaService>();
        services.AddScoped<ProjectService>();
        services.AddScoped<FinanceService>();

        return services;
    }
}