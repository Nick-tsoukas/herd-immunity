import React, { useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState(null);
    
    //  should check to see if there is a token
    function isAuth(){
        setAuth(true);
    }
    async function setToken(token){
        try{
           await AsyncStorage.setItem('token',token);
           setAuth(token);
        } catch(err){
            console.log("could not set token")
        }
    }

    async function tryLocalToken(){
        const token = await AsyncStorage.getItem('token');
        if(token){
            setAuth(token);
        } else return null
    }

    return <AuthContext.Provider value={{data: auth , setToken: setToken, tryLocalToken}}>
                { children}
           </AuthContext.Provider>
};

export default AuthContext;