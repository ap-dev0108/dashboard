using server.Domain.Enums;

namespace server.Application;

public class FinanceDTO
{
    public Guid FinanceID { get; set; } = Guid.NewGuid();
    public string FinanceNotes { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public FinanceType financeType { get; set; }
}

public class FinancialDetails
{
    public List<FinanceDTO> Transactions {get; set;} = [];
    public decimal TotalIncomeAmt {get; set;}
    public decimal TotalExpAmt {get; set;}
    public decimal NetAmt {get; set;}
}

public class AddFinanceDTO
{
    public string FinanceNotes { get; set; } = string.Empty;
    public decimal Amount { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public FinanceType financeType { get; set; }
}