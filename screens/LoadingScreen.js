import React, { useEffect, useContext} from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import AuthContext from '../context/AuthContext';

const LoadingScreen = ({navigation}, props) => {
    let { data, tryLocalToken} = useContext(AuthContext);

    useEffect(() => {
    tryLocalToken();
    },[])

    return(
        <View style={styles.screen}>
            <ActivityIndicator size="large" color="#00ff00" />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    }
})

export default LoadingScreen