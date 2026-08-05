using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;

namespace server.Presentation;

public class GlobalException
{
    private readonly RequestDelegate _request;

    public GlobalException(RequestDelegate request)
    {
        _request = request;
    }

    public async Task InvokeAsync(HttpContext http)
    {
        try
        {
            await _request(http);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(http, ex);
        }
    }

    private static async Task HandleExceptionAsync(HttpContext http, Exception ex)
    {
        var status = ex switch
        {
            KeyNotFoundException => HttpStatusCode.NotFound,
            BadHttpRequestException => HttpStatusCode.BadRequest,
            UnauthorizedAccessException => HttpStatusCode.Unauthorized,
            InvalidOperationException => HttpStatusCode.Conflict,

            _ => HttpStatusCode.InternalServerError
        };

        var response = new
        {
            success = false,
            message = ex.Message,
            error = ex.GetType().Name,
            traceID = http.TraceIdentifier,
            path = http.Request.Path
        };

        http.Response.ContentType = "application/json";
        http.Response.StatusCode = (int)status;
        var option = new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase, WriteIndented = true };
        await http.Response.WriteAsync(JsonSerializer.Serialize(response, option));
    }
}