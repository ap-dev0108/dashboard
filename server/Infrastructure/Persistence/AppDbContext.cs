using server.Domain;
using Microsoft.EntityFrameworkCore;

namespace server.Infra.Persistence;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> dbContextOptions) : base(dbContextOptions) { }

    public DbSet<Media> Media { get; set; }
}