using agrifarm_backend.Models;

namespace agrifarm_backend.Repo
{
    public interface IOrderRepo
    {
        Task<List<Order>> GetAll();

        Task<Order> GetOrderByName(string name, string product);

        Task<string> Create(Order order);

        Task<string> Update(int id, Order order);

        Task<string> Remove(int id);
    }
}
