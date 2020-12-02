import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import socket from '../helpers/socket';
import io from "socket.io-client";
let socket = io("http://cbddf7fef8fe.ngrok.io");

const HomeScreen = ({navigation}, props) => {

    const [ lat, setLat ] = useState(0);
    const [ long, setLong ] = useState(0);
    const locationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: "Cool Photo App Camera Permission",
            message:
              "Cool app need to access your location " +
              "so you can track if you were exposed to covid .",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              Geolocation.getCurrentPosition(
                  (position) => {
                    setLong(position.coords.longitude);
                    setLat(position.coords.latitude);
                  },
                  (error) => {
                    console.log(error.code, error.message);
                  },
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
        } else {
          console.log("Location permission denied");
        }
      } catch (err) {
        console.warn(err);
      }
    };

    useEffect( () => {
      console.log(socket)
      socket.on('connect', (data) => {
        console.log('You are connected to the web socket right now ')
    }); 
          locationPermission();
    },[]);

    return(
        <View style={styles.screen}>
            <MapView
            style={styles.map}
            showsUserLocation={true}
            region={
              {longitude: long,
              latitude: lat,
              longitudeDelta: 0.10,
              latitudeDelta: 0.10}
            }
  />
        </View>
    )
        }

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        height: '80%',
        width: '100%'
    }
})

export default HomeScreen;