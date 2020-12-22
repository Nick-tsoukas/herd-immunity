import React, { useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
// auth context 
const AuthContext = React.createContext();

export const AuthProvider = ({children}) => {
    const [ auth, setAuth ] = useState(null);
    const [ loading, setLoading ] = useState(true);
    
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
            
            // This funciton removes the token for testing purposes AsyncStorage.removeItem('token')
            // setAuth(token);
            setLoading(false);
        } else {
            console.log('else statement is try local token ')
            setLoading(false);
        }
    }

    return (
        <AuthContext.Provider value={{data: auth , loading: loading, setToken: setToken, tryLocalToken}}>
                { children}
        </AuthContext.Provider>
    ) 
};

export default AuthContext;