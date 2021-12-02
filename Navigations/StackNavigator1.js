import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../Screens/HomeScreen';
import DetallesScreen from '../Screens/DetallesScreen';

const Stack = createStackNavigator();

export default function StackNavigator1(){
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{headerShown:true, title: 'Clima', headerTitleStyle: {
                    fontWeight: 'bold',
                    textAlign: 'center',
                  },
                }}
            />

            <Stack.Screen
                name="DetallesScreen"
                component={DetallesScreen}
                options={({route})=>({
                    title: route.params.Ciudad
                })}
            />
        </Stack.Navigator>
    )
}