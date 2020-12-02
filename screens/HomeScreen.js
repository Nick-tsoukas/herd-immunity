import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
// import socket from '../helpers/socket';
import io from "socket.io-client";
let socket = io("http://cbddf7fef8fe.ngrok.io");

//  now I need to log the location as the user moves 

const HomeScreen = ({navigation}, props) => {

    const [ lat, setLat ] = useState(0);
    const [ long, setLong ] = useState(0);

    const watchLocation = () => {
      Geolocation.watchPosition(
        (position) => {
          console.log(position);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, distanceFilter: 1, interval: 1000, fastestInterval:1000 }
    );
    }

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
          locationPermission();
    },[]);

    useEffect(() => {
      socket.on('connect', (data) => {
        console.log('You are connected to the web socket right now ')
    }); 
    },[])

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
          <View style={{marginTop: 30}}>
            <Button
            title="Start Watching Please"
            onPress={watchLocation}
            />
          </View>
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


// this is what the location data looks like

// {
//   "coords":
//    {"accuracy": 5.89300012588501, 
//     "altitude": 0,
//     "heading": 173.00282287597656,
//     "latitude": 41.9312083,
//     "longitude": -87.9117359,
//     "speed": 1.383662223815918},
//     "mocked": false, 
//     "timestamp": 1606930651245
//   }