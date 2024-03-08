import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './Login';
import Register from './Register';
import Home from './Home';


const Stack = createNativeStackNavigator();
const StackNavigation = () => {
    return (
        <NavigationContainer>
      <Stack.Navigator>
      <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
      </NavigationContainer>
    )
};
export default StackNavigation;