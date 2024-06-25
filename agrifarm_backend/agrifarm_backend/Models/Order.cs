using System.Security.Cryptography.X509Certificates;

namespace agrifarm_backend.Models
{
    public class Order
    {
        public int id { get; set; }
        public string? orderId { get; set; }
        public string? customerName { get; set; }
        public int? quantity { get; set; }
        public string? location { get; set; }
        public float? totalAmount { get; set; }
        public string? status { get; set; }
        public string? telephone { get; set; }
        public int productId { get; set; }

    }
}
