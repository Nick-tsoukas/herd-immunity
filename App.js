import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
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
