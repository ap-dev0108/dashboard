using server.Domain;

namespace server.Application;

public interface IMediaRepo
{
    Task<List<Media>> GetAllMediasAsync();
    Task AddMedia(Media media);
    Task<Media> GetMediaById(Guid id);
    Task RemoveMedia(Media media);
}