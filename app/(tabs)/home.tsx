import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Text,
    View,
    Image,
    TouchableOpacity,
    ActivityIndicator,
    Modal,
    FlatList,
    Animated
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import { Ionicons } from '@expo/vector-icons';
import { GoogleSignin, User } from '@react-native-community/google-signin';
import GamesScreen from './games';
import BlinksScreen from './blinks';
import LeaderboardScreen from './leaderboard';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomButton from '@/components/CustomButton';
import { useRouter } from 'expo-router';

const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'Home':
                            iconName = focused ? 'home' : 'home-outline';
                            break;
                        case 'Games':
                            iconName = focused ? 'game-controller' : 'game-controller-outline';
                            break;
                        case 'Blinks':
                            iconName = focused ? 'flash' : 'flash-outline';
                            break;
                        case 'Leaderboard':
                            iconName = focused ? 'trophy' : 'trophy-outline';
                            break;
                    }

                    return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: '#db2777',
                tabBarInactiveTintColor: '#6A0572',
                tabBarStyle: styles.tabBar,
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Games" component={GamesScreen} />
            <Tab.Screen name="Blinks" component={BlinksScreen} />
            <Tab.Screen name="Leaderboard" component={LeaderboardScreen} />
        </Tab.Navigator>
    );
};


// Custom Toast Component
const Toast = ({ message, type = 'success', visible, onHide }) => {
    const [fadeAnim] = useState(new Animated.Value(0));

    React.useEffect(() => {
        if (visible) {
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 300,
                    useNativeDriver: true,
                }),
                Animated.delay(2000),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 300,
                    useNativeDriver: true,
                }),
            ]).start(() => {
                onHide();
            });
        }
    }, [visible]);

    const backgroundColor = type === 'success' ? '#db2777' : '#ff0000';

    return visible ? (
        <Animated.View
            style={[
                styles.toastContainer,
                {
                    opacity: fadeAnim,
                    backgroundColor: backgroundColor,
                }
            ]}
        >
            <Text style={styles.toastText}>{message}</Text>
        </Animated.View>
    ) : null;
};

const HomeScreen: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [userDetails, setUserDetails] = useState(null);
    const [wallets, setWallets] = useState(null);
    const [portfolio, setPortfolio] = useState(null);
    const [toastMessage, setToastMessage] = useState('');
    const [toastVisible, setToastVisible] = useState(false);
    const router = useRouter();

    // New state for portfolio modal
    const [isPortfolioModalVisible, setIsPortfolioModalVisible] = useState(false);

    const {
        createWallet,
        getUserDetails,
        getWallets,
        getPortfolio,
    } = useOkto() as OktoContextType;

    const initializeWallet = async () => {
        try {
            setLoading(true);
            await createWallet();
            const userDetails = await getUserDetails();
            setUserDetails(userDetails);

            const walletList = await getWallets();
            setWallets(walletList);

            const portfolioData = await getPortfolio();
            setPortfolio(portfolioData);
        } catch (error) {
            showToast('Failed to initialize wallet', 'error');
        } finally {
            setLoading(false);
        }
    };

    // Sign out function
    const onSignOut = () => {
        GoogleSignin.signOut()
            .then(() => {
                setUserDetails(null);
                router.push('/');
            })
            .catch((err) => {
                console.error('Error during sign-out:', err);
                showToast('Sign out failed', 'error');
            });
    };

    useEffect(() => {
        initializeWallet();
    }, []);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToastMessage(message);
        setToastVisible(true);
    };

    const copyToClipboard = (text: string) => {
        Clipboard.setString(text);
        showToast('Address copied successfully');
    };

    const truncateAddress = (address: string) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const togglePortfolioModal = () => {
        setIsPortfolioModalVisible(!isPortfolioModalVisible);
    };

    if (loading) {
        return (
            <View style={styles.loader}>
                <ActivityIndicator size="large" color="#db2777" />
                <Text style={styles.loadingText}>Initializing Wallet...</Text>
            </View>
        );
    }

    const userEmailFirstLetter = userDetails?.email?.[0]?.toUpperCase() || '?';

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {/* Toast Notification */}
                <Toast
                    message={toastMessage}
                    visible={toastVisible}
                    onHide={() => setToastVisible(false)}
                />

                {/* Logo Section */}
                <View style={styles.logoContainer}>
                    <Image
                        source={require('../../assets/images/mainlogo.png')}
                        style={styles.logo}
                    />
                </View>

                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>Nixarcade</Text>
                </View>

                {/* User Profile Section */}
                <View style={[styles.card, styles.profileCard]}>
                    <View style={styles.userProfile}>
                        <View style={styles.profileIcon}>
                            <Text style={styles.profileIconText}>{userEmailFirstLetter}</Text>
                        </View>
                        <View style={styles.userInfo}>
                            <Text style={styles.cardTitle}>My Account</Text>
                            <View style={styles.emailContainer}>
                                <Text style={styles.cardText}>
                                    {userDetails?.email || 'guest@nixarcade.fun'}
                                </Text>
                            </View>
                        </View>
                        <TouchableOpacity
                            style={styles.signOutButton}
                            onPress={onSignOut}
                        >
                            <Ionicons
                                name="log-out-outline"
                                size={24}
                                color="#db2777"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Wallet List Section */}
                {wallets && wallets.wallets?.length > 0 && (
                    <View style={[styles.card, styles.walletCard]}>
                        <Text style={styles.cardTitle}>My Wallets</Text>
                        {wallets.wallets.map((wallet, index) => (
                            <View key={index} style={styles.walletItem}>
                                <View style={styles.walletItemContent}>
                                    <TouchableOpacity
                                        onPress={togglePortfolioModal}
                                    >
                                        <Image
                                            source={require('../../assets/images/okto-icon.png')}
                                            style={styles.walletIcon}
                                        />
                                    </TouchableOpacity>
                                    <View style={styles.walletDetails}>
                                        <Text style={styles.walletNetworkName}>
                                            {wallet.network_name} Wallet
                                        </Text>
                                        <View style={styles.addressContainer}>
                                            <Text style={styles.walletAddress}>
                                                {truncateAddress(wallet.address)}
                                            </Text>
                                            <TouchableOpacity
                                                onPress={() => copyToClipboard(wallet.address)}
                                            >
                                                <Ionicons
                                                    name="copy-outline"
                                                    size={20}
                                                    color="#db2777"
                                                />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        ))}

                    </View>
                )}

                {/* Portfolio Modal */}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={isPortfolioModalVisible}
                    onRequestClose={togglePortfolioModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={togglePortfolioModal}
                            >
                                <Ionicons
                                    name="close"
                                    size={30}
                                    color="#db2777"
                                />
                            </TouchableOpacity>

                            <Text style={styles.modalTitle}>Portfolio Details</Text>

                            <View style={styles.modalDetailsContainer}>
                                {portfolio?.tokens && (
                                    <FlatList
                                        data={portfolio.tokens}
                                        keyExtractor={(item, index) => index.toString()}
                                        renderItem={({ item }) => (
                                            <View style={styles.modalDetailRow}>
                                                <Text style={styles.modalDetailLabel}>
                                                    Token Name
                                                </Text>
                                                <Text style={styles.modalDetailText}>
                                                    {item.token_name || 'N/A'}
                                                </Text>

                                                <Text style={styles.modalDetailLabel}>
                                                    Network
                                                </Text>
                                                <Text style={styles.modalDetailText}>
                                                    {item.network_name}
                                                </Text>

                                                <Text style={styles.modalDetailLabel}>
                                                    Quantity
                                                </Text>
                                                <Text style={styles.modalDetailText}>
                                                    {item.quantity}
                                                </Text>

                                                <Text style={styles.modalDetailLabel}>
                                                    Amount (INR)
                                                </Text>
                                                <Text style={styles.modalDetailText}>
                                                    ₹{parseFloat(item.amount_in_inr).toFixed(2)}
                                                </Text>
                                            </View>
                                        )}
                                    />
                                )}
                            </View>
                        </View>
                    </View>
                </Modal>
                <View style={[styles.card2]}>
                    <CustomButton title="Sign Out" backgroundColor='red' onPress={onSignOut} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    walletCard: {
        borderWidth: 1,
        borderColor: '#4A0E4E',
        paddingVertical: 10,
    },
    walletItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(219, 39, 119, 0.2)',
    },
    walletItemContent: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    walletIcon: {
        width: 40,
        height: 40,
        marginRight: 15,
    },
    walletDetails: {
        flex: 1,
    },
    walletNetworkName: {
        fontSize: 18,
        color: '#f8fafc',
        marginBottom: 5,
    },

    // Modal Styles
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '85%',
        backgroundColor: '#16213E',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalCloseButton: {
        alignSelf: 'flex-end',
        marginBottom: 10,
    },
    modalTitle: {
        fontSize: 22,
        color: '#db2777',
        marginBottom: 20,
        fontWeight: 'bold',
    },
    modalDetailsContainer: {
        width: '100%',
        backgroundColor: '#1a1a2e',
        borderRadius: 10,
        padding: 15,
    },
    modalDetailRow: {
        marginBottom: 15,
    },
    modalDetailLabel: {
        color: '#f8fafc',
        fontSize: 16,
        marginBottom: 5,
    },
    modalDetailText: {
        color: '#c7d2fe',
        fontSize: 16,
        marginBottom: 5,
    },
    container: {
        flex: 1,
        backgroundColor: '#1a1a2e', // Deep purple-navy background
        paddingTop: 20,
    },
    scrollContent: {
        paddingBottom: 40,
    },
    logoContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 120,
        height: 120,
        resizeMode: 'contain',
    },
    header: {
        paddingHorizontal: 20,
        paddingBottom: 20,
        alignItems: 'center',
    },
    headerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8fafc',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(219, 39, 119, 0.5)', // Pink text shadow
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    card: {
        marginHorizontal: 20,
        marginBottom: 20,
        padding: 20,
        borderRadius: 16,
        backgroundColor: '#16213E', // Dark purple card background
        shadowColor: '#4a0072', // Deep purple shadow
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 5,
    },
    card2: {
        marginHorizontal: 20,
        marginBottom: 15,
        padding: 10,
        borderRadius: 16,
    },
    profileCard: {
        borderWidth: 1,
        borderColor: '#6A0572', // Accent border
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#db2777', // Pink accent color
        marginBottom: 12,
        letterSpacing: 1,
    },
    cardText: {
        fontSize: 16,
        color: '#c7d2fe',
        marginBottom: 5,
        opacity: 0.9,
    },
    userProfile: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileIcon: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#6A0572', // Deep purple for profile icon
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15,
        borderWidth: 2,
        borderColor: '#db2777',
    },
    profileIconText: {
        fontSize: 28,
        color: '#f8fafc',
        fontWeight: 'bold',
    },
    userInfo: {
        justifyContent: 'center',
        flex: 1,
    },
    walletInfo: {
        marginBottom: 15,
        paddingBottom: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(219, 39, 119, 0.2)', // Subtle pink border
    },
    walletInfoTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#db2777',
        marginBottom: 8,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1a1a2e',
    },
    loadingText: {
        marginTop: 15,
        fontSize: 18,
        color: '#db2777',
        fontWeight: '500',
    },
    toastContainer: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
        backgroundColor: '#db2777',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 25,
        zIndex: 1000,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    toastText: {
        color: 'white',
        textAlign: 'center',
        fontSize: 16,
    },

    // Slight modifications to existing styles
    addressContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        flex: 1,
    },
    walletAddress: {
        fontSize: 14,
        color: '#db2777',
        marginRight: 10,
    },
    signOutButton: {
        marginLeft: 'auto',
    },
    totalValue: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#db2777',
        textAlign: 'center',
        marginTop: 10,
    },
    signInButton: {
        marginHorizontal: 20,
        backgroundColor: '#db2777',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    signInText: {
        color: '#f8fafc',
        fontSize: 18,
        fontWeight: 'bold',
    },
    signOutText: {
        color: '#f8fafc',
        fontSize: 16,
    },
});

// export default HomeScreen;
export default MainApp;

