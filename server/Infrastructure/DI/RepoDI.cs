using Microsoft.Extensions.DependencyInjection;
using server.Application;

namespace server.Infra;

public static class RepoInjection
{
    public static IServiceCollection RepoDI(this IServiceCollection services)
    {
        services.AddScoped<IMediaRepo, MediaRepo>();
        services.AddScoped<MediaRepo>();

        services.AddScoped<IDataRepo, DataRepo>();
        services.AddScoped<DataRepo>();

        return services;
    }
}