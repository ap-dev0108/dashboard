using Microsoft.AspNetCore.Mvc;
using server.Application;

namespace server.Presentation;

[ApiController]
[Route("[controller]")]
public class MediaController : ControllerBase
{
    private readonly MediaService _mediaServices;

    public MediaController(MediaService mediaService)
    {
        _mediaServices = mediaService;
    }

    [HttpGet("allMedias")]
    public async Task<IActionResult> GetAllMedias()
    {
        var media = await _mediaServices.GetMediaDTOsAsync();

        return Ok(media);
    }
}
