using Microsoft.EntityFrameworkCore;
using server.Domain;
using server.Infra.Persistence;

namespace server.Application;

public class MediaRepo : IMediaRepo
{
    private readonly AppDbContext _appDbContext;

    public MediaRepo(AppDbContext appDbContext)
    {
        _appDbContext = appDbContext;
    }

    public async Task<List<Media>> GetAllMediasAsync()
    {
        return await _appDbContext.Media.AsNoTracking().ToListAsync();
    }

    public void AddMedia(Media media)
    {
        _appDbContext.Media.Add(media);
    }

    public async Task<Media> GetMediaById(Guid id)
    {
        return await _appDbContext.Media.AsNoTracking().FirstOrDefaultAsync(f => f.MediaID == id);
    }

    public void RemoveMedia(Media media)
    {
        _appDbContext.Remove(media);
    }
}