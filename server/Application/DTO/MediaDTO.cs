using server.Domain.Enums;

namespace server.Application;

public class MediaDTO
{
    public Guid MediaID { get; set; } = Guid.NewGuid();
    public string MediaTitle { get; set; } = string.Empty;
    public string MediaDescription { get; set; } = string.Empty;
    public string ImageURL { get; set; } = string.Empty;
    public int Ratings { get; set; }
    public MediaType Type { get; set; }
    public MediaStatus Status { get; set; }
}

public class AddMediaDTO
{
    public string MediaTitle { get; set; } = string.Empty;
    public string MediaDescription { get; set; } = string.Empty;
    public string ImageURL { get; set; } = string.Empty;
    public int Ratings { get; set; }
    public MediaType Type { get; set; }
    public MediaStatus Status { get; set; }
}