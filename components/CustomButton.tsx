import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

interface CustomButtonProps {
    onPress: () => void;
    title: string;
    backgroundColor?: string; // Optional prop to customize the button color
    textColor?: string; // Optional prop to customize text color
}

const CustomButton: React.FC<CustomButtonProps> = ({
    onPress,
    title,
    backgroundColor = '#7c3aed', // Default purple background
    textColor = '#f9fafb', // Default light text
}) => {
    return (
        <TouchableOpacity
            style={[styles.button, { backgroundColor }]}
            onPress={onPress}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        width: '100%', // Full width with some margin
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default CustomButton;

