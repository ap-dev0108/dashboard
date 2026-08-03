using System.ComponentModel.DataAnnotations;
namespace Eco.Domain;

public class Reviews
{
    [Key]
    public Guid ReviewID {get; set;} = Guid.NewGuid();
    public string Title {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    public string ImageURL {get; set;} = string.Empty;
    public ReviewType reviewType {get; set;}
    public Status status {get; set;} 
}