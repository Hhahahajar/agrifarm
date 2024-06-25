using agrifarm_backend.Models;

namespace agrifarm_backend.Repo
{
    public interface IUserRepo
    {
        Task<String> Register(User user);
        Task<Dictionary<string,string>> Login(User user);
    }
}
