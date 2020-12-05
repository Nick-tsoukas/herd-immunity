import React, { useState, useContext } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Text, Input } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import AuthContext from '../context/AuthContext';
import axios from 'axios';


// need to start talking to the server and getting a token ... start here in the sign up screen
// Needs validation in the form ... 
const SignUpScreen = ({navigation}, props ) => {
    const { data , setToken } = useContext(AuthContext);
    const [email, setEmail] = useState('');
    const [password, setPassword ] = useState('');

    // need to store token in async storage
    async function signupHandler(){
        try{
           const response = await axios.post('http://4e088bb7dd2e.ngrok.io/signUp', { email, password});
           setToken(response.data.token);
        }
        catch(err){
            console.log(err.message)
        }
    }

    return(
        <LinearGradient colors={['#7cffcb', '#74f2ce']} style={styles.screen}>
            <View style={styles.screen}>
                <View style={styles.titleText}>
                    <Text h2>Sign Up</Text>
                </View>
                <View style={styles.inputContainer}>
                    {/* must handle the user input */}
                <Input
                placeholder='Enter Your Email'
                leftIcon={{ type: 'font-awesome', name: 'envelope' }}  
                defaultValue={email}
                onChangeText={ email => setEmail(email) }     
                />

                <Input
                placeholder='Create Password'
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
                defaultValue={password}
                onChangeText={password => setPassword(password)}
                />
                <Button
                containerStyle={{width: '100%'}}
                titleStyle={{color: 'black'}}
                buttonStyle={{borderColor: 'black'}}
                type="outline"
                title="Sign Up"
                onPress={signupHandler}
                />
                </View>
                <View style={styles.bottomMessage}>
                    <TouchableOpacity onPress={() => navigation.navigate("SignIn")} style={{flexDirection: 'row'}}>
                        <Text>Already have an account</Text>
                        <View style={{paddingLeft: 10}}>
                        <Text style={{color: 'blue'}}>Sign In</Text>
                        </View>
                        
                    </TouchableOpacity>
                </View>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        paddingTop:30
    },
    titleText: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        width: '80%'
    },
    bottomMessage: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default SignUpScreen;