using server.Domain;
using server.Domain.Enums;

namespace server.Application;

public interface IProjectRepo
{
    //Read Operation
    Task<List<Projects>> GetAllProjects();
    Task<Projects> GetProjectsByID(Guid id);
    Task<IQueryable<Projects>> GetProjectsByType(ProjectType type);

    //Write Operation
    Task AddProjects(Projects projects);

    //Remove Operation 
    Task RemoveProjects(Projects projects);
}