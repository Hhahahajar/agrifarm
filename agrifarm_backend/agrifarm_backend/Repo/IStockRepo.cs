using agrifarm_backend.Models;

namespace agrifarm_backend.Repo
{
    public interface IStockRepo
    {
        Task<List<Stock>> GetAll();

        Task<Stock> GetStockByName(string name);

        Task<string> Create(Stock stock);

        Task<string> Update(int id, Stock stock);

        Task<string> Remove(int id);
    }
}
