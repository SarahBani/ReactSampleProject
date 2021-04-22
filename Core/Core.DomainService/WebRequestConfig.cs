﻿using Core.DomainModel.Settings;
using Microsoft.Extensions.Configuration;

namespace Core.DomainService
{
    public static class WebRequestConfig
    {

        #region Properties

        public static ErrorHandling ErrorHandling { get; private set; }

        #endregion /Properties

        #region Methods

        public static void Configure(IConfiguration config)
        {
            ErrorHandling = Utility.GetApplicationSettingSecion<ErrorHandling>(config);
        }

        #endregion /Methods

    }
}
