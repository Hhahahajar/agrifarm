using agrifarm_backend.Models;
using agrifarm_backend.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace agrifarm_backend.Controllers
{
    [Route("agrifarm/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepo userRepo;
        public UserController(IUserRepo userRepo)
        {
            this.userRepo = userRepo;
        }

        [HttpPost("register")]
        public async Task<ActionResult> register([FromBody] User user)
        {
            var _result = await userRepo.Register(user);
            return Ok(_result);
        }

        [HttpPost("login")]
        public async Task<ActionResult> login([FromBody] User user)
        {
            var _result = await userRepo.Login(user);
            return Ok(_result);
        }
    }
}
