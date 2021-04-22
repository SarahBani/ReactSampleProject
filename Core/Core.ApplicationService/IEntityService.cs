using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Core.ApplicationService.Contracts;

namespace Core.ApplicationService
{
    public interface IEntityService
    {

        IUnitOfWork UnitOfWork { get; }

        ICityService CityService { get; }

        ICountryService CountryService { get; }

        IHotelService HotelService { get; }

        IHotelPhotoService HotelPhotoService { get; }

        ICityRepository CityRepository { get; }

        ICountryRepository CountryRepository { get; }

        IHotelRepository HotelRepository { get; }

        IHotelPhotoRepository HotelPhotoRepository { get; }

        IBaseReadOnlyRepository<TEntity, TKey> GetRepository<TEntity, TKey>()
            where TEntity : BaseEntity<TKey>;

    }
}
