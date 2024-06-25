using agrifarm_backend.Models;
using agrifarm_backend.Models.Data;
using Dapper;
using Mysqlx.Crud;
using Org.BouncyCastle.Asn1.X509;
using System.Data;

namespace agrifarm_backend.Repo
{
    public class StockRepo : IStockRepo
    {

        private readonly DapperDBContext context;
        public StockRepo(DapperDBContext context)
        {
            this.context = context;
        }
        public async Task<string> Create(Stock stock)
        {
            String response = string.Empty;
            string query = "Insert into stock (name, quantity, price, totalAmount) values (@name, @quantity, @price, @totalAmount)";
            var parameter = new DynamicParameters();
            parameter.Add("name", stock.name, DbType.String);
            parameter.Add("quantity", stock.quantity, DbType.Int32);
            parameter.Add("totalAmount", stock.totalAmount, DbType.Double);
            parameter.Add("price", stock.price, DbType.Decimal);
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "stock was created";
            }
            return response;
        }

        public async Task<List<Stock>> GetAll()
        {
            string query = "Select * from stock";
            using (var connection = this.context.CreateConnection())
            {
                var stockList = await connection.QueryAsync<Stock>(query);
                int id = 0;
                foreach (var stock in stockList)
                {
                    stock.id = ++id;
                }
                return stockList.ToList();
            }
        }

        public async Task<Stock> GetStockByName(string name)
        {
            string query = "Select * from stock where name=@name";
            using (var connection = this.context.CreateConnection())
            {
                var stockList = await connection.QueryFirstOrDefaultAsync<Stock>(query, new { name });
                if (stockList != null)
                {
                    return stockList;
                }
                else return new Stock();

            }
        }

        public async Task<string> Remove(int id)
        {
            string response = string.Empty;
            string query = "delete from stock where stockId=@id";
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, new { id });
                response = "stock was deleted";
            }
            return response;
        }

        public async Task<string> Update(int id, Stock stock)
        {
            string response = string.Empty;
            string query = "Update stock set name=@name, quantity=@quantity, price=@price, totalAmount=@totalAmount where stockId=@stockId";
            var parameter = new DynamicParameters();
            parameter.Add("name", stock.name, DbType.String);
            parameter.Add("quantity", stock.quantity, DbType.Int32);
            parameter.Add("price", stock.price, DbType.Double);
            parameter.Add("totalAmount", stock.totalAmount, DbType.Double);
            parameter.Add("stockId", id, DbType.Int32);
            using (var connection = this.context.CreateConnection())
            {
                await connection.ExecuteAsync(query, parameter);
                response = "stock was updated";
            }
            return response;
        }
    }
}
