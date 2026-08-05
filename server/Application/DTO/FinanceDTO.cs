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