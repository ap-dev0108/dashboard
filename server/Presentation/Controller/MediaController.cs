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

        return Ok(new Response<List<MediaDTO>>
        {
            Success = true,
            Message = "Media List fetched Successfully",
            Data = media
        });
    }

    [HttpGet("/mediaId")]
    public async Task<IActionResult> GetMediaById(Guid id)
    {
        var media = await _mediaServices.GetMediaById(id);

        return Ok(new Response<MediaDTO>
        {
            Success = true,
            Message = "Media data fetched",
            Data = media
        });
    }

    [HttpPost("/addMedia")]
    public async Task<IActionResult> AddMedias(AddMediaDTO mediaDTO)
    {
        await _mediaServices.AddMedia(mediaDTO);

        return Ok(new Response<AddMediaDTO>
        {
            Success = true,
            Message = "Media added",
            Data = mediaDTO
        });
    }

    [HttpDelete("/removeMedia")]
    public async Task<IActionResult> RemoveMedias(Guid id)
    {
        await _mediaServices.RemoveMedia(id);

        return Ok(new Response<Guid>
        {
            Success = true,
            Message = "Media is removed",
            Data = id
        });
    }
}
