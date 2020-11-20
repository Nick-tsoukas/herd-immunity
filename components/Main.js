import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import AuthContext from '../context/AuthContext';
import {AuthProvider} from '../context/AuthContext';
const Stack = createStackNavigator();

//  will need to write a function that checks for token in the async storage
// can use conditional logic to show the sign in screen or the home screen

// ==================
// next step style the header for the sign up screens 

const Main = ({navigation}, props) => {
  let isLoggedIn = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
      {isLoggedIn ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
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
