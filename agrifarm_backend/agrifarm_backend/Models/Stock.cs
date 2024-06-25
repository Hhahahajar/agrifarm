using Org.BouncyCastle.Asn1.Crmf;

namespace agrifarm_backend.Models
{
    public class Stock
    {
        public int id { get; set; }
        public string? stockId { get; set; }
        public string name { get; set; }
        public int quantity { get; set; }
        public double price { get; set; }
        public double totalAmount { get; set; }
    }
}
