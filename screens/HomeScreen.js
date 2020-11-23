import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';


// need to get current location of the user from the phone
// must get users permission to get access to location data
import Geolocation from 'react-native-geolocation-service';


const HomeScreen = ({navigation}, props) => {
    const [ lat, setLat ] = useState('');
    const [ long, setLong ] = useState('');
    
    const hasPermission = async () => {
        try{
            const hasPermission =  await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
            console.log(hasPermission);
        } 
        catch(err) {
            console.log(err)
        }
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
                     console.log(position.coords)
                      setLong(position.coords.longitude);
                      setLat(position.coords.latitude);
                    },
                    (error) => {
                      // See error code charts below.
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
    useEffect(() => {
          locationPermission();
    },[]);
    if(!lat){
        return (
            <View><Text>hello there is nothing</Text></View>
        )
    } else {

    return(
        <View style={styles.screen}>
            <MapView
            style={styles.map}
            initialRegion={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
  />
        </View>
    )
        }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center'
    },
    map: {
        height: '50%',
        width: '100%'
    }
})

export default HomeScreen;