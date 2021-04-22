using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class HotelRepository : BaseRepository<Hotel, long>, IHotelRepository
    {
        public HotelRepository(ApplicationDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
