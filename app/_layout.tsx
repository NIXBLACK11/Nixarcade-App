import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                headerStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#1a1a1a' : '#ffffff',
                },
                headerTintColor: colorScheme === 'dark' ? '#e879f9' : '#9333ea',
                contentStyle: {
                    backgroundColor: colorScheme === 'dark' ? '#121212' : '#f5f5f5',
                },
            }}
        />
    );
}
