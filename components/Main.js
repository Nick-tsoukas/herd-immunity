import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, useHeaderHeight } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements'
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import SettingScreen from '../screens/SettingScreen';
import ChartScreen from '../screens/Charts.js';
import ForgotPassScreen from '../screens/ForgotPassScreen';
import LoadingScreen from '../screens/LoadingScreen';
import AuthContext from '../context/AuthContext';
// ======== task 
// Set up bottom tabs and also fix the loading screen
// The main navigation 
const Stack = createStackNavigator();
const HomeTabs = createBottomTabNavigator();
const Main = ({navigation}, props) => {
  // checks to see if there is a local token stored in the async storage data is the token
  let { data, loading, tryLocalToken } = useContext(AuthContext);


// This runs after the component gets rendered 
  useEffect( () => {
    tryLocalToken();
    },[])
  
    if(loading) {
      return(
        <View style={styels.screen}>
          <Text>Hello this is the loading screen</Text>
          <ActivityIndicator size="small" color="#0000ff" />
        </View>
      )
    }
  return (
    <NavigationContainer>
      {data ? (
          <>
            <HomeTabs.Navigator
             tabBarOptions={{style: {height: '10%', paddingBottom: 10}}}
             initialRouteName="Home">
              <Stack.Screen
              options={{
                tabBarIcon: () => <Icon
                name='sc-telegram'
                type='evilicon'
                color='#517fa4'
              />
              }}
               name="Home" component={HomeScreen} />
              <Stack.Screen
              options={{
                tabBarIcon: () => <Icon
                name='sc-telegram'
                type='evilicon'
                color='#517fa4'
              />
              }}
               name="Profile" component={ProfileScreen} />
              <Stack.Screen 
              options={{
                tabBarIcon: () => <Icon
                name='sc-telegram'
                type='evilicon'
                color='#517fa4'
              />
              }}
               name="Chart" component={ChartScreen} />
              <Stack.Screen
              options={{
                tabBarIcon: () => <Icon
                name='sc-telegram'
                type='evilicon'
                color='#517fa4'
              />
              }}
               name="Setting" component={SettingScreen} />
            </HomeTabs.Navigator>
          </>
        ) : (
          <>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen name="Welcome" options={{headerShown: false}} component={WelcomeScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: 'Herd', headerTitleAlign:'center'}} name="SignUp" component={SignUpScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: "Herd", headerTitleAlign:'center'}} name="SignIn" component={SignInScreen} />
            <Stack.Screen options={{ headerTransparent:true, title: "Herd", headerTitleAlign:'center'}} name="ForgotPass" component={ForgotPassScreen} />
          </Stack.Navigator>
          </>
        )}
    </NavigationContainer>
  );
};

const styels = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Main;
