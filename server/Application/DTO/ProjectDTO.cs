using server.Domain.Enums;

namespace server.Application;

public class ProjectsDTO
{
    public Guid ProjectsID { get; set; } = Guid.NewGuid();

    public string ProjectTitle { get; set; } = string.Empty;

    public string LiveURL { get; set; } = string.Empty;

    public string GithubURL { get; set; } = string.Empty;

    public string ImageURL { get; set; } = string.Empty;

    public ProjectType projectType { get; set; }
}

public class AddProjectsDTO
{
    public string ProjectTitle { get; set; } = string.Empty;

    public string LiveURL { get; set; } = string.Empty;

    public string GithubURL { get; set; } = string.Empty;

    public string ImageURL { get; set; } = string.Empty;

    public ProjectType projectType { get; set; }
}