import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { BASE_URL } from '../config/config';


const Register = ({ navigation }) => {
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [secureTextEntry1, setSecureTextEntry1] = useState(true);
    const [confirmPass, setConfirmPass] = useState('');
    const [selectRadio, setSelectRadio] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstName] = useState('');
    const [lastname, setLastName] = useState('');
    const [phoneno, setPhoneNo] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const handleRadio = (option) => {
      setSelectedOption(option);
      console.log(option);
    };

    const handleRegistration = async () => {
        try {
            const response = await fetch('http://192.168.183.101:8080/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                    firstname:firstname, 
                    lastname:lastname,
                    phoneno:phoneno,
                }),
            });
            const data = await response.json();
    
            if (response.status === 201) {
                console.log('User registered successfully:', data);
                console.log('Success', 'User registered successfully');
                const userToken = data.token;
                console.log(userToken);
                const userDetails = data;
                console.log(userDetails);
                // Store user details and token locally (example: AsyncStorage)
                await AsyncStorage.setItem('_id', userDetails._id);
                await AsyncStorage.setItem('token', userToken);
                navigation.navigate('Home'); 
            } else if (response.status === 400) {
                console.log('Invalid registration data');
                console.log('Error', 'Invalid registration data');
            } else if (response.status === 409) {
                console.log('Username already exists');
                console.log('Error', 'Username already exists');
            }
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            console.log('Error', 'There was a problem with the request.');
        }
    };
    

    const toggleShowPass = () => {
        setSecureTextEntry(prevState => !prevState);
    };

    const handlePwd = value => {
        setPassword(value);
    };

    const toggleConfirmPass = () => {
        setSecureTextEntry1(prevState => !prevState);
    }

    const handleConfirmPass = value => {
        setConfirmPass(value);
    }

    return (
        <>
            <ScrollView>
                <View style={styles.main} >
                    <View style={{ marginTop: 15, marginLeft: 20, position: 'absolute', zIndex: 1 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Feather
                                name="arrow-left"
                                size={25}
                                color="white"
                            />
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.registerTxt}>Registration</Text>
                </View>

                <View style={{marginTop:20}} >
                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='First Name' 
                            onChangeText={setFirstName}
                            value={firstname}
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="user"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='Last Name' 
                            onChangeText={setLastName}
                            value={lastname}
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="user"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <Text style={{ fontSize: 20, marginLeft: 50, color: 'grey', marginBottom: 10, fontWeight: '500' }}>Gender - </Text>

                    <View style={{ flexDirection: 'row', marginLeft: 30, marginBottom: 10 }}>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('male')} >
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectedOption === 'male' ? 'black' : 'transparent' }]}>
                                {selectedOption === 'male' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>Male</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('female')}>
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectedOption === 'female' ? 'black' : 'transparent' }]}>
                                {selectedOption === 'female' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>Female</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.radioBtn} onPress={() => handleRadio('other')}>
                            <View style={[styles.radioOuterCircle, { backgroundColor: selectedOption === 'other' ? 'black' : 'transparent' }]}>
                                {selectedOption === 'other' && <View style={styles.radioInnerCircle}></View>}
                            </View>
                            <Text style={{ fontSize: 20, marginLeft: 12, color: 'black' }}>Other</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='Phone No' 
                            onChangeText={setPhoneNo}
                            value={phoneno}
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="phone"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput 
                            placeholder='Email' 
                            onChangeText={setUsername} 
                            value={username} 
                            placeholderTextColor={'grey'} 
                            style={styles.textInput} />
                        </View>
                        <View style={styles.iconPosition}>
                            <Feather
                                name="mail"
                                size={25}
                                color="black"
                            />
                        </View>
                    </View>

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput placeholder='Password'
                                placeholderTextColor={'grey'}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={secureTextEntry}
                                style={styles.textInput}
                                 />
                        </View>
                        <View style={styles.iconPosition}>
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

                    <View style={styles.inputBox}>
                        <View>
                            <TextInput placeholder='Confirm Password'
                                placeholderTextColor={'grey'}
                                onChangeText={setPassword}
                                value={password}
                                secureTextEntry={secureTextEntry1}
                                style={styles.textInput}
                                 />
                        </View>
                        <View style={styles.iconPosition}>
                            <TouchableOpacity onPress={toggleConfirmPass}>
                                {secureTextEntry1 ?
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

                    <TouchableOpacity style={styles.registerBtn} onPress={handleRegistration}>
                        <Text style={{ textAlign: 'center', marginTop: 7, fontSize: 25, color: 'white', fontWeight: '500' }}>Register</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </>

    )
};

const styles = StyleSheet.create({
    main: {
        flex: 1,
        backgroundColor: '#4169e1',
        borderBottomLeftRadius: 100,
        height: 65
    },
    registerTxt: {
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
    iconPosition: {
        position: 'absolute',
        right: 10,
        top: 10,
    },
    registerBtn: {
        height: 50,
        width: 320,
        alignSelf: 'center',
        marginTop: 25,
        borderRadius: 10,
        backgroundColor: '#4169e1'
    },
    radioBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20
    },
    radioOuterCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 4,
        borderColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',

    },
    radioInnerCircle: {
        // width: 8,
        // height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
    }
})

export default Register