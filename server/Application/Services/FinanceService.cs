using server.Domain.Enums;

namespace server.Application;

public class FinanceService
{
    private readonly IFinanceRepo _finance;
    public FinanceService(IFinanceRepo finance)
    {
        _finance = finance;
    }

    public async Task<List<FinanceDTO>> GetAllFinances()
    {
        var finance = await _finance.GetAllFinances() ??
            throw new KeyNotFoundException("Finance not found");

        return finance.Select(s => new FinanceDTO
        {
            FinanceID = s.FinanceID,
            FinanceNotes = s.FinanceNotes,
            Amount = s.Amount,
            CreatedAt = s.CreatedAt,
            financeType = s.financeType,
        }).ToList();
    }

    public async Task<FinanceDTO> GetFinanceById(Guid id)
    {
        var financeExists = await _finance.GetFinanceById(id) ??
            throw new KeyNotFoundException("Finance with the given ID was not found");

        var finance = new FinanceDTO
        {
            FinanceID = financeExists.FinanceID,
            FinanceNotes = financeExists.FinanceNotes,
            Amount = financeExists.Amount,
            CreatedAt = financeExists.CreatedAt,
            financeType = financeExists.financeType,
        };

        return finance;
    }

    public async Task<List<FinanceDTO>> FilterByType(string type)
    {
        if (!Enum.TryParse<FinanceType>(type, true, out var financeType))
        {
            throw new Exception("Cannot find the finance you are looking for");
        }

        var financeFiltered = await _finance.FilterByType(financeType) ??
            throw new KeyNotFoundException("Finance not found");

        return financeFiltered.Select(s => new FinanceDTO
        {
            FinanceID = s.FinanceID,
            FinanceNotes = s.FinanceNotes,
            Amount = s.Amount,
            CreatedAt = s.CreatedAt,
            financeType = s.financeType
        }).ToList();
    }
}