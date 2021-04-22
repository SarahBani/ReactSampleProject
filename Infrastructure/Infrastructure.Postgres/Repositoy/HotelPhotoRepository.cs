using Core.DomainModel.Entities;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repositoy;

namespace Infrastructure.DataBase.Repository
{
    public class HotelPhotoRepository : BaseRepository<HotelPhoto, long>, IHotelPhotoRepository
    {
        public HotelPhotoRepository(ApplicationDbContext dbContext)
            : base(dbContext)
        {

        }
    }
}
