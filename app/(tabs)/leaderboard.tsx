import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    useColorScheme,
    TextInput,
    TouchableOpacity,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Generate random leaderboard data
const generateRandomLeaderboardData = () => {
    const names = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];
    return names.map((name, index) => ({
        id: String(index),
        name,
        gamesPlayed: Math.floor(Math.random() * 100),
        wins: Math.floor(Math.random() * 100),
        losses: Math.floor(Math.random() * 100),
    }));
};

// Generate random stats for "Your Stats"
const generateRandomStats = () => {
    const games = ['Ludo', 'Snakes and Ladders', 'Tic-Tac-Toe', 'Chess'];
    return games.map((game) => ({
        game,
        played: Math.floor(Math.random() * 50),
        wins: Math.floor(Math.random() * 50),
        losses: Math.floor(Math.random() * 50),
        draws: Math.floor(Math.random() * 20),
    }));
};

const LeaderboardScreen = () => {
    const colorScheme = useColorScheme();
    const isDark = true;
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('leaderboard'); // 'leaderboard' or 'stats'
    const leaderboardData = generateRandomLeaderboardData();
    const statsData = generateRandomStats();

    const filteredData = leaderboardData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={[styles.container, { backgroundColor: isDark ? '#0f172a' : '#f1f5f9' }]}>
            <View style={styles.header}>
                <Text style={[styles.headerTitle, isDark && styles.darkText]}>Leaderboard</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'leaderboard' && {
                            backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                        },
                    ]}
                    onPress={() => setActiveTab('leaderboard')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color: activeTab === 'leaderboard' ? '#22d3ee' : isDark ? '#94a3b8' : '#64748b',
                            },
                        ]}
                    >
                        Leaderboard
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        activeTab === 'stats' && {
                            backgroundColor: isDark ? '#1e293b' : '#e2e8f0',
                        },
                    ]}
                    onPress={() => setActiveTab('stats')}
                >
                    <Text
                        style={[
                            styles.tabText,
                            {
                                color: activeTab === 'stats' ? '#22d3ee' : isDark ? '#94a3b8' : '#64748b',
                            },
                        ]}
                    >
                        Your Stats
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Active Tab Content */}
            {activeTab === 'leaderboard' ? (
                <View style={styles.content}>
                    {/* Search Bar */}
                    <View style={[styles.searchBar, { backgroundColor: isDark ? '#1e293b' : '#e2e8f0' }]}>
                        <Ionicons name="search" size={20} color={isDark ? '#94a3b8' : '#0f172a'} />
                        <TextInput
                            style={[styles.searchInput, { color: isDark ? '#f8fafc' : '#0f172a' }]}
                            placeholder="Search by name"
                            placeholderTextColor={isDark ? '#64748b' : '#94a3b8'}
                            value={searchQuery}
                            onChangeText={setSearchQuery}
                        />
                    </View>
                    {/* Leaderboard List */}
                    <FlatList
                        data={filteredData}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity activeOpacity={0.9}>
                                <View
                                    style={[
                                        styles.card,
                                        {
                                            backgroundColor: isDark ? '#1e293b' : '#ffffff',
                                        },
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.rank,
                                            { color: isDark ? '#94a3b8' : '#0f172a' },
                                        ]}
                                    >
                                        {index + 1}
                                    </Text>
                                    <View style={styles.userDetails}>
                                        <Text
                                            style={[
                                                styles.name,
                                                { color: isDark ? '#f8fafc' : '#0f172a' },
                                            ]}
                                        >
                                            {item.name}
                                        </Text>
                                    </View>
                                    <View style={styles.stats}>
                                        <Text
                                            style={[
                                                styles.score,
                                                { color: isDark ? '#94a3b8' : '#0f172a' },
                                            ]}
                                        >
                                            🕹 {item.gamesPlayed}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.score,
                                                { color: isDark ? '#22c55e' : '#16a34a' },
                                            ]}
                                        >
                                            🏆 {item.wins}
                                        </Text>
                                        <Text
                                            style={[
                                                styles.score,
                                                { color: isDark ? '#f43f5e' : '#dc2626' },
                                            ]}
                                        >
                                            ❌ {item.losses}
                                        </Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            <Text
                                style={[
                                    styles.emptyText,
                                    { color: isDark ? '#94a3b8' : '#0f172a' },
                                ]}
                            >
                                No players found.
                            </Text>
                        }
                        contentContainerStyle={styles.list}
                    />
                </View>
            ) : (
                <ScrollView style={styles.content}>
                    {statsData.map((stat, index) => (
                        <View
                            key={index}
                            style={[
                                styles.statCard,
                                { backgroundColor: isDark ? '#1e293b' : '#ffffff' },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.statTitle,
                                    { color: isDark ? '#f8fafc' : '#0f172a' },
                                ]}
                            >
                                {stat.game}
                            </Text>
                            <Text
                                style={[
                                    styles.statDetail,
                                    { color: isDark ? '#94a3b8' : '#64748b' },
                                ]}
                            >
                                Games Played: {stat.played}
                            </Text>
                            <Text
                                style={[
                                    styles.statDetail,
                                    { color: isDark ? '#22c55e' : '#16a34a' },
                                ]}
                            >
                                Wins: {stat.wins}
                            </Text>
                            <Text
                                style={[
                                    styles.statDetail,
                                    { color: isDark ? '#f43f5e' : '#dc2626' },
                                ]}
                            >
                                Losses: {stat.losses}
                            </Text>
                            <Text
                                style={[
                                    styles.statDetail,
                                    { color: isDark ? '#94a3b8' : '#64748b' },
                                ]}
                            >
                                Draws: {stat.draws}
                            </Text>
                        </View>
                    ))}
                </ScrollView>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, paddingHorizontal: 15 },
    tabs: { flexDirection: 'row', marginBottom: 20 },
    tab: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', marginHorizontal: 5 },
    tabText: { fontSize: 16, fontWeight: '700' },
    content: { flex: 1 },
    searchBar: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, borderRadius: 8, height: 40, marginBottom: 15 },
    searchInput: { flex: 1, fontSize: 16, marginLeft: 10 },
    list: { paddingBottom: 20 },
    card: { flexDirection: 'row', alignItems: 'center', padding: 15, marginBottom: 10, borderRadius: 12 },
    rank: { width: 40, fontSize: 18, fontWeight: 'bold', textAlign: 'center' },
    userDetails: { flex: 2 },
    name: { fontSize: 18, fontWeight: '700' },
    stats: { flexDirection: 'column', alignItems: 'flex-end' },
    score: { fontSize: 14, fontWeight: '500' },
    emptyText: { textAlign: 'center', fontSize: 16, marginTop: 20 },
    statCard: { padding: 15, marginBottom: 10, borderRadius: 12 },
    statTitle: { fontSize: 18, fontWeight: '700' },
    statDetail: { fontSize: 14, marginTop: 5 },
    header: {
        padding: 20,
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#f8fafc',
        marginBottom: 16,
        letterSpacing: 1,
    },

});

export default LeaderboardScreen;

