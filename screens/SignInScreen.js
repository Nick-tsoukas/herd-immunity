import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, Input, Icon, Button} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';

const SignInScreen = ({navigation}, props) => {
    const [email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    function handleSubmit(){
        console.log(email, password);
        setEmail('');
        setPassword('');
    }
    return(
        <LinearGradient colors={['#7cffcb', '#74f2ce']} style={styles.screen}>
            <View style={styles.screen}>
                <View style={styles.messageContainer}>
                <Text h2>Sign In</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Input
                    placeholder="Email Address"
                    leftIcon={{ type: 'font-awesome', name: 'envelope' }}
                    defaultValue={email}
                    onChangeText={email => setEmail(email)}
                    />
                    <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                    defaultValue={password}
                    onChangeText={password => setPassword(password)}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPass')}>
                        <View style={{width: '100%'}}>
                            <Text style={{textAlign: 'right', color: 'blue'}}>Forgot password ?</Text>
                        </View>
                    </TouchableOpacity>
                    

                </View>
                <View style={styles.buttonContainer}>
                        <Button
                        type="outline"
                        titleStyle={{color: 'black'}}
                        buttonStyle={{borderColor: 'black'}}
                        containerStyle={{width: '100%'}}
                        title="Sign In"
                        onPress={handleSubmit}
                        />
                  
                        <View style={{ paddingTop:10, width: '100%', flexDirection: 'row', justifyContent:'center'}}>
                           <Text style={{textAlign: 'center', paddingRight: 10}}>New User ?</Text>
                           <TouchableOpacity
                             onPress={() => navigation.navigate("SignUp")}
                            >
                           <Text style={{textAlign: 'center', color: 'blue'}}>Sign Up</Text>
                           </TouchableOpacity>
                        </View>
                </View>
                
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    messageContainer: {
        flexGrow: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        flexGrow: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputContainer : {
        flexGrow: 1,
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center'
    }


})

export default SignInScreen