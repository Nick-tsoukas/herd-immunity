import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import io from "socket.io-client";
let socket = io("http://4e088bb7dd2e.ngrok.io");

// any time location movement state is updated what should we do ... emit locationmovement event to the web server
const HomeScreen = ({navigation}, props) => {
    const [ otherUsers, setOtherUsers ] = useState([]);
    const [ lat, setLat ] = useState(0);
    const [ long, setLong ] = useState(0);
    const [locationMovement , setLocationMovement ] = useState({
      "coords":
       {"accuracy": 0, 
        "altitude": 0,
        "heading": 0,
        "latitude": 0,
        "longitude": 0,
        "speed": 0},
        "mocked": false, 
        "timestamp": 0
      });

    const watchLocation = () => {
      console.log('watch location function is now running')
      Geolocation.watchPosition(
        (position) => {
          setLocationMovement(position);
        },
        (error) => {
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, interval: 2000, fastestInterval:2000 }
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
                    // setLocationMovement(position)
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
          socket.on('connect', (data) => {
            console.log('You are connected to the web socket right now ');
        }); 
    },[]);

    useEffect(() => {
    socket.emit('location', locationMovement);
    socket.on('location', (data) => {
      console.log(data)
    });
    },[locationMovement]);

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
              <View>
                <Text>{locationMovement.coords.latitude.toString()}</Text>
              </View>
              <View>
                {otherUsers.length ?
                    otherUsers.map((u) => {
                      return(
                        <View>
                          <Text>{u}</Text>
                        </View>
                      )
                    })
                    : <Text>No other users here</Text>
                }
              </View>
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
