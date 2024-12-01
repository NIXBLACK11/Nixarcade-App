import React from 'react';
import { OktoProvider, BuildType } from 'okto-sdk-react-native';
import App from './App';
import Home from './(tabs)/home';

const OKTO_CLIENT_APP_SECRET = 'a57b71ce-f6a6-41fc-8677-0b19cf147f17';

function Root() {
    return (
        <OktoProvider apiKey={OKTO_CLIENT_APP_SECRET} buildType={BuildType.SANDBOX}>
            <Home />
        </OktoProvider>
    );
}

export default Root;

