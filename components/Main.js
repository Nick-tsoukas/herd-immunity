import React, { useContext, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import LoadingScreen from '../screens/LoadingScreen';
import AuthContext from '../context/AuthContext';
const Stack = createStackNavigator();

const Main = ({navigation}, props) => {
  // checks to see if there is a local token stored in the async storage 
  let { data, tryLocalToken} = useContext(AuthContext);

  useEffect(() => {
    tryLocalToken();
    },[])

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      {data ? (
          <>
            <Stack.Screen options={{headerShown: false}} name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: 'Herd', headerTitleAlign:'center'}} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: "Herd", headerTitleAlign:'center'}} name="SignIn" component={SignInScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: "Herd", headerTitleAlign:'center'}} name="ForgotPass" component={ForgotPassScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Main;
