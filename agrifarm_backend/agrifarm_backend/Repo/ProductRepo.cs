using agrifarm_backend.Models;
using agrifarm_backend.Models.Data;
using Dapper;
using System.Data;

namespace agrifarm_backend.Repo
{
    public class ProductRepo : IProductRepo
    {
        private readonly DapperDBContext context;
        public ProductRepo(DapperDBContext context)
        {
            this.context = context;
        }
        public async Task<string> Create(Product product)
        {
            String response = string.Empty;
            string query = "Insert into products (name, quantity, price) values (@name, @quantity, @price)";
            var parameter = new DynamicParameters();
            parameter.Add("name", product.name, DbType.String);
            parameter.Add("quantity", product.quantity, DbType.Int32);
            parameter.Add("price", product.price, DbType.Double);

            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "product was created";
            }
            return response;
        }

        public async Task<List<Product>> GetAll()
        {
            string query = "Select * from products";
            using (var connection = this.context.CreateConnection())
            {
                var productList = await connection.QueryAsync<Product>(query);
                int id = 0;
                foreach (var product in productList) 
                {
                    product.id = ++id;
                }
                return productList.ToList();
            }
        }

        public async Task<Product> GetProductByName(string name)
        {
            string query = "Select * from products where name=@name";
            using (var connection = this.context.CreateConnection())
            {
                var productList = await connection.QueryFirstOrDefaultAsync<Product>(query, new { name });
                if (productList != null)
                {
                    return productList;
                }
                else return new Product();
                
            }
        }

        public async Task<string> Remove(int id)
        {
            string response = string.Empty;
            string query = "delete from products where productId=@id";
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
                response = "Product was deleted";
            }
            return response;
        }

        public async Task<string> Update(int id, Product product)
        {
            string response = string.Empty;
            string query = "Update products set name=@name, quantity=@quantity, price=@price where productId=@productId";
            var parameter = new DynamicParameters();
            parameter.Add("productId", id, DbType.Int32);
            parameter.Add("name", product.name, DbType.String);
            parameter.Add("quantity", product.quantity, DbType.Int32);
            parameter.Add("price", product.price, DbType.Double);
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "User was updated";
            }
            return response;
        }
    }
}
