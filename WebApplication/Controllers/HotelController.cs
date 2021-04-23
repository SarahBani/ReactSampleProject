﻿using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainModel;
using Core.DomainModel.Entities;
using Core.DomainService;
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

        [HttpGet("GetRandomList")]
        public Task<IList<Hotel>> GetSummaryListAsync()
        {
            return this._hotelService.GetListAsync(null, null, new Page(1, 6));
        }

        [HttpGet("GetList")]
        //public Task<IList<Hotel>> GetListAsync([FromQuery] long? cityId, [FromQuery] short? countryId,
        //   [FromQuery] short? pageNo, [FromQuery] short? pageCount)
        //      {
        //        Page page = null;
        //        if (pageNo.HasValue && pageCount.HasValue)
        //        {
        //            page = new Page(pageNo.Value, pageCount.Value);
        //}
        //        return this._hotelService.GetListAsync(cityId, countryId, page);
        //    }
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
        public Task<int> GetCountAsync(long? cityId, short? countryId)
        {
            return this._hotelService.GetCountAsync(cityId, countryId);
        }

        [HttpGet("GetHotelPhotos/{hotelId}")]
        public Task<IList<HotelPhoto>> GetPhotosAsync(int hotelId)
        {
            return this._hotelPhotoService.GetListByHotelIdAsync(hotelId);
        }

        [HttpPost("UploadPhoto/{hotelId}"), DisableRequestSizeLimit]
        public IActionResult UploadPhoto(long hotelId)
        {
            return UploadImage(@$"Hotels\{hotelId}");
        }

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