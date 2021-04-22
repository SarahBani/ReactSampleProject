using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using UserInterface.Models;
using Microsoft.AspNetCore.Authorization;
using Core.DomainService;

namespace WebApplication.Controllers
{
    [Route("Auth")]
    [ApiController]
    public class AuthenticationController : BaseAPIController
    {

        #region Properties

        private readonly IAuthService _authService;

        #endregion /Properties

        #region Constructors

        public AuthenticationController(IAuthService authService)
        {
            this._authService = authService;
        }

        #endregion /Constructors

        #region Actions

        [AllowAnonymous]
        [HttpPost, Route("SignIn")]
        public async Task<TransactionResult> SignInAsync([FromBody] AuthModel model)
        {
            if (model == null)
            {
                //return base.GetInvalidRequestResult();
            }
            return await this._authService.SignInAsync(model.Email, model.Password);
            //if (transactionResult.IsSuccessful)
            //{
            //    var response = transactionResult.Content;
            //    return base.GetActionResult(response);
            //}
            //return base.GetErrorResult(transactionResult);
            ////return Unauthorized();
        }

        [Authorize]
        [HttpGet, Route("GetTest")]
        public IActionResult GetTest()
        {
            var data = new string[] { "value1", "value2", "value3", "value4", "value5" };
            return Ok(data);
        }

        #endregion /Actions

    }
}
