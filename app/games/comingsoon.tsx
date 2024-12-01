import { View, Text, StyleSheet, useColorScheme } from 'react-native';

export default function ComingSoon() {
    const isDark = useColorScheme() === 'dark';

    return (
        <View style={[styles.container, isDark && styles.darkContainer]}>
            <Text style={[styles.text, isDark && styles.darkText]}>Coming Soon</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    darkContainer: {
        backgroundColor: '#121212',
    },
    text: {
        fontSize: 24,
        color: '#1a1a1a',
    },
    darkText: {
        color: '#ffffff',
    },
});
