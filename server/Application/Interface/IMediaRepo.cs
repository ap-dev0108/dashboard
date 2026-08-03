using server.Domain;

namespace server.Application;

public interface IMediaRepo
{
    Task<List<Media>> GetAllMediasAsync();
    Task<Media> AddMedia(Media media);
    Task<Media> GetMediaById(Guid id);
    Task<Media> RemoveMedia(Media media);
}