using Microsoft.AspNetCore.Mvc;
using server.Application;

namespace server.Presentation;

[ApiController]
[Route("api/[controller]")]
public class FinanceController : ControllerBase
{
    private readonly FinanceService _financeService;
    public FinanceController(FinanceService financeService)
    {
        _financeService = financeService;
    }

    [HttpGet("/allFinances")]
    public async Task<IActionResult> GetAllFinances()
    {
        var financesList = await _financeService.GetAllFinances();

        return Ok(new Response<List<FinanceDTO>>
        {
            Success = true,
            Message = "Finances list fetched",
            Data = financesList
        });
    }

    [HttpGet("/financeId")]
    public async Task<IActionResult> GetFinancesById(Guid financeID)
    {
        var finance = await _financeService.GetFinanceById(financeID);

        return Ok(new Response<FinanceDTO>
        {
            Success = true,
            Message = "Finance fetched",
            Data = finance
        });
    }
}