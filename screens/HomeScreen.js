import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import socket from "../helpers/socket";
import axios from 'axios'
// navigation is for react navigation library. Used to navigate to different screens

// ==== Next task is to save the location data to database
const HomeScreen = ({navigation}, props) => {
    const [ lat, setLat ] = useState(0);
    const [ long, setLong ] = useState(0);
    const [locationMovement , setLocationMovement ] = useState([]);
    // This location object will be used for testing only I'm trying to save some location data to a data base
   let testLocation =  {
      "coords":{
         "accuracy":5,
         "altitude":0,
         "heading":2.494295120239258,
         "latitude":41.92916,
         "longitude":-87.8943802,
         "speed":8.082158088684082
      },
      "mocked":false,
      "timestamp":1607272587108
   }

     //  I don't know why I have this here {locationMovement.coords.latitude.toString()}
    const stop = async () => {
      await Geolocation.stopObserving();
      axios.post('http://83c470c282db.ngrok.io/location', testLocation)

    }
    const watchLocation = ()  => {
      /* this code will let the server listen to the socket emit the location event back to the client
         Locatoin is the location event writen on the server
         ===================================
         socket.on('location', (data) => {
           console.log(data);
      });
         =======================================
      */
      Geolocation.watchPosition(
        // Position is well, the current position of the user
        // documetation is here https://github.com/Agontuk/react-native-geolocation-service
        (position) => {
          /* setLocationMovement function sets the state, using ... the previous state and concating the new current position
          - I want to save a block of location data from when the user starts tracking location and then save when they stop for 
          a certain period of time
          */
          setLocationMovement(preState => [...preState, position]);
        },
        // If there is an error all this will do is log the error
        (error) => {
          console.log(error.code, error.message);
        },
        // You can pass many options here
        { enableHighAccuracy: true }
    );
    }

    
    // This code gets location permission from the user
    const locationPermission = async () => {
      try {
        // Async operation waits for the user to accept giving up location details
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          // Describes the pop up to ask user for permission
          {
            title: "Herd Immunity",
            message:
              "Cool app need to access your location " +
              "so you can track if you were exposed to covid .",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK"
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // This code gets the currnet location of the user and then sets the state .... Longitute and Latitude
              Geolocation.getCurrentPosition(
                  (position) => {
                    setLong(position.coords.longitude);
                    setLat(position.coords.latitude);
                    // Why is this commented out
                    // setLocationMovement(position)
                  },
                  // If there is an error this will only log out the error
                  (error) => {
                    console.log(error.code, error.message);
                  },
                  // passes options to the geolocation function 
                  { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
              );
        } else {
          // This will only log out that the location permission has been denied
          console.log("Location permission denied");
        }
      } catch (err) {
        // Console.warn is just a red color console.log
        console.warn(err);
      }
    };

    useEffect( () => {
      // This funciton will run only once right after the render if I am not mistaken
          locationPermission();
    },[]);

    useEffect(() => {
      // socket.emit('location', locationMovement);
      console.log(locationMovement)
      // using the second argument this code will only run when the state of locaiontMovement state is updated
    },[locationMovement]);

    return(
        <View style={styles.screen}>
            <MapView
            style={styles.map}
            showsUserLocation={true}
            region={
              {longitude: long,
              latitude: lat,
              longitudeDelta: 0.90,
              latitudeDelta: 0.90}
            }
          >
           </MapView>
          <View style={{marginTop: 30}}>
           <Text>I should put a where are you going here</Text>
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


