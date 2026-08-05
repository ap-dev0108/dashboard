using server.Domain;

namespace server.Application;

public interface IProjectRepo
{
    //Read Operation
    Task<List<Projects>> GetAllProjects();
    Task<Projects> GetProjectsByID(Guid id);
    Task<Projects> GetProjectsByType(string type);

    //Write Operation
    Task AddProjects(Projects projects);

    //Remove Operation 
    Task RemoveProjects(Projects projects);
}