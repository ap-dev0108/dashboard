using server.Domain;

namespace server.Application;

public interface IFinanceRepo
{
    Task<List<Finance>> GetAllFinances();
    Task<Finance> GetFinanceById(Guid id);
}