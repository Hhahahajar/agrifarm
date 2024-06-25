using agrifarm_backend.Models;
using agrifarm_backend.Models.Data;
using Dapper;
using System.Data;

namespace agrifarm_backend.Repo
{
    public class OrderRepo : IOrderRepo
    {
        private readonly DapperDBContext context;
        public OrderRepo(DapperDBContext context)
        {
            this.context = context;
        }
        public async Task<string> Create(Order order)
        {
            String response = string.Empty;
            string query = "Insert into orders (customerName, quantity, location, totalAmount, status, telephone, productId) values (@customerName, @quantity, @location, @totalAmount, @status, @telephone, @productId)";
            var parameter = new DynamicParameters();
            parameter.Add("customerName", order.customerName, DbType.String);
            parameter.Add("quantity", order.quantity, DbType.Int32);
            parameter.Add("location", order.location, DbType.String);
            parameter.Add("totalAmount", order.totalAmount, DbType.Double);
            parameter.Add("status", order.status, DbType.String);
            parameter.Add("telephone", order.telephone, DbType.Decimal);
            parameter.Add("productId", order.productId, DbType.Int32);

            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "order was created";
            }
            return response;
        }

        public async Task<List<Order>> GetAll()
        {
            string query = "Select * from orders";
            using (var connection = this.context.CreateConnection())
            {
                var orderList = await connection.QueryAsync<Order>(query);
                int id = 0;
                foreach (var order in orderList)
                {
                    order.id = ++id;
                }
                return orderList.ToList();
            }
        }

        public async Task<Order> GetOrderByName(string name, string product)
        {
            string query = "Select * from orders where customerName=@customerName and productName=@productName";
            using (var connection = this.context.CreateConnection())
            {
                var orderList = await connection.QueryFirstOrDefaultAsync<Order>(query, new { customerName = name, productName = product });
                if (orderList != null)
                {
                    return orderList;
                }
                else return new Order();

            }
        }

        public async Task<string> Remove(int id)
        {
            string response = string.Empty;
            string query = "delete from orders where orderId=@id";
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
                response = "order was deleted";
            }
            return response;
        }

        public async Task<string> Update(int id, Order order)
        {
            string response = string.Empty;
            string query = "Update orders set customerName=@customerName, quantity=@quantity, location=@Location, totalAmount=@totalAmount, status=@status, telephone=@telephone, productId=@productId where orderId=@orderId";
            var parameter = new DynamicParameters();
            parameter.Add("customerName", order.customerName, DbType.String);
            parameter.Add("quantity", order.quantity, DbType.Int32);
            parameter.Add("location", order.location, DbType.String);
            parameter.Add("totalAmount", order.totalAmount, DbType.Double);
            parameter.Add("status", order.status, DbType.String);
            parameter.Add("telephone", order.telephone, DbType.Decimal);
            parameter.Add("productId", order.productId, DbType.Int32);
            parameter.Add("orderId", id, DbType.Int32);
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "order was updated";
            }
            return response;
        }
    }
}
