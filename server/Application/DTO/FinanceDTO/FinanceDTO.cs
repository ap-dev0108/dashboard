using server.Domain.Enums;

namespace server.Application;

public class FinanceDTO
{
    public Guid FinanceID { get; set; } = Guid.NewGuid();
    public string FinanceNotes { get; set; } = string.Empty;
    public double Amount { get; set; }
    public double Total { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public FinanceType financeType { get; set; }
    public IncomeType IncomeType { get; set; }
    public ExpenseType ExpenseType { get; set; }
}