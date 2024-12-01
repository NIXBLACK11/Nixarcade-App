import React, { useState } from 'react';
import { Button, Text, View, StyleSheet } from 'react-native';
import { GoogleSignin, User } from '@react-native-community/google-signin';
import CustomButton from './CustomButton';

GoogleSignin.configure({
    iosClientId: '719039667142-6jvc6vtj9kceg5r9emmdcobs1fce1rjh.apps.googleusercontent.com',
    webClientId: '719039667142-cn1dqou2832eh5u179gq9jgs32u21bed.apps.googleusercontent.com',
    offlineAccess: false,
});

interface GoogleSignInButtonProps {
    onSignInSuccess: (userInfo: User | null) => void;
}

const GoogleSignInButton: React.FC<GoogleSignInButtonProps> = ({ onSignInSuccess }) => {
    const [userInfo, setUserInfo] = useState<User | null>(null);

    const onSignIn = () => {
        GoogleSignin.hasPlayServices()
            .then(() => GoogleSignin.signIn())
            .then((response) => {
                setUserInfo(response);
                onSignInSuccess(response); // Pass the user info to the parent component
            })
            .catch((err) => {
                console.error('Error during sign-in:', err); // Handle error
            });
    };

    const onSignOut = () => {
        GoogleSignin.signOut()
            .then(() => {
                setUserInfo(null);
                onSignInSuccess(null); // Clear user info on sign-out
            })
            .catch((err) => {
                console.error('Error during sign-out:', err); // Handle error
            });
    };

    return userInfo ? (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>
                Welcome, {`${userInfo.user.givenName} ${userInfo.user.familyName}`}
            </Text>
            <CustomButton title="Sign out" onPress={onSignOut} />
        </View>
    ) : (
        <CustomButton title="Sign in with Google" onPress={onSignIn} />
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    welcomeText: {
        fontSize: 16,
        marginBottom: 10,
        textAlign: 'center',
        color: '#333',
    },
});

export default GoogleSignInButton;
