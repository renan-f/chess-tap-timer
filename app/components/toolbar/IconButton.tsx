import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  icon?: any,
  text?: string,
  onPress: () => void
}

const IconButton = ({ icon, text, onPress }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { gap: 8 }]}
      onPress={onPress}
    >
      {icon && <Ionicons name={icon} size={16} color="white" />}
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3c3a37',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: { color: 'white' },
});

export default IconButton;