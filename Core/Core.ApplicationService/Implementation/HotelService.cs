using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Core.ApplicationService.Implementation
{
    public class HotelService : BaseService<IHotelRepository, Hotel, long>, IHotelService
    {

        #region Properties

        #endregion /Properties

        #region Constructors

        public HotelService(IEntityService entityService)
            : base(entityService)
        {
        }

        #endregion /Constructors

        #region Methods

        public override Task<Hotel> GetByIdAsync(long id) =>
           base.GetQueryable()
            .Include(q => q.City)
            .Include(q => q.City.Country)
            .SingleAsync(q => q.Id == id);

        //public override Task<IList<Hotel>> GetAllAsync() =>
        //    base.GetQueryable().Include(q => q.City).Include(q => q.City.Country).ToIListAsync();

        //public Task<int> GetCountAsync() => base.GetQueryable().CountAsync();

        public async Task<IList<Hotel>> GetListAsync(long? cityId, short? countryId, Page page = null)
        {
            var list = base.GetQueryable();
            if (cityId.HasValue)
            {
                list = list.Where(q => q.CityId.Equals(cityId.Value));
            }
            if (countryId.HasValue)
            {
                list = list.Where(q => q.City.CountryId.Equals(countryId.Value));
            }
            if (page != null)
            {
                list = list.Skip(page.FirstRowIndex * page.Count).Take(page.Count);
            }
            var hotels = await list.Include(q => q.City).Include(q => q.City.Country).ToListAsync();
            foreach (var hotel in hotels)
            {
                var hotelPhoto = this.EntityService.HotelPhotoService.GetFirstByHotelIdAsync(hotel.Id).Result;
                if (hotelPhoto != null)
                {
                    hotel.Photos = new List<HotelPhoto>();
                    hotel.Photos.Add(hotelPhoto);
                }
            }
            return hotels;
        }

        public Task<int> GetCountAsync(long? cityId, short? countryId)
        {
            var list = base.GetQueryable();
            if (cityId.HasValue)
            {
                list = list.Where(q => q.CityId.Equals(cityId.Value));
            }
            if (countryId.HasValue)
            {
                list = list.Where(q => q.City.CountryId.Equals(countryId.Value));
            }
            return list.CountAsync();
        }

        #endregion /Methods

    }
}
