using System.Collections.Generic;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainModel.Entities;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class LocationController : BaseAPIController
    {

        #region Properties

        private readonly ICountryService _countryService;
        private readonly ICityService _cityService;

        #endregion /Properties

        #region Constructors

        public LocationController(ICountryService countryService,
            ICityService cityService)
        {
            this._countryService = countryService;
            this._cityService = cityService;
        }

        #endregion /Constructors

        #region Actions      

        [HttpGet("GetCountries")]
        public Task<IList<Country>> GetCountriesAsync()
        {
            return this._countryService.GetAllAsync();
        }

        [HttpGet("GetCities/{countryId}")]
        public Task<IList<City>> GetCitiesByCountryIdAsync(short countryId)
        {
            return this._cityService.GetListByCountryIdAsync(countryId);
        }

        #endregion /Actions

    }
}
