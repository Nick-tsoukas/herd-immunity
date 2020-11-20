import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const ForgotPassScreen = ({navigation}, props ) => {
    return(
        <LinearGradient style={styles.screen} colors={['#7cffcb', '#74f2ce']}>
            <View style={styles.message}>
                <Text h4>
                    Forgot Password?
                </Text>
                <View style={{marginTop: 50}}>
                    <Text style={{fontSize: 18}}>
                    No problem, just provide the email that you regestired with
                    and we will send you the reset password instructions
                    </Text>
                </View>
            </View>
            <View style={styles.inputContainer}>
                <Input
                    placeholder="Email Address"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    />
                    <Button
                    containerStyle={{width: '100%'}}
                    title="Send Rest"
                    />
            </View>
           
            <View style={styles.bottomMessage}>
                <TouchableOpacity
                onPress={() => navigation.navigate("SignIn")}
                >
                <View style={{flexDirection: 'row'}}>
                    <Icon
                    name='chevron-left'
                    type='evilicon'
                    color='#517fa4'
                    />
                    <Text style={{color: 'blue'}}>Back to sign in</Text>
                </View>
                </TouchableOpacity>
            </View>

        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'red',
        paddingLeft: '10%',
        paddingRight: '10%'
    },
    message: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bottomMessage: {
        flexGrow: 1,
        justifyContent: 'flex-end',
        paddingBottom: 20,
        alignItems: 'center'
    }
})

export default ForgotPassScreen;