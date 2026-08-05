using System.ComponentModel.DataAnnotations;
using server.Domain.Enums;

namespace server.Domain;

public class Projects
{
    [Key]
    public Guid ProjectsID { get; set; } = Guid.NewGuid();

    public string ProjectTitle { get; set; } = string.Empty;

    public string LiveURL { get; set; } = string.Empty;

    public string GithubURL { get; set; } = string.Empty;

    public ProjectType projectType { get; set; }

    public string ImageURL { get; set; } = string.Empty;
}