namespace server.Application;

public interface IDataRepo
{
    Task SaveChangesAsync();
}