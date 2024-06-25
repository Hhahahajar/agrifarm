namespace agrifarm_backend.Models
{
    public class User
    {
        public int id { get; set; }
        public string? username { get; set; }
        public string? role { get; set; }
        public string? password { get; set; }
        public string? name { get; set; }
    }
}
