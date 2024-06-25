using agrifarm_backend.Models;
using agrifarm_backend.Repo;
using Microsoft.AspNetCore.Mvc;

namespace agrifarm_backend.Controllers
{
    [Route("agrifarm/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        private readonly IStockRepo stockRepo;
        public StockController(IStockRepo stockRepo)
        {
            this.stockRepo = stockRepo;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddProduct([FromBody] Stock stock)
        {
            var _result = await stockRepo.Create(stock);
            return Ok(_result);
        }

        [HttpGet("getAll")]

        public async Task<ActionResult> GetAll()
        {
            var _stockList = await stockRepo.GetAll();
            if (_stockList != null)
            {
                return Ok(_stockList);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getByName/{name}")]
        public async Task<ActionResult> GetStockByName(string name)
        {
            var _stock = await stockRepo.GetStockByName(name);
            if (_stock != null)
            {
                return Ok(_stock);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("updateStock")]
        public async Task<ActionResult> UpdateStock(int id, [FromBody] Stock stock)
        {
            var _result = await stockRepo.Update(id, stock);
            return Ok(_result);
        }

        [HttpDelete("deleteStock")]
        public async Task<ActionResult> RemoveStock(int id)
        {
            var _result = await stockRepo.Remove(id);
            return Ok(_result);
        }
    }
}
