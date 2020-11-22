import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';

const SettingScreen = ({navigation}, props) => {
    return(
        <View>
            <Text style={{color: 'green'}}>Hello this is the settings screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'black'
    }
});

export default SettingScreen;