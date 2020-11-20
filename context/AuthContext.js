import React, { useState} from 'react';

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState(false);
    function isAuth(){
        console.log('this is the isAuth funciton hello world I am here ..... lolo lollo lool ')
        setAuth(true);
    }

    return <AuthContext.Provider value={{data: auth, isAuth: isAuth}}>
                { children}
           </AuthContext.Provider>
};

export default AuthContext;