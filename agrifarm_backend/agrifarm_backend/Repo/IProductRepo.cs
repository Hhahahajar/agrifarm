using agrifarm_backend.Models;

namespace agrifarm_backend.Repo
{
    public interface IProductRepo
    {
        Task<List<Product>> GetAll();

        Task<Product> GetProductByName(string name);

        Task<string> Create(Product product);

        Task<string> Update(int id, Product product);

        Task<string> Remove(int id);
    }
}
