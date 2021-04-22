using System;

namespace Core.DomainModel
{
    public class AuthenticateResponse
    {

        #region Properties

        public string Email { get; private set; }

        public string Token { get; private set; }

        public DateTime TokenExpiration { get; private set; }

        #endregion /Properties

        #region Constructors

        public AuthenticateResponse(string email, string token, DateTime tokenExpiration)
        {
            this.Email = email;
            this.Token = token;
            this.TokenExpiration = tokenExpiration;
        }

        #endregion /Constructors

    }
}
