using server.Domain;
using server.Domain.Enums;

namespace server.Application;

public interface IFinanceRepo
{
    Task<List<Finance>> GetAllFinances();
    Task<Finance> GetFinanceById(Guid id);
    Task<List<Finance>> FilterByType(FinanceType financeType);
    Task AddFinance(Finance finance);
    Task RemoveFinance(Finance finance);
}