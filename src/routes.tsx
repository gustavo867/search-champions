import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Home from './screens/Home';
import SearchEspecificChampions from './screens/SearchEspecificChampions';
import Champions from './screens/Champions';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator mode="modal" headerMode="none">
                <AppStack.Screen name="Home" component={Home}/>
                <AppStack.Screen name="Champions" component={Champions}/>
                <AppStack.Screen name="SearchEspecificChampions" component={SearchEspecificChampions}/>
            </AppStack.Navigator>
        </NavigationContainer>
    )
} 