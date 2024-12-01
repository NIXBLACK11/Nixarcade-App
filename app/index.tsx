import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './(tabs)/home';
import Games from './(tabs)/games';
import Blinks from './(tabs)/blinks';
import Leaderboard from './(tabs)/leaderboard';
import App from './App';
import LudoGame from './games/ludo';
import SnakesAndLaddersGame from './games/snl';
import TicTacToeGame from './games/ttt';
import RouletteGame from './blinks/roulette';
import QwertyGame from './blinks/qwerty';
import ScrambleGame from './blinks/scramble';
import ComingSoon from './games/comingsoon';

const OKTO_CLIENT_APP_SECRET = '';
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
                <Stack.Screen name="Ludo" component={LudoGame} />
                <Stack.Screen name="SnakesAndLadders" component={SnakesAndLaddersGame} />
                <Stack.Screen name="TicTacToe" component={TicTacToeGame} />
                <Stack.Screen name="Roulette" component={RouletteGame} />
                <Stack.Screen name="Qwerty" component={QwertyGame} />
                <Stack.Screen name="Scramble" component={ScrambleGame} />
                <Stack.Screen name="ComingSoon" component={ComingSoon} />
            </Stack.Navigator>
        </OktoProvider>
    );
}

export default Root;

