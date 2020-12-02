import 'react-native-gesture-handler';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';
import { AuthProvider } from './context/AuthContext';
import Main from './components/Main';
const Stack = createStackNavigator();
// Auth provider wraps the app in the auth context 
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
