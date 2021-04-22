using Npgsql;
using System;

namespace Core.DomainModel
{
    public enum ExceptionKey
    {
        NotDefined = -1,

        TimeoutExpired = -2,
        HasForeignKey = 547,
        HasDuplicateInfo = 2601,
        KeyAlreadyExsits = 2627,
        ArithmeticOverflow = 8115,

        NoActiveTransaction,
        AuthenticationFailed,
        AuthenticationIsRequired,
    }

    public class CustomException : Exception
    {

        #region Properties

        public string CustomMessage { get; private set; }

        public ExceptionContent Content { get; private set; }

        #endregion /Properties

        #region Constructors

        public CustomException(Exception exception)
        {
            var baseException = exception.GetBaseException();
            this.CustomMessage = GetMessage(baseException);
            this.Content = new ExceptionContent(baseException.Message,
                baseException.Source,
                baseException.StackTrace);
        }

        public CustomException(ExceptionKey exceptionKey, params object[] args)
        {
            this.CustomMessage = string.Format(GetMessage(exceptionKey), args);
        }

        public CustomException(string message)
        {
            this.CustomMessage = message;
        }

        #endregion /Constructors

        #region Methods      

        private string GetMessage(Exception baseException)
        {
            if (baseException is NpgsqlException)
            {
                ExceptionKey exceptionKey = (ExceptionKey)(baseException as NpgsqlException).ErrorCode;

                switch (exceptionKey)
                {
                    case ExceptionKey.TimeoutExpired:
                        return Constant.Exception_sql_TimeoutExpired;
                    case ExceptionKey.HasForeignKey:
                        return Constant.Exception_sql_HasDepandantInfo;
                    case ExceptionKey.HasDuplicateInfo:
                        return Constant.Exception_sql_HasDuplicateInfo;
                    case ExceptionKey.KeyAlreadyExsits:
                        return Constant.Exception_sql_KeyAlreadyExsits;
                    case ExceptionKey.ArithmeticOverflow:
                        return Constant.Exception_sql_ArithmeticOverflow;
                    default:
                        return Constant.Exception_HasError;
                }
            }
            return Constant.Exception_HasError;
        }

        private string GetMessage(ExceptionKey exceptionKey)
        {
            switch (exceptionKey)
            {
                case ExceptionKey.NoActiveTransaction:
                    return Constant.Exception_NoActiveTransaction;
                case ExceptionKey.AuthenticationFailed:
                    return Constant.Exception_AuthenticationFailed;
                case ExceptionKey.AuthenticationIsRequired:
                    return Constant.Exception_AuthenticationIsRequired;
                case ExceptionKey.NotDefined:
                default:
                    return Constant.Exception_HasError;
            }
        }

        #endregion /Methods

    }
}