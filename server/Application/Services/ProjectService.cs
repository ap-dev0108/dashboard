using server.Domain;
using server.Domain.Enums;

namespace server.Application;

public class ProjectService
{
    private readonly IProjectRepo _projectRepo;
    private readonly IDataRepo _data;

    public ProjectService(IProjectRepo projectRepo, IDataRepo data)
    {
        _projectRepo = projectRepo;
        _data = data;
    }

    public async Task<List<ProjectsDTO>> GetAllProjects()
    {
        var projectsList = await _projectRepo.GetAllProjects() ??
            throw new KeyNotFoundException("No project found");

        return projectsList.Select(s => new ProjectsDTO
        {
            ProjectsID = s.ProjectsID,
            ProjectTitle = s.ProjectTitle,
            projectType = s.projectType,
            LiveURL = s.LiveURL,
            ImageURL = s.ImageURL,
            GithubURL = s.GithubURL
        }).ToList();
    }
    public async Task<ProjectsDTO> GetProjectsById(Guid id)
    {
        var projectById = await _projectRepo.GetProjectsByID(id) ??
            throw new KeyNotFoundException("Project with the given id cannot be found");

        var project = new ProjectsDTO
        {
            ProjectsID = projectById.ProjectsID,
            ProjectTitle = projectById.ProjectTitle,
            projectType = projectById.projectType,
            LiveURL = projectById.LiveURL,
            ImageURL = projectById.ImageURL,
            GithubURL = projectById.GithubURL
        };

        return project;
    }
    public async Task<IQueryable<ProjectsDTO>> GetProjectsByType(string type)
    {
        if (!Enum.TryParse<ProjectType>(type, true, out var projectType))
        {
            throw new UnauthorizedAccessException("Invalid project type");
        }
        var projectFiltered = await _projectRepo.GetProjectsByType(projectType) ??
            throw new KeyNotFoundException("Project cannot be found with the matched project type");

        return projectFiltered.Select(s => new ProjectsDTO
        {
            ProjectsID = s.ProjectsID,
            ProjectTitle = s.ProjectTitle,
            projectType = s.projectType,
            LiveURL = s.LiveURL,
            ImageURL = s.ImageURL,
            GithubURL = s.GithubURL
        });

    }
    public async Task AddProjects(AddProjectsDTO addProjectsDTO)
    {
        var project = new Projects
        {
            ProjectsID = Guid.NewGuid(),
            ProjectTitle = addProjectsDTO.ProjectTitle,
            projectType = addProjectsDTO.projectType,
            LiveURL = addProjectsDTO.LiveURL,
            ImageURL = addProjectsDTO.ImageURL,
            GithubURL = addProjectsDTO.GithubURL
        };

        await _projectRepo.AddProjects(project);
        await _data.SaveChangesAsync();
    }
    public async Task RemoveProjects(Guid projectID)
    {
        var project = await _projectRepo.GetProjectsByID(projectID) ??
            throw new KeyNotFoundException("Project with the given ID cannot be foudn");

        await _projectRepo.RemoveProjects(project);
        await _data.SaveChangesAsync();
    }
    public async Task EditProjects(Guid projectID, AddProjectsDTO addProjectsDTO)
    {
        var project = await _projectRepo.GetProjectsByID(projectID) ??
            throw new KeyNotFoundException("Project with the given ID cannot be found");

        project.ProjectTitle = addProjectsDTO.ProjectTitle;
        project.projectType = addProjectsDTO.projectType;
        project.LiveURL = addProjectsDTO.LiveURL;
        project.ImageURL = addProjectsDTO.ImageURL;
        project.GithubURL = addProjectsDTO.GithubURL;

        await _data.SaveChangesAsync();
    }
}