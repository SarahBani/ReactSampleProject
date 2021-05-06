using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    [Route("[controller]")]
    public class HotelController : BaseAPIController
    {

        #region Properties

        private readonly IHotelService _hotelService;
        private readonly IHotelPhotoService _hotelPhotoService;

        #endregion /Properties

        #region Constructors

        public HotelController(IHotelService hotelService,
            IHotelPhotoService hotelPhotoService)
        {
            this._hotelService = hotelService;
            this._hotelPhotoService = hotelPhotoService;
        }

        #endregion /Constructors

        #region Actions   

        [HttpGet("GetList")]
        public Task<IList<Hotel>> GetListAsync([FromQuery] GetHotelListQueryModel model)
        {
            Page page = null;
            if (model.PageNo.HasValue && model.PageCount.HasValue)
            {
                page = new Page(model.PageNo.Value, model.PageCount.Value);
            }
            return this._hotelService.GetListAsync(model.CityId, model.CountryId, page);
        }

        [HttpGet("GetCount")]
        [HttpGet("GetCount/{cityId}/{countryId}")]
        public Task<int> GetCountAsync([FromQuery] long? cityId, [FromQuery] short? countryId)
        {
            return this._hotelService.GetCountAsync(cityId, countryId);
        }

        [HttpGet("GetById/{id}")]
        public Task<Hotel> GetByIdAsync(long id)
        {
            return this._hotelService.GetByIdAsync(id);
        }

        [HttpGet("GetPhotos/{hotelId}")]
        public Task<IList<HotelPhoto>> GetPhotosAsync(int hotelId)
        {
            return this._hotelPhotoService.GetListByHotelIdAsync(hotelId);
        }

        [Authorize]
        [HttpPost("Insert")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> InsertAsync([FromBody] Hotel hotel)
        {
            var result = await this._hotelService.InsertAsync(hotel);
            if (result.IsSuccessful)
            {               
                return base.GetOKResult();
            }
            return base.GetErrorResult(result);
        }

        [Authorize]
        [HttpPut("Update/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> UpdateAsync([FromRoute] long id, [FromBody] Hotel hotel)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._hotelService.UpdateAsync(hotel);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            return base.GetErrorResult(result);
        }

        [Authorize]
        [HttpDelete("Delete/{id}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<IActionResult> DeleteAsync([FromRoute] long id)
        {
            if (id <= 0)
            {
                return base.GetInvalidRequestResult();
            }
            var result = await this._hotelService.DeleteAsync(id);
            if (result.IsSuccessful)
            {
                return base.GetOKResult();
            }
            return base.GetErrorResult(result);
        }

        [Authorize]
        [HttpPost("UploadPhoto/{hotelId}"), DisableRequestSizeLimit]
        public IActionResult UploadPhoto(long hotelId)
        {
            return UploadImage(@$"Hotels\{hotelId}");
        }

        [Authorize]
        [HttpDelete("DeletePhoto")]
        public IActionResult DeletePhoto(string filePath)
        {
            return DeleteImage(filePath);
        }

        #endregion /Actions   

        #region Methods

        private IActionResult UploadImage(string subFolderName)
        {
            try
            {
                var file = Request.Form.Files[0];
                if (file.Length > 0)
                {
                    string filePath = Utility.UploadImage(file, subFolderName);
                    return Ok(new TransactionResult(filePath));
                }
                return BadRequest(new TransactionResult(new CustomException(Constant.Exception_EmptyFile)));
            }
            catch (Exception ex)
            {
                return base.GetErrorResult();
            }
        }

        private IActionResult DeleteImage(string filePath)
        {
            try
            {
                if (!string.IsNullOrEmpty(filePath))
                {
                    Utility.DeleteFile(filePath);
                }
                return Ok(new TransactionResult());
            }
            catch (Exception ex)
            {
                return base.GetErrorResult();
            }
        }

        #endregion /Methods

    }
}