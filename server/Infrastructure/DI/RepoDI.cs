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

        services.AddScoped<IProjectRepo, ProjectsRepo>();
        services.AddScoped<ProjectsRepo>();

        services.AddScoped<IFinanceRepo, FinanceRepo>();
        services.AddScoped<FinanceRepo>();

        return services;
    }
}