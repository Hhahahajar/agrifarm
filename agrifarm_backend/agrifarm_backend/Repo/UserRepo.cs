using agrifarm_backend.Models;
using agrifarm_backend.Models.Data;
using Azure;
using Dapper;
using Microsoft.IdentityModel.Tokens;
using Org.BouncyCastle.Crypto.Generators;
using System.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace agrifarm_backend.Repo
{
    public class UserRepo : IUserRepo
    {
        private readonly DapperDBContext context;
        private readonly IConfiguration _configuration;
        public UserRepo(DapperDBContext context, IConfiguration configuration)
        {
            this.context = context;
            this._configuration = configuration;
        }

        public async Task<Dictionary<string,string>> Login(User user)
        {
            Dictionary<string, string> response = new Dictionary<string, string>();
            try
            {
                // Simulate user authentication (pseudo logic)
                var verifiedUser = await AuthenticateUserAsync(user.username, user.password);

                if (verifiedUser == null)
                {
                    response.Add("error", "Invalid username or password");

                    return response;
                }
                else
                {
                    var token = GenerateJwtToken(verifiedUser);
                    response.Add("name", verifiedUser.name);
                    response.Add("role", verifiedUser.role);
                    response.Add("token", token);
                    return response;
                }
            }
            catch (Exception ex)
            {
                response.Add("error", ex.ToString());
                return response;
            }
        }

        public async Task<string> Register(User user)
        {
            try
            {
                if (await UsernameExists(user.username))
                {
                    return "Username already exists";
                }

                string query = "insert into users (username, role, password, name) values(@username, @role, @password, @name)";
                var parameter = new DynamicParameters();
                parameter.Add("username", user.username, DbType.String);
                parameter.Add("password", user.password, DbType.String);
                parameter.Add("role", user.role, DbType.String);
                parameter.Add("name", user.name, DbType.String);
                using (var connection = this.context.CreateConnection())
                {
                    await connection.ExecuteAsync(query, parameter);
                    return "User registered successfully";
                }
            }
            catch (Exception ex)
            {
                return ex.ToString();
            }
        }

        private async Task<bool> UsernameExists(string username)
        {
            string query = "select 1 from users where username = @username";
            var parameter = new DynamicParameters();
            parameter.Add("username", username, DbType.String);
            using (var connection = this.context.CreateConnection())
            {
                var user = await connection.QueryAsync(query, parameter);
                if (user != null)
                {
                    return false;
                }else return true;
            }
        }

        private async Task<User> AuthenticateUserAsync(string username, string password)
        {
            string query = "select * from users where username = @username and password = @password";
            using (var connection = this.context.CreateConnection())
            {
                var user = await connection.QueryFirstOrDefaultAsync<User>(query, new { username, password });
                if (user != null)
                {
                    Console.WriteLine("user exist");
                    return user;
                }
                else
                {
                    return null;
                }              
            }
        }
        private string GenerateJwtToken(User user)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            Console.WriteLine(user.username);
            Console.WriteLine(user.role);
            var token = new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Issuer"],
                claims: new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.id.ToString()),
                    new Claim(ClaimTypes.Name, user.username),
                    new Claim(ClaimTypes.Role, user.role)
                },
                expires: DateTime.UtcNow.AddHours(1), // Token expiration time
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
