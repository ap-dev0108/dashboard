namespace server.Domain.Enums;

public enum MediaType
{
    Movies = 0,
    TVShows = 1,
    Books = 2,
    Games = 3,
    Music = 4
}

public enum MediaStatus
{
    Finished = 0,
    Planning = 1,
    InProgess = 2
}

public enum ProjectType
{
    WebApp = 0,
    WixTemplates = 1,
    MobileApp = 2,
    Management = 3
}

public enum FinanceType
{
    Income = 0,
    Expensees = 1
}

public enum IncomeType
{
    Salary = 0,
    PocketMoney = 1,
    Freelance = 2
}

public enum ExpenseType
{
    Rent = 0,
    Food = 1,
    Supplies = 2,
    Miscellaneous = 3,
}