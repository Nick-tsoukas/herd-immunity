import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({navigation}, props) => {
    return(
        <LinearGradient colors={['#7cffcb', '#74f2ce']} style={styles.screen}>
            <View style={styles.title}>
                <Text h3>Herd Immunity</Text>
            </View>
            <View style={styles.message}>
                <Text style={styles.messageText}>
                Earn{"\n"}Stay Safe{"\n"}Save a Life</Text>
                </View>
            <View style={styles.buttonContainer}>
                <Button onPress={() => navigation.navigate('SignIn')} buttonStyle={{borderColor: 'black', width: 150}} titleStyle={{color: 'black'}} type="outline" containerStyle={styles.buttonMargin}  title="Sign In" />
                <Button onPress={() => navigation.navigate('SignUp')} buttonStyle={{borderColor: 'black'}} titleStyle={{color: 'black'}} type="outline"  title="Sign Up" />
            </View>
        </LinearGradient>
    )
};


var styles = StyleSheet.create({
    screen: {
      flex: 1,
      paddingTop: 100,
      borderRadius: 5,
    },
    title: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    message: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    messageText: {
        fontSize: 18
    },
    buttonContainer: {
        flexGrow: 1,
        alignSelf: 'center',
    },
    buttonMargin: {
        marginBottom: 20,
    },
    buttonText: {
      fontFamily: 'Gill Sans',
      textAlign: 'center',
      color: 'black',
      backgroundColor: 'transparent',
    },
  });

export default WelcomeScreen;