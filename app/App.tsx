import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Modal,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { User } from '@react-native-community/google-signin';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const App: React.FC = () => {
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [authResult, setAuthResult] = useState<string>('');
    const navigation = useNavigation();
    const { createWallet, authenticate } = useOkto() as OktoContextType;

    const handleGoogleLogin = async (idToken: string | undefined) => {
        if (!idToken) {
            console.error('Id token not found');
            return;
        }

        authenticate(idToken, async (authResponse, error) => {
            if (authResponse) {
                console.log('Authentication successful:', authResponse);
                try {
                    await AsyncStorage.setItem('googleToken', authResponse.auth_token);
                } catch (storageError) {
                    console.error('Error saving token to storage:', storageError);
                }
                navigation.navigate('Home');
            } else if (error) {
                console.error('Authentication error:', error);
                Alert.alert('Authentication Failed', 'Please try again.');
            }
        });

    };

    const handleSignInSuccess = (userInfo: User | null) => {
        if (userInfo?.idToken) {
            handleGoogleLogin(userInfo.idToken);
        }
    };

    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#0f172a" />
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <Image source={require('../assets/images/mainlogo.png')} style={styles.logo} />
                </View>

                <View style={styles.content}>
                    <Text style={styles.title}>Welcome to NIXARCADE</Text>
                    <Text style={styles.subtitle}>Your ultimate gaming platform</Text>
                    <GoogleSignInButton onSignInSuccess={handleSignInSuccess} />
                </View>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a',
        justifyContent: 'center', // Centers content vertically
        alignItems: 'center',
    },
    header: {
        alignItems: 'center',
        marginVertical: 40,
    },
    logo: {
        width: 400,
        height: 400,
        resizeMode: 'contain',
    },
    content: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        textAlign: 'center',
        marginBottom: 30,
    },
    authSection: {
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#1e293b',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: '#1e293b',
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalContent: {
        maxHeight: 200,
        marginBottom: 20,
    },
    modalText: {
        color: '#94a3b8',
        fontSize: 14,
        lineHeight: 20,
    },
    closeButton: {
        backgroundColor: '#9333ea',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default App;

