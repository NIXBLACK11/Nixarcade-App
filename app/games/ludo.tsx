import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRouter } from 'expo-router';
import { WebView } from 'react-native-webview';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LudoGame() {
    const router = useRouter();
    const isDark = true; // Simulating dark mode.
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Top Bar */}
            <View style={[styles.topBar, isDark && styles.darkTopBar, styles.shadow]}>
                <TouchableOpacity onPress={() => router.push('/games')}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={24}
                        color="#f9fafb"
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <Image
                    source={require('../../assets/images/mainlogo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
                <Text style={styles.topBarText}>Ludo</Text>
            </View>

            {/* Embedded WebView */}
            <WebView
                source={{ uri: 'https://ludofam.nixarcade.fun' }}
                style={styles.webView}
            />

            {/* Bottom Action Bar */}
            <View style={[styles.bottomBar, isDark && styles.darkBottomBar, styles.shadow]}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Ionicons
                        name="home-outline"
                        size={24}
                        color={isDark ? '#64748b' : '#94a3b8'}
                    />
                    <Text style={styles.tabLabel}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Games')}>
                    <Ionicons
                        name="game-controller-outline"
                        size={24}
                        color={isDark ? '#e879f9' : '#9333ea'}
                    />
                    <Text style={styles.tabLabel}>Games</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.reload()}>
                    <Ionicons
                        name="reload-outline"
                        size={24}
                        color={isDark ? '#64748b' : '#94a3b8'}
                    />
                    <Text style={styles.tabLabel}>Refresh</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8fafc',
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#7c3aed',
        paddingHorizontal: 10,
    },
    darkTopBar: {
        backgroundColor: '#0f172a',
    },
    backIcon: {
        marginRight: 10,
    },
    logo: {
        width: 30,
        height: 30,
    },
    topBarText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#f9fafb',
        marginLeft: 10,
    },
    webView: {
        flex: 1,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#ffffff',
        borderTopWidth: 1,
        borderTopColor: '#e2e8f0',
    },
    darkBottomBar: {
        backgroundColor: '#0f172a',
        borderTopColor: '#1e293b',
    },
    tabLabel: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 4,
    },
    shadow: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5, // For Android
    },
});

