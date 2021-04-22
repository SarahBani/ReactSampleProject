using Core.DomainModel.Entities;
using Core.DomainService;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Core.ApplicationService.Contracts
{
    public interface IHotelService
    {

        Task<Hotel> GetByIdAsync(long id);

        Task<IList<Hotel>> GetAllAsync();

        Task<int> GetCountAsync();

        Task<IList<Hotel>> GetListAsync(long? cityId, short? countryId);

        Task<int> GetCountAsync(long? cityId, short? countryId);

        Task<TransactionResult> InsertAsync(Hotel hotel);

        Task<TransactionResult> UpdateAsync(Hotel hotel);

        Task<TransactionResult> DeleteAsync(long id);

    }
}
