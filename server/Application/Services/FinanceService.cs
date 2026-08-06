using server.Domain;
using server.Domain.Enums;

namespace server.Application;

public class FinanceService
{
    private readonly IFinanceRepo _finance;
    private readonly IDataRepo _data;
    public FinanceService(IFinanceRepo finance, IDataRepo data)
    {
        _finance = finance;
        _data = data;
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
            financeType = s.financeType
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

    public async Task AddFinance(AddFinanceDTO addFinanceDTO)
    {
        var newFinance = new Finance
        {
            FinanceID = Guid.NewGuid(),
            FinanceNotes = addFinanceDTO.FinanceNotes,
            Amount = addFinanceDTO.Amount,
            CreatedAt = addFinanceDTO.CreatedAt,
            financeType = addFinanceDTO.financeType
        };

        await _finance.AddFinance(newFinance);
        await _data.SaveChangesAsync();
    }

    public async Task RemoveFinance(Guid financeID)
    {
        var financeToRemove = await _finance.GetFinanceById(financeID) ??
            throw new KeyNotFoundException("Finance details of the given ID cannot be found");

        await _finance.RemoveFinance(financeToRemove);
        await _data.SaveChangesAsync();
    }

    public async Task<FinancialDetails> GetFinanceData()
    {
        var transactions = await _finance.GetAllFinances();
        var totalIncome = _finance.TotalIncome();
        var totalExpenses = _finance.TotalExpenses();

        var netAmount = totalIncome - totalExpenses;

        return new FinancialDetails
        {
            TotalIncomeAmt = totalIncome,
            TotalExpAmt = totalExpenses,
            NetAmt = netAmount,
            Transactions = transactions.Select(s => new FinanceDTO
            {
                FinanceID = s.FinanceID,
                FinanceNotes = s.FinanceNotes,
                Amount = s.Amount,
                CreatedAt = s.CreatedAt,
                financeType = s.financeType
            }).ToList()
        };
    }

    public async Task EditFinances(Guid financeID, AddFinanceDTO financeDTO)
    {
        var finances = await _finance.GetFinanceById(financeID) ??
            throw new KeyNotFoundException("Finances with this ID cannot be found");

        finances.FinanceNotes = financeDTO.FinanceNotes;
        finances.financeType = financeDTO.financeType;
        finances.CreatedAt = financeDTO.CreatedAt;
        finances.Amount = financeDTO.Amount;

        await _data.SaveChangesAsync();
    }
}