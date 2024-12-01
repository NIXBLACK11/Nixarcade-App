import React, { useState } from 'react';
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Button,
    View,
    Text,
    Modal,
    ScrollView
} from 'react-native';
import GoogleSignInButton from '../../components/GoogleSignInButton';
import { User } from '@react-native-community/google-signin';
import { useOkto, type OktoContextType } from 'okto-sdk-react-native';
import GetButton from '../../components/GetButton';

const App: React.FC = () => {
    const [userInfo, setUserInfo] = useState<User | null>(null);
    const [authModalVisible, setAuthModalVisible] = useState(false);
    const [authResult, setAuthResult] = useState<string>('');
    const [walletInfo, setWalletInfo] = useState<any>(null);

    const { authenticate, getPortfolio } = useOkto() as OktoContextType;

    // Handle successful authentication
    const handleAuthenticate = async (result: any, error: any) => {
        if (result) {
            console.log('Authentication successful:', result);
            setAuthResult('Authentication successful!');
            try {
                const portfolio = await getPortfolio();
                console.log('Portfolio:', portfolio);
                setWalletInfo(portfolio);
            } catch (portfolioError) {
                console.error('Error fetching portfolio:', portfolioError);
            }
        } else if (error) {
            console.error('Authentication error:', error);
            setAuthResult('Authentication failed!');
        }
        setAuthModalVisible(true);
    };

    // Handle Google sign-in success
    const handleSignInSuccess = (userInfo: User | null) => {
        console.log('Google sign-in successful:', userInfo);
        setUserInfo(userInfo);
    };

    return (
        <>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.title}>Okto Enhanced App</Text>

                    {/* Google Authentication Section */}
                    <View style={styles.authSection}>
                        <Text style={styles.sectionTitle}>Login</Text>
                        <GoogleSignInButton onSignInSuccess={handleSignInSuccess} />
                        <View style={styles.buttonSpacing} />
                        <Button
                            title="Authenticate with Wallet"
                            onPress={() => {
                                if (userInfo?.idToken) {
                                    authenticate(userInfo.idToken, handleAuthenticate);
                                } else {
                                    alert('Please sign in with Google first.');
                                }
                            }}
                        />
                    </View>

                    {/* Wallet Info Section */}
                    {walletInfo && (
                        <View style={styles.walletSection}>
                            <Text style={styles.sectionTitle}>Wallet Information</Text>
                            <ScrollView>
                                <Text style={styles.walletText}>
                                    {JSON.stringify(walletInfo, null, 2)}
                                </Text>
                            </ScrollView>
                        </View>
                    )}
                </View>

                {/* Authentication Modal */}
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={authModalVisible}
                    onRequestClose={() => {
                        setAuthModalVisible(false);
                    }}
                >
                    <SafeAreaView style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <Text style={styles.modalTitle}>Authentication Result</Text>
                        </View>
                        <ScrollView style={styles.modalContent} nestedScrollEnabled={true}>
                            <Text style={styles.modalText}>{authResult}</Text>
                        </ScrollView>
                        <View style={styles.modalFooter}>
                            <Button
                                title="Close"
                                onPress={() => setAuthModalVisible(false)}
                            />
                        </View>
                    </SafeAreaView>
                </Modal>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 30,
        color: '#333',
    },
    authSection: {
        backgroundColor: 'white',
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
    walletSection: {
        backgroundColor: 'white',
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
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    walletText: {
        fontSize: 14,
        color: '#333',
        fontFamily: 'monospace',
    },
    buttonSpacing: {
        height: 15,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    modalHeader: {
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#333',
    },
    modalContent: {
        flex: 1,
        padding: 20,
    },
    modalText: {
        fontSize: 14,
        fontFamily: 'monospace',
        color: '#333',
    },
    modalFooter: {
        padding: 20,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
});

export default App;

