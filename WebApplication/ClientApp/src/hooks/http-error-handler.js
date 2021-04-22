import { useEffect, useState } from "react";

export default httpErrorHandler => {

    const [error, setError] = useState();

    const reqInterceptor = httpErrorHandler.interceptors.request.use(
        req => {
            setError(null);
            return req;
        });

    const resInterceptor = httpErrorHandler.interceptors.response.use(
        res => res,
        err => {
            setError(err);
        }
    );

    useEffect(() => {
        return () => {
            httpErrorHandler.interceptors.request.eject(reqInterceptor);
            httpErrorHandler.interceptors.response.eject(resInterceptor);
        }
    }, [reqInterceptor, resInterceptor]);

    const clearError = () => {
        setError(null);
    }

    //return [error, clearError]; //or
    return { error, clearError };
}