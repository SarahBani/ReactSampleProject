using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using System.Threading.Tasks;
using Core.ApplicationService.Contracts;
using Core.DomainService;
using Core.DomainModel;
using Core.DomainModel.Settings;

namespace Core.ApplicationService.Implementation
{
    public class AuthService : IAuthService
    {

        #region Properties

        private readonly TokenSetting _appSettings;

        #endregion /Properties

        #region Constructors

        public AuthService(IOptions<TokenSetting> appSettings)
        {
            this._appSettings = appSettings.Value;
        }

        #endregion /Constructors

        #region Methods

        public async Task<TransactionResult> SignInAsync(string email, string password)
        {
            try
            {
                await Task.Delay(3000);
                if (email.Equals("sarah@yahoo.com", StringComparison.OrdinalIgnoreCase) &&
                    password.Equals("123456"))
                {
                    var authenticationToken = GetAuthenticationToken(email);
                    return new TransactionResult(authenticationToken);
                }
                else
                {
                    throw new CustomException(ExceptionKey.AuthenticationFailed);
                }
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private TransactionResult GetAuthenticationToken(string email)
        {
            try
            {
                DateTime expirationTime = DateTime.UtcNow.AddMinutes(double.Parse(this._appSettings.AccessExpiration));
                string token = GenerateJwtToken(expirationTime);
                var response = new AuthenticateResponse(email, token, expirationTime);
                return new TransactionResult(response);
            }
            catch (Exception ex)
            {
                return GetTransactionException(ex);
            }
        }

        private string GenerateJwtToken(DateTime expirationTime)
        {
            //var tokenHandler = new JwtSecurityTokenHandler();
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._appSettings.SecretKey));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha512Signature); //  HmacSha256Signature);

            var tokeOptions = new JwtSecurityToken(
                issuer: this._appSettings.Issuer,
                audience: this._appSettings.Audience,
                // audience: subSystems.Value,
                //claims: new List<Claim>(),
                expires: expirationTime,
                signingCredentials: credentials
            );
            return new JwtSecurityTokenHandler().WriteToken(tokeOptions);
        }

        private TransactionResult GetTransactionException(Exception exception)
        {
            if (exception is CustomException)
            {
                return new TransactionResult(exception as CustomException);
            }
            else
            {
                return new TransactionResult(new CustomException(exception));
            }
        }

        #endregion /Methods

    }
}
