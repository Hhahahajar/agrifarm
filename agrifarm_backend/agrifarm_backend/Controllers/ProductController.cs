using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using agrifarm_backend.Repo;
using agrifarm_backend.Models;

namespace agrifarm_backend.Controllers
{
    [Route("agrifarm/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepo productRepo;
        public ProductController(IProductRepo productRepo)
        {
            this.productRepo = productRepo;
        }
        [HttpPost("add")]
        public async Task<ActionResult> AddProduct([FromBody] Product product)
        {
            var _result = await productRepo.Create(product);
            return Ok(_result);
        }

        [HttpGet("getAll")]

        public async Task<ActionResult> GetAll()
        {
            var _productList = await productRepo.GetAll();
            if (_productList != null)
            {
                return Ok(_productList);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("getByName/{name}")]
        public async Task<ActionResult> GetProductByName(string name)
        {
            var _product = await productRepo.GetProductByName(name);
            if (_product != null)
            {
                return Ok(_product);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPut("updateProduct")]
        public async Task<ActionResult> UpdateProduct(int id, [FromBody] Product product)
        {
            var _result = await productRepo.Update(id, product);
            return Ok(_result);
        }

        [HttpDelete("deleteProduct")]
        public async Task<ActionResult> RemoveProduct(int id)
        {
            var _result = await productRepo.Remove(id);
            return Ok(_result);
        }
    }
}
