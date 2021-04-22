using Core.DomainService;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IAuthService
    {

        Task<TransactionResult> SignInAsync(string email, string password);

    }
}
