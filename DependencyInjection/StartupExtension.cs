using Core.ApplicationService;
using Core.ApplicationService.Contracts;
using Core.ApplicationService.Implementation;
using Core.DomainModel.Entities;
using Core.DomainService;
using Core.DomainService.Repositoy;
using Infrastructure.DataBase.Repository;
using Infrastructure.Postgres;
using Microsoft.Extensions.DependencyInjection;

namespace DependencyInjection
{
    public static class StartupExtension
    {
        public static IServiceCollection SetInjection(this IServiceCollection services)
        {
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IEntityService, EntityService>();

            services.AddScoped(typeof(IBaseReadOnlyRepository<City, long>), typeof(CityRepository));
            services.AddScoped(typeof(IBaseReadOnlyRepository<Country, short>), typeof(CountryRepository));
            services.AddScoped(typeof(IBaseRepository<Hotel, long>), typeof(HotelRepository));
            services.AddScoped(typeof(IBaseRepository<HotelPhoto, long>), typeof(HotelPhotoRepository));

            services.AddScoped(typeof(IAuthService), typeof(AuthService));
            services.AddScoped(typeof(ICityService), typeof(CityService));
            services.AddScoped(typeof(ICountryService), typeof(CountryService));
            services.AddScoped(typeof(IHotelService), typeof(HotelService));
            services.AddScoped(typeof(IHotelPhotoService), typeof(HotelPhotoService));

            return services;
        }
    }
}