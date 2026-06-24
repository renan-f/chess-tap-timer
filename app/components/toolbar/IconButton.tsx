import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IProps {
  style?: StyleProp<ViewStyle>,
  icon?: any,
  iconColor?: string,
  text?: string,
  onPress: () => void
}

const IconButton = ({ icon, iconColor = 'white', text, style, onPress }: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
    >
      {icon && <Ionicons name={icon} size={20} color={iconColor} />}
      {text && <Text style={styles.buttonText}>{text}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#3c3a37',
    borderRadius: 8,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    textAlign: 'center',
    color: 'white',
    includeFontPadding: false,
  },
});

export default IconButton;
