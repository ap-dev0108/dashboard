using server.Domain;

namespace server.Application;

public interface IMediaRepo
{
    Task<List<Media>> GetAllMediasAsync();
    void AddMedia(Media media);
    Task<Media> GetMediaById(Guid id);
    void RemoveMedia(Media media);
}