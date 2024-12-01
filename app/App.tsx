import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native';
import GoogleSignInButton from '../components/GoogleSignInButton';
import { User } from '@react-native-community/google-signin';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import GetButton from '../components/GetButton';
import CustomButton from '../components/CustomButton'; // Import the CustomButton component
import { useRouter } from 'expo-router';

const App: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [authResult, setAuthResult] = useState<string>('');
    const router = useRouter();

    const {
        authenticate,
        getPortfolio
    } = useOkto() as OktoContextType;

    function handleAuthenticate(result: any, error: any) {
        if (result) {
            console.log('authentication successful');
            setAuthResult(JSON.stringify(result, null, 2));
            setAuthModalVisible(true);
        }
        if (error) {
            console.error('authentication error:', error);
            setAuthResult(JSON.stringify(error, null, 2));
            setAuthModalVisible(true);
        }
    }

    const handleSignInSuccess = async (userInfo: User | null) => {
        if (userInfo) {
            const idToken = userInfo.idToken; // Extract idToken from userInfo
            setUserInfo(userInfo);
            console.log('Google Sign-In Success:', userInfo);
            handleAuthenticate(userInfo?.idToken!, null);
            router.push({
                pathname: '/(tabs)/home',
                params: { userInfo: JSON.stringify(userInfo) },
            });
        } else {
            console.error('Google Sign-In failed: userInfo is null');
        }
    };


    return (
        <>
            <StatusBar barStyle="light-content" />
            <SafeAreaView style={styles.container}>
                <Image
                    source={require('../assets/images/mainlogo.png')} // Ensure the image is correctly placed in the assets folder
                    style={styles.logo}
                />
                <Text style={styles.title}>Welcome to NixArcade</Text>
                <Text style={styles.subtitle}>Your ultimate gaming platform</Text>
                {/* Authentication Section */}
                <GoogleSignInButton onSignInSuccess={handleSignInSuccess} />
                <View style={styles.buttonSpacing} />
                <CustomButton
                    title="Continue as Guest"
                    onPress={() => {
                        router.push('/(tabs)/home')
                    }}
                    backgroundColor="#1e293b" // Dark background
                />
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a', // Dark shade of blue with purple undertones
        padding: 20, // Added padding to avoid edge clipping
    },
    title: {
        fontSize: 24,
        color: '#f8fafc',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#94a3b8',
        marginBottom: 40,
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    authSection: {
        backgroundColor: '#1e293b', // Darker section background
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20,
    },
    buttonGroup: {
        width: '100%',
    },
    buttonSpacing: {
        height: 15,
    },
    apiSection: {
        backgroundColor: '#1e293b', // Dark background for API section
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#f8fafc', // Light text for section title
        marginBottom: 15,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#0f172a', // Same dark background
    },
    modalHeader: {
        padding: 20,
        backgroundColor: '#1e293b',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#f8fafc', // Light modal title
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalText: {
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#f8fafc', // Light text color in modal
    },
    modalFooter: {
        padding: 20,
        backgroundColor: '#1e293b',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    logo: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#7c3aed', // Deep purple
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        width: '90%', // Full width with some margin
        alignItems: 'center',
    },
    buttonText: {
        color: '#f9fafb', // Off-white
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },


});

export default App;

