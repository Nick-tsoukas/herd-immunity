import React from 'react';
import { View, Text, StyleSheet} from 'react-native';

const SettingScreen = ({navigation}, props ) => {
    return(
        <View>
            <Text>This is the setting screen</Text>
        </View>
    )
}

const stlyes = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default SettingScreen;