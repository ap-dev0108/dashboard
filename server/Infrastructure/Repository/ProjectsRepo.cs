using Microsoft.EntityFrameworkCore;
using server.Application;
using server.Domain;
using server.Infra.Persistence;

namespace server.Infra;

public class ProjectsRepo : IProjectRepo
{
    private readonly AppDbContext _db;

    public ProjectsRepo(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Projects>> GetAllProjects()
    {
        return await _db.Projects.AsNoTracking().ToListAsync();
    }

    public async Task<Projects> GetProjectsByID(Guid id)
    {
        return await _db.Projects.AsNoTracking().FirstOrDefaultAsync(f => f.ProjectsID == id);
    }

    public async Task<Projects> GetProjectsByType(string type)
    {
        return await _db.Projects.AsNoTracking().FirstOrDefaultAsync(f => f.projectType.Equals(type));
    }

    public async Task AddProjects(Projects projects)
    {
        _db.Projects.Add(projects);
    }

    public async Task RemoveProjects(Projects projects)
    {
        _db.Projects.Remove(projects);
    }
}