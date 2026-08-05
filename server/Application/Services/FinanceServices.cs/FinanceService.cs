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
            Total = s.Total,
            CreatedAt = s.CreatedAt,
            financeType = s.financeType,
            IncomeType = s.IncomeType,
            ExpenseType = s.ExpenseType
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
            Total = financeExists.Total,
            CreatedAt = financeExists.CreatedAt,
            financeType = financeExists.financeType,
            IncomeType = financeExists.IncomeType,
            ExpenseType = financeExists.ExpenseType
        };

        return finance;
    }
}