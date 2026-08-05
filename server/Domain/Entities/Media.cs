using System.ComponentModel.DataAnnotations;
using server.Domain.Enums;

namespace server.Domain;

public class Media
{
    [Key]
    public Guid MediaID { get; set; } = Guid.NewGuid();

    public string MediaTitle { get; set; } = string.Empty;

    public string MediaDescription { get; set; } = string.Empty;

    public string ImageURL { get; set; } = string.Empty;

    public double Ratings { get; set; }

    public MediaType Type { get; set; }
    public MediaStatus Status { get; set; }
}