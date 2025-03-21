import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  style?: StyleProp<ViewStyle>,
  icon?: any,
  text?: string,
  onPress: () => void
}

const IconButton = ({ icon, text, style, onPress }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { gap: 8 }, style]}
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