import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({navigation}, props) => {
    return(
        <View>
            <Text>This is the Home screen</Text>
            <Button
            title="Profile"
            onPress={() => navigation.navigate("Profile")}
             />
        </View>
    )
}

export default HomeScreen;