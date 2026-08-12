using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using server.Infra;
using server.Infra.Persistence;
using server.Presentation;
using server.Application;
using server.Application.Configuration;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.Configure<AdminSettings>(
    builder.Configuration.GetSection("Admin")
);

builder.Services.Configure<TokenSettings>(options =>
{
    builder.Configuration.GetSection("Jwt").Bind(options);

    if (string.IsNullOrWhiteSpace(options.Key))
    {
        options.Key = Environment.GetEnvironmentVariable("JWT_KEY") ?? string.Empty;
    }

    if (string.IsNullOrWhiteSpace(options.Issuer))
    {
        options.Issuer = Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "EcoSystem";
    }

    if (string.IsNullOrWhiteSpace(options.Audience))
    {
        options.Audience = Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "EcoSystemClient";
    }
});

var jwtSettings = builder.Configuration.GetSection("Jwt").Get<TokenSettings>()
    ?? new TokenSettings();

var jwtKey = !string.IsNullOrWhiteSpace(jwtSettings.Key)
    ? jwtSettings.Key
    : Environment.GetEnvironmentVariable("JWT_KEY")
        ?? throw new InvalidOperationException("JWT key is not configured.");

var jwtIssuer = !string.IsNullOrWhiteSpace(jwtSettings.Issuer)
    ? jwtSettings.Issuer
    : Environment.GetEnvironmentVariable("JWT_ISSUER") ?? "EcoSystem";

var jwtAudience = !string.IsNullOrWhiteSpace(jwtSettings.Audience)
    ? jwtSettings.Audience
    : Environment.GetEnvironmentVariable("JWT_AUDIENCE") ?? "EcoSystemClient";

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtIssuer,
            ValidAudience = jwtAudience,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey)),
            ClockSkew = TimeSpan.Zero
        };

        options.Events = new JwtBearerEvents
        {
            OnChallenge = async context =>
            {
                context.HandleResponse();

                var message = string.IsNullOrWhiteSpace(context.ErrorDescription)
                    ? "Authentication is required."
                    : context.ErrorDescription;

                await ErrorResponseWriter.WriteAsync(
                    context.HttpContext,
                    StatusCodes.Status401Unauthorized,
                    message,
                    context.Error ?? "Unauthorized");
            },
            OnForbidden = async context =>
            {
                await ErrorResponseWriter.WriteAsync(
                    context.HttpContext,
                    StatusCodes.Status403Forbidden,
                    "You are not authorized to access this resource.",
                    "Forbidden");
            }
        };
    });

builder.Services.AddAuthorization();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("React", policy =>
    {
        policy.WithOrigins("http://localhost:5173");
        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
        policy.AllowAnyOrigin();
    });
});

builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo
    {
        Title = "My API",
        Version = "v1"
    });

    options.AddSecurityDefinition("Bearer", new Microsoft.OpenApi.Models.OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = Microsoft.OpenApi.Models.SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = Microsoft.OpenApi.Models.ParameterLocation.Header,
        Description = "Enter: Bearer {your JWT token}"
    });

    options.AddSecurityRequirement(new Microsoft.OpenApi.Models.OpenApiSecurityRequirement
    {
        {
            new Microsoft.OpenApi.Models.OpenApiSecurityScheme
            {
                Reference = new Microsoft.OpenApi.Models.OpenApiReference
                {
                    Type = Microsoft.OpenApi.Models.ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var connectionString = builder.Configuration.GetConnectionString("DefaultConnectionString")
    ?? builder.Configuration["DATABASE_URL"]
    ?? Environment.GetEnvironmentVariable("DATABASE_URL")
    ?? throw new InvalidOperationException("Database connection string is not configured.");

builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(connectionString));

builder.Services.RepoDI();
builder.Services.ServiceInjection();

var app = builder.Build();

app.UseMiddleware<GlobalException>();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("React");
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();
