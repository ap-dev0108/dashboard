namespace server.Application;

public class MediaService
{
    private readonly IMediaRepo _media;

    public MediaService(IMediaRepo media)
    {
        _media = media;
    }

    public async Task<List<MediaDTO>> GetMediaDTOsAsync()
    {
        var allmediaList = await _media.GetAllMediasAsync();

        if (allmediaList.Count <= 0)
        {
            throw new KeyNotFoundException("Media list is 0");
        }

        return allmediaList.Select(s => new MediaDTO
        {
            MediaID = s.MediaID,
            MediaTitle = s.MediaTitle,
            MediaDescription = s.MediaDescription,
            Ratings = s.Ratings,
            ImageURL = s.ImageURL,
            Status = s.Status,
            Type = s.Type
        }).ToList();
    }
}