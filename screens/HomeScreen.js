import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-elements';
import MapView from 'react-native-maps';

// need to get current location of the user from the phone
const HomeScreen = ({navigation}, props) => {
    return(
        <View style={styles.screen}>
            <MapView
            style={styles.map}
            initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            }}
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
        height: '50%',
        width: '100%'
    }
})

export default HomeScreen;