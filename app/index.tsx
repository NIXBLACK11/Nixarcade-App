import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './(tabs)/home';
import Games from './(tabs)/games';
import Blinks from './(tabs)/blinks';
import Leaderboard from './(tabs)/leaderboard';
import App from './App';

const OKTO_CLIENT_APP_SECRET = 'a57b71ce-f6a6-41fc-8677-0b19cf147f17';
const Stack = createNativeStackNavigator();

function Root() {
    return (
        <OktoProvider apiKey={OKTO_CLIENT_APP_SECRET} buildType={BuildType.SANDBOX}>
            <Stack.Navigator initialRouteName="App" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="App" component={App} />
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Games" component={Games} />
                <Stack.Screen name="Blinks" component={Blinks} />
                <Stack.Screen name="Leaderboard" component={Leaderboard} />
            </Stack.Navigator>
        </OktoProvider>
    );
}

export default Root;

