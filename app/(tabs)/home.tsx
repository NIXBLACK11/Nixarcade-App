import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    View,
    ActivityIndicator,
    Image,
    Alert
} from 'react-native';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import { GoogleSignin } from '@react-native-community/google-signin';

const HomeScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [walletCreated, setWalletCreated] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [wallets, setWallets] = useState(null);

    const {
        createWallet,
        getUserDetails,
        getWallets,
    } = useOkto() as OktoContextType;

    // Initialize the wallet and fetch basic details
    const initializeWallet = async () => {
        try {
            setLoading(true);
            const walletResponse = await createWallet();
            console.log('Wallet created successfully:', walletResponse);
            setWalletCreated(true);

            // Fetch user details and wallets after wallet creation
            const userDetails = await getUserDetails();
            setUserDetails(userDetails);
            console.log('User details:', userDetails);

            const walletList = await getWallets();
            setWallets(walletList);
            console.log('Wallet list:', walletList);
        } catch (error) {
            console.error('Error during wallet creation or data fetching:', error);
            setWallets([{ id: '0', balance: '0' }]); // Set wallet to 0 if there's an error
            setUserDetails({ name: 'Guest User', email: 'guest@domain.com', photoUrl: '' }); // Mock user details if there's an error
            Alert.alert('Error', 'Failed to initialize wallet.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeWallet();
    }, []);

    // Display loading state
    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#9333ea" />
                <Text style={styles.loadingText}>Initializing Wallet...</Text>
            </View>
        );
    }

    // Get user profile picture (Google Auth)
    const userProfilePicture = userDetails?.photoUrl || 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y'; // Default if no photo

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Welcome to Okto Wallet</Text>
                <Text style={styles.subtitle}>
                    {walletCreated ? 'Wallet Initialized Successfully' : 'Initializing Wallet...'}
                </Text>

                {/* User Details Section */}
                {userDetails && (
                    <View style={styles.card}>
                        <View style={styles.userProfile}>
                            <Image
                                source={{ uri: userProfilePicture }}
                                style={styles.profileImage}
                            />
                            <View style={styles.userInfo}>
                                <Text style={styles.cardTitle}>{userDetails?.name || 'Guest User'}</Text>
                                <Text style={styles.cardText}>{userDetails?.email || 'guest@domain.com'}</Text>
                            </View>
                        </View>
                    </View>
                )}

                {/* Wallet Details Section */}
                {wallets && (
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Wallet Balance</Text>
                        <Text style={styles.cardText}>{`Balance: ${wallets[0]?.balance || '0'}`}</Text>
                        <Text style={styles.cardText}>{`Wallet Address: ${wallets[0]?.id || '0'}`}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Dark background for the app
    },
    scrollContent: {
        paddingBottom: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8fafc', // White color for header
        marginBottom: 16,
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: '#f8fafc',
        textAlign: 'center',
        marginBottom: 30,
    },
    card: {
        width: '100%',
        padding: 15,
        backgroundColor: '#1e293b', // Darker card background
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 5,
        marginBottom: 20,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f8fafc',
        marginBottom: 10,
    },
    cardText: {
        fontSize: 14,
        color: '#94a3b8', // Lighter text color for card content
        marginBottom: 5,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 15,
    },
    userInfo: {
        justifyContent: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#0f172a', // Dark background
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#9333ea', // Purple loading text
    },
});

export default HomeScreen;

