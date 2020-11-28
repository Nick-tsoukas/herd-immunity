import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Charts = ({navigation}, props) => {
    return(
        <View>
            <Text>This is the Chart screen</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default Charts;