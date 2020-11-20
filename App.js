import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { View, Text } from 'react-native';
import { ThemeProvider } from 'react-native-elements';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ForgotPassScreen from './screens/ForgotPassScreen';
import AuthContext from './context/AuthContext';
import {AuthProvider} from './context/AuthContext';
import Main from './components/Main';
const Stack = createStackNavigator();

//  will need to write a function that checks for token in the async storage
// can use conditional logic to show the sign in screen or the home screen

// ==================
// next step style the header for the sign up screens 

const App = () => {
  return (
    <AuthProvider>
    <ThemeProvider>
      <Main />
    </ThemeProvider>
    </AuthProvider>
  );
};


export default App;
