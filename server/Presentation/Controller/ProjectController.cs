using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using server.Application;

namespace server.Presentation;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly ProjectService _projects;

    public ProjectController(ProjectService project)
    {
        _projects = project;
    }

    [HttpGet("/getAll")]
    public async Task<IActionResult> GetAllProjects()
    {
        var projectList = await _projects.GetAllProjects();

        return Ok(new Response<List<ProjectsDTO>>
        {
            Success = true,
            Message = "Project list fetched",
            Data = projectList
        });
    }

    [HttpGet("/projectId")]
    public async Task<IActionResult> GetProjectsById(Guid id)

    {
        var projectById = await _projects.GetProjectsById(id);

        return Ok(new Response<ProjectsDTO>
        {
            Success = true,
            Message = "Project with given ID is fetched",
            Data = projectById
        });
    }
    [HttpGet("/type")]
    public async Task<IActionResult> GetProjectsByType(string type)
    {
        var project = await _projects.GetProjectsByType(type);

        return Ok(new Response<IQueryable<ProjectsDTO>>
        {
            Success = true,
            Message = "Projects fetched",
            Data = project
        });
    }

    [HttpPost("/add")]
    public async Task<IActionResult> AddProjects(AddProjectsDTO addProjectsDTO)
    {
        await _projects.AddProjects(addProjectsDTO);

        return Ok(new Response<AddProjectsDTO>
        {
            Success = true,
            Message = "Project Added",
            Data = addProjectsDTO
        });
    }

    [HttpDelete("/remove")]
    public async Task<IActionResult> RemoveProjects(Guid id)
    {
        await _projects.RemoveProjects(id);

        return Ok(new Response<Guid>
        {
            Success = true,
            Message = "Project Removed",
            Data = id
        });
    }

    [HttpPut("/editProjects")]
    public async Task<IActionResult> EditProjects(Guid projectID, AddProjectsDTO dto)
    {
        await _projects.EditProjects(projectID, dto);

        return Ok(new Response<Guid>
        {
            Success = true,
            Message = "Project edited successfully"
        });
    }
}