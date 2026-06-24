import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export interface RadioOption {
    label: string;
    value: string | number;
    deletable?: boolean;
}

interface RadioButtonProps {
    options: RadioOption[];
    selectedValue?: any;
    onValueChange: (value: any) => void;
    onDelete?: (value: string | number) => void;
    containerStyle?: StyleProp<ViewStyle>;
    labelStyle?: StyleProp<TextStyle>;
    radioStyle?: StyleProp<ViewStyle>;
    activeColor?: string;
    inactiveColor?: string;
    direction?: 'row' | 'column';
}

const RadioButton = ({
    options,
    selectedValue,
    onValueChange,
    onDelete,
    containerStyle,
    labelStyle,
    radioStyle,
    activeColor = '#5d9948',
    inactiveColor = '#CCCCCC',
    direction = 'column'
}: RadioButtonProps) => {
    return (
        <View style={[
            styles.container,
            direction === 'row' && styles.rowContainer,
            containerStyle
        ]}>
            {options.map((option) => (
                <View
                    key={option.value}
                    style={[
                        styles.optionRow,
                        direction === 'row' && styles.rowOption,
                    ]}
                >
                    <TouchableOpacity
                        style={[styles.radioOption, { flex: 1 }]}
                        onPress={() => onValueChange(option.value)}
                        activeOpacity={0.7}
                    >
                        <View
                            style={[
                                styles.radio,
                                { borderColor: option.value === selectedValue ? activeColor : inactiveColor },
                                radioStyle
                            ]}
                        >
                            {option.value === selectedValue && (
                                <View
                                    style={[
                                        styles.radioInner,
                                        { backgroundColor: activeColor }
                                    ]}
                                />
                            )}
                        </View>
                        <Text style={[
                            styles.radioLabel,
                            { color: option.value === selectedValue ? activeColor : '#000' },
                            labelStyle
                        ]}>
                            {option.label}
                        </Text>
                    </TouchableOpacity>
                    {option.deletable && onDelete && (
                        <TouchableOpacity
                            onPress={() => onDelete(option.value)}
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            style={styles.deleteButton}
                        >
                            <Ionicons name="trash-outline" size={18} color="#cc4444" />
                        </TouchableOpacity>
                    )}
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    rowContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    optionRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    rowOption: {
        marginRight: 16,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radio: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    radioInner: {
        height: 10,
        width: 10,
        borderRadius: 5,
    },
    radioLabel: {
        marginLeft: 10,
        fontSize: 16,
    },
    deleteButton: {
        paddingLeft: 12,
    },
});

export default RadioButton;
