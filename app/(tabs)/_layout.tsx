import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const isDark = true;

    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    borderTopColor: isDark ? '#1e293b' : '#e2e8f0',
                    elevation: 0,
                    height: 70,
                    paddingBottom: 10,
                    paddingTop: 8,
                },
                tabBarActiveTintColor: '#e879f9',
                tabBarInactiveTintColor: isDark ? '#64748b' : '#94a3b8',
                headerStyle: {
                    backgroundColor: isDark ? '#0f172a' : '#ffffff',
                    shadowOpacity: 0, // Remove shadow for a cleaner look
                    elevation: 0,
                },
                headerTitleAlign: 'center', // Center the title in the header
                headerTintColor: isDark ? '#f8fafc' : '#0f172a',
            }}
        >
            {/* Home Tab */}
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'home' : 'home-outline'}
                            size={size + 2}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Home',
                }}
            />
            {/* Games Tab */}
            <Tabs.Screen
                name="games"
                options={{
                    title: 'Games',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'game-controller' : 'game-controller-outline'}
                            size={size + 2}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Games',
                }}
            />
            {/* Blinks Tab */}
            <Tabs.Screen
                name="blinks"
                options={{
                    title: 'Blinks',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'flash' : 'flash-outline'}
                            size={size + 2}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Blinks',
                }}
            />
            {/* Leaderboard Tab */}
            <Tabs.Screen
                name="leaderboard"
                options={{
                    title: 'Leaderboard',
                    tabBarIcon: ({ color, size, focused }) => (
                        <Ionicons
                            name={focused ? 'trophy' : 'trophy-outline'}
                            size={size + 2}
                            color={color}
                        />
                    ),
                    tabBarLabel: 'Leaderboard',
                }}
            />
        </Tabs>
    );
}

