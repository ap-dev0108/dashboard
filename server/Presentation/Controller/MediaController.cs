using Microsoft.AspNetCore.Mvc;
using server.Application;

namespace server.Presentation;

[ApiController]
[Route("api/[controller]")]
[ApiExplorerSettings(IgnoreApi = false)]
public class MediaController : ControllerBase
{
    private readonly MediaService _mediaServices;

    public MediaController(MediaService mediaService)
    {
        _mediaServices = mediaService;
    }

    [HttpGet("/allMedias")]
    public async Task<IActionResult> GetAllMedias()
    {
        var media = await _mediaServices.GetMediaDTOsAsync();
        return Ok(media);
    }

    [HttpGet("/id")]
    public async Task<IActionResult> GetMediaById(Guid id)
    {
        var media = await _mediaServices.GetMediaById(id);
        return Ok(media);
    }

    [HttpPost("/addMedia")]
    public async Task<IActionResult> AddMedias(AddMediaDTO mediaDTO)
    {
        await _mediaServices.AddMedia(mediaDTO);
        return Ok(mediaDTO);
    }

    [HttpDelete("/removeMedia")]
    public async Task<IActionResult> RemoveMedias(Guid id)
    {
        await _mediaServices.RemoveMedia(id);
        return Ok(id);
    }
}
