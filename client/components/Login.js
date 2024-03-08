import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
// import { BASE_URL } from '../config/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const Login = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    const toggleShowPass = () => {
        setSecureTextEntry(prevState => !prevState);
    };

    const axiosInstance = axios.create({
        baseURL: 'http://192.168.1.28:8080',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            username,password 
          })
    });
    
    // Request interceptor to add token to headers
    axiosInstance.interceptors.request.use(
        async (config) => {
            // Fetch token from AsyncStorage or wherever it's stored
            const token = await AsyncStorage.getItem('token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
    
    // Response interceptor to handle errors
    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            if (error.response) {
                if (error.response.status === 401) {
                    console.log('Invalid email or password');
                    console.log('Error', 'Invalid email or password');
                } else {
                    console.error('Response error:', error.response.data);
                    console.log('Error', 'There was a problem with the request.');
                }
            } else if (error.request) {
                console.error('Request error:', error.request);
                console.log('Error', 'There was a problem with the request.');
            } else {
                console.error('Error:', error.message);
                console.log('Error', 'There was a problem with the request.');
            }
            return Promise.reject(error);
        }
    );
    
    const handleLogin = async () => {
        try {
            const response = await axiosInstance.post('/login', {
                username: username,
                password: password,
            });
    
            if (response.status === 200) {
                console.log('User logged in successfully:', response.data);
                console.log('Success', 'User logged in successfully');
                // const userToken = response.data.token;
                console.log("Token - " + response.data.accessToken);
                // const response = response.data;
                console.log(response);
                await AsyncStorage.setItem('_id', response.data._id);
                await AsyncStorage.setItem('token', response.userToken);
                navigation.navigate('Home');
            }
        } catch (error) {
            console.error('There was a problem with the login:', error);
            console.log('Error', 'There was a problem with the login.');
        }
    };

    return (
        <>
            <View style={styles.main} >
                <View>
                    <Image source={require('../Images/logo.jpg')} style={styles.logo} />
                </View>
                <Text style={styles.loginTxt}>Login</Text>
            </View>

            <View style={styles.loginForm}>
                <View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput
                                placeholder='Email'
                                placeholderTextColor={'grey'}
                                style={styles.textInput}
                                onChangeText={setUsername}
                                value={username}
                            />
                        </View>
                        <View style={{ position: 'absolute', right: 10, top: 10, }}>
                            <Feather
                                name="mail"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput
                                placeholder='Password'
                                placeholderTextColor={'grey'}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={secureTextEntry}
                                style={styles.textInput}

                            />
                        </View>
                        <View style={{ position: 'absolute', right: 10, top: 10, }}>
                            <TouchableOpacity onPress={toggleShowPass}>
                                {secureTextEntry ? 
                                    <Feather name="eye-off"
                                        size={25}
                                        color="black"
                                    /> :
                                    <Feather
                                        name="eye"
                                        size={30}
                                        color="black"
                                    />}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                <TouchableOpacity>
                    <Text style={{ fontSize: 15, alignSelf: 'flex-end', marginRight: 10, marginTop: 5, color: 'blue' }}>Forget Password ?</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.Loginbtn} onPress={handleLogin} >
                    <Text style={{ textAlign: 'center', marginTop: 7, fontSize: 25, color: 'white', fontWeight: '500' }}>Login</Text>
                </TouchableOpacity>


                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 50 }}>
                    <Text style={{ color: 'black' }}>Don't have an account ?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                        <Text style={{ marginLeft: 5, color: 'blue' }}>Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}

const styles = StyleSheet.create(({
    main: {
        flex: 1,
        backgroundColor: '#4169e1',
        borderBottomLeftRadius: 100
    },
    logo: {
        width: 130,
        height: 130,
        borderRadius: 100,
        alignSelf: 'center',
        marginTop: 60
    },
    loginForm: {
        flex: 2,
        marginTop: 30,

    },
    loginTxt: {
        fontSize: 25,
        textAlign: 'right',
        marginTop: 10,
        marginRight: 30,
        color: 'white',
        fontWeight: '500',


    },
    textInput: {
        height: 60,
        fontSize: 23,
        alignSelf: 'center',
        width: 310,
        paddingHorizontal: 15,
        color: 'black'

    },
    inputBox: {
        margin: 10,
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        width: 320,
        height: 45,
        alignSelf: 'center',
        borderRadius: 10,
    },
    Loginbtn: {
        width: 350,
        height: 50,
        alignSelf: 'center',
        marginTop: 50,
        borderRadius: 10,
        backgroundColor: '#4169e1'

    }
}))

export default Login;
