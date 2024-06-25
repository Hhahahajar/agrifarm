/*﻿using Microsoft.Data.SqlClient;*/
using MySql.Data.MySqlClient;
using System.Data;

namespace agrifarm_backend.Models.Data
{
    public class DapperDBContext
    {
        private readonly IConfiguration _configuration;
        private readonly string connectionstring;
        public DapperDBContext(IConfiguration configuration)
        {
            this._configuration = configuration;
            this.connectionstring = this._configuration.GetConnectionString("connection");
        }
        public IDbConnection CreateConnection() => new MySqlConnection(connectionstring);
    }
}
