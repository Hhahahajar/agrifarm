namespace agrifarm_backend.Models
{
    public class Product
    {
        public int id { get; set; }
        public int productId { get; set; }
        public string? name { get; set; }
        public int quantity {  get; set; }
        public float price { get; set; }
    }
}
