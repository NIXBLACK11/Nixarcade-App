import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

interface GameCard {
    id: string;
    name: string;
    image: any;
    route: string;
    tagline: string;
    gradient: string[];
}

export default function GamesScreen() {
    const isDark = true;
    const [searchText, setSearchText] = useState('');
    const router = useRouter();
    const navigation = useNavigation();

    const games: GameCard[] = [
        {
            id: '1',
            name: 'Ludo',
            image: require('../../assets/images/ludo.png'),
            route: 'Ludo',
            tagline: "Play and win with your friends!",
            gradient: ['#FF6B6B', '#FF8E8E'],
        },
        {
            id: '2',
            name: 'Snakes & Ladders',
            image: require('../../assets/images/snl.png'),
            route: 'SnakesAndLadders',
            tagline: "Climb and slide your way to victory!",
            gradient: ['#4FACFE', '#00F2FE'],
        },
        {
            id: '3',
            name: 'Tic Tac Toe',
            image: require('../../assets/images/ttt.png'),
            route: 'TicTacToe',
            tagline: "Challenge your friends to a classic game!",
            gradient: ['#43E97B', '#38F9D7'],
        },
        {
            id: '4',
            name: 'Chess',
            image: require('../../assets/images/chess.png'),
            route: 'ComingSoon',
            tagline: "Master the board, conquer the mind!",
            gradient: ['#43E97B', '#38F9D7'],
        },
    ];

    const filteredGames = games.filter((game) =>
        game.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={[styles.headerTitle, isDark && styles.darkText]}>
                        Choose Your Game
                    </Text>
                    <TextInput
                        style={[styles.searchBar, isDark && styles.darkSearchBar]}
                        placeholder="Search games..."
                        placeholderTextColor={isDark ? '#94a3b8' : '#64748b'}
                        value={searchText}
                        onChangeText={setSearchText}
                    />
                </View>

                {/* Game Cards */}
                <View style={styles.gamesGrid}>
                    {filteredGames.map((game) => (
                        <View key={game.id} style={[styles.gameCard, isDark && styles.darkGameCard]}>
                            <Image
                                source={game.image}
                                style={styles.gameImage}
                                resizeMode="cover"
                            />
                            <View style={styles.gameInfo}>
                                <Text style={[styles.gameName, isDark && styles.darkText]}>
                                    {game.name}
                                </Text>
                                <Text style={[styles.gameTagline, isDark && styles.darkTagline]}>
                                    {game.tagline}
                                </Text>
                                <TouchableOpacity
                                    style={[styles.playButton, isDark && styles.darkPlayButton]}
                                    onPress={() => navigation.navigate(game.route)}
                                >
                                    <Text style={styles.playButtonText}>Play Now</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView >
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0f172a', // Updated for a dark gradient-like feel
    },
    darkContainer: {
        backgroundColor: '#0f172a',
    },
    scrollContent: {
        paddingBottom: 20,
    },
    header: {
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8fafc',
        marginBottom: 16,
        letterSpacing: 1,
    },
    searchBar: {
        width: '90%',
        height: 45,
        borderRadius: 20,
        backgroundColor: '#1e293b',
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#f8fafc',
        borderWidth: 1,
        borderColor: '#64748b',
    },
    gamesGrid: {
        paddingHorizontal: 16,
        gap: 20,
    },
    gameCard: {
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 5,
    },
    darkGameCard: {
        borderColor: '#475569',
        backgroundColor: '#1e293b',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    gameImage: {
        width: '100%',
        height: 180,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    gameInfo: {
        padding: 16,
    },
    gameName: {
        fontSize: 22,
        fontWeight: '700',
        marginBottom: 8,
        color: '#f8fafc',
    },
    gameTagline: {
        fontSize: 14,
        color: '#94a3b8',
        marginBottom: 12,
    },
    playButton: {
        backgroundColor: '#9333ea',
        paddingVertical: 10,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 8,
        transform: [{ scale: 1 }],
        transition: 'all 0.3s',
    },
    playButtonText: {
        color: '#ffffff',
        fontWeight: '700',
        fontSize: 16,
    },
});

