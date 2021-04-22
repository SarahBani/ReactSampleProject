import React, { useCallback, useState } from 'react';

const AuthContext = React.createContext({
    isLoggedIn: false,
    authenticate: () => { }
});

const AuthContextProvider = props => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const authenticateHandler = useCallback((result) => {
        setIsAuthenticated(result);
    }, []);

    return (
        <AuthContext.Provider value={{
            isLoggedIn: isAuthenticated,
            authenticate: authenticateHandler
        }}>{props.children}
        </AuthContext.Provider>);
};

export default AuthContext;