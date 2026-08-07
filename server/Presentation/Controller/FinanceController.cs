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

    [HttpGet("allFinances")]
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

    [HttpGet("financeId")]
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

    [HttpGet("financeType")]
    public async Task<IActionResult> FilterByType(string type)
    {
        var financeByType = await _financeService.FilterByType(type);

        return Ok(new Response<List<FinanceDTO>>
        {
            Success = true,
            Message = "Finance details fetched",
            Data = financeByType
        });
    }

    [HttpPost("addFinances")]
    public async Task<IActionResult> AddFinances(AddFinanceDTO addFinanceDTO)
    {
        await _financeService.AddFinance(addFinanceDTO);

        return Ok(new Response<AddFinanceDTO>
        {
            Success = true,
            Message = "Financial Details Added",
            Data = addFinanceDTO
        });
    }

    [HttpDelete("removeFinance")]
    public async Task<IActionResult> RemoveFinance(Guid financeID)
    {
        await _financeService.RemoveFinance(financeID);

        return Ok(new Response<Guid>
        {
            Success = true,
            Message = "Financial details with the given ID has been removed",
            Data = financeID
        });
    }

    [HttpGet("getFinanceData")]
    public async Task<IActionResult> GetFinanceData()
    {
        var data = await _financeService.GetFinanceData();

        return Ok(new Response<FinancialDetails>
        {
            Success = true,
            Message = "Financial data fetched successfully",
            Data = data
        });
    }

    [HttpPut("editFinances")]
    public async Task<IActionResult> EditFinances(Guid financeID, AddFinanceDTO addFinanceDTO)
    {
        await _financeService.EditFinances(financeID, addFinanceDTO);
        return Ok(new Response<Guid>
        {
            Success = true,
            Message = "Financial Data has been edited"
        });
    }
}