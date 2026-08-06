using Microsoft.EntityFrameworkCore;
using server.Application;
using server.Domain;
using server.Domain.Enums;
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

    public async Task<List<Finance>> FilterByType(FinanceType financeType)
    {
        return await _db.Finances.Where(w => w.financeType == financeType).ToListAsync();
    }

    public async Task AddFinance(Finance finance)
    {
        _db.Finances.Add(finance);
    }

    public async Task RemoveFinance(Finance finance)
    {
        _db.Finances.Remove(finance);
    }

    public decimal TotalIncome()
    {
        var total = _db.Finances.Where(x => x.financeType == FinanceType.Income).Sum(s => s.Amount);
        return total;
    }

    public decimal TotalExpenses()
    {
        var total = _db.Finances.Where(x => x.financeType == FinanceType.Expensees).Sum(s => s.Amount);
        return total;
    }
}