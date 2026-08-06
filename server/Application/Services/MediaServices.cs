namespace server.Application;

public class MediaService
{
    private readonly IMediaRepo _media;
    private readonly IDataRepo _data;

    public MediaService(IMediaRepo media, IDataRepo data)
    {
        _media = media;
        _data = data;
    }

    public async Task<List<MediaDTO>> GetMediaDTOsAsync()
    {
        var allmediaList = await _media.GetAllMediasAsync() ??
            throw new KeyNotFoundException("Media not found");

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

    public async Task AddMedia(AddMediaDTO mediaDto)
    {
        var newMedia = new Domain.Media
        {
            MediaTitle = mediaDto.MediaTitle,
            MediaDescription = mediaDto.MediaDescription,
            ImageURL = mediaDto.ImageURL,
            Ratings = mediaDto.Ratings,
            Type = mediaDto.Type,
            Status = mediaDto.Status
        };

        await _media.AddMedia(newMedia);
        await _data.SaveChangesAsync();
    }

    public async Task<MediaDTO> GetMediaById(Guid id)
    {
        var mediaExists = await _media.GetMediaById(id) ??
            throw new KeyNotFoundException("Media with this ID cannot be found");

        var media = new MediaDTO
        {
            MediaID = mediaExists.MediaID,
            MediaTitle = mediaExists.MediaTitle,
            MediaDescription = mediaExists.MediaDescription,
            ImageURL = mediaExists.ImageURL,
            Type = mediaExists.Type,
            Status = mediaExists.Status
        };

        return media;
    }

    public async Task RemoveMedia(Guid mediaID)
    {
        var mediaToRemove = await _media.GetMediaById(mediaID) ??
            throw new KeyNotFoundException("Media with this ID cannot be foudn");

        await _media.RemoveMedia(mediaToRemove);
        await _data.SaveChangesAsync();
    }

    public async Task EditMedia(Guid id, AddMediaDTO addMediaDTO)
    {
        var media = await _media.GetMediaById(id) ??
            throw new KeyNotFoundException("Media with this ID cannot be found");

        media.MediaTitle = addMediaDTO.MediaTitle;
        media.MediaDescription = addMediaDTO.MediaDescription;
        media.ImageURL = addMediaDTO.ImageURL;
        media.Ratings = addMediaDTO.Ratings;
        media.Type = addMediaDTO.Type;
        media.Status = addMediaDTO.Status;

        await _data.SaveChangesAsync();
    }
}