using server.Application;
using server.Infra.Persistence;

namespace server.Infra;

public class DataRepo : IDataRepo
{
    private readonly AppDbContext _db;

    public DataRepo(AppDbContext db)
    {
        _db = db;
    }

    public async Task SaveChangesAsync()
    {
        await _db.SaveChangesAsync();
    }
}