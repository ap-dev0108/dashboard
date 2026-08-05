using Microsoft.EntityFrameworkCore;
using server.Application;
using server.Domain;
using server.Infra.Persistence;

namespace server.Infra;

public class FinanceRepo : IFinanceRepo
{
    private readonly AppDbContext _db;

    public FinanceRepo(AppDbContext db)
    {
        _db = db;
    }

    public async Task<List<Finance>> GetAllFinances()
    {
        return await _db.Finances.AsNoTracking().ToListAsync();
    }

    public async Task<Finance> GetFinanceById(Guid id)
    {
        return await _db.Finances.AsNoTracking().FirstOrDefaultAsync(f => f.FinanceID == id);
    }
}