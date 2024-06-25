using agrifarm_backend.Models;
using agrifarm_backend.Repo;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace agrifarm_backend.Controllers
{
    [Route("agrifarm/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepo orderRepo;
        public OrderController (IOrderRepo orderRepo)
        {
            this.orderRepo = orderRepo;
        }

        [HttpPost("add")]
        public async Task<ActionResult> AddProduct([FromBody] Order order)
        {
            var _result = await orderRepo.Create(order);
            return Ok(_result);
        }

        [HttpGet("getAll")]

        public async Task<ActionResult> GetAll()
        {
            var _orderList = await orderRepo.GetAll();
            if (_orderList != null)
            {
                return Ok(_orderList);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getByName/{name}/{product}")]
        public async Task<ActionResult> GetOrderByName(string name, string product)
        {
            var _order = await orderRepo.GetOrderByName(name, product);
            if (_order != null)
            {
                return Ok(_order);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("updateOrder")]
        public async Task<ActionResult> UpdateOrder(int id, [FromBody] Order order)
        {
            var _result = await orderRepo.Update(id, order);
            return Ok(_result);
        }

        [HttpDelete("deleteOrder")]
        public async Task<ActionResult> RemoveOrder(int id)
        {
            var _result = await orderRepo.Remove(id);
            return Ok(_result);
        }
    }
}
