import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ViewStyle,
    TextStyle,
    StyleProp
} from 'react-native';

export interface RadioOption {
    label: string;
    value: string | number;
}

interface RadioButtonProps {
    options: RadioOption[];
    selectedValue?: any;
    onValueChange: (value: any) => void;
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
                <TouchableOpacity
                    key={option.value}
                    style={[
                        styles.radioOption,
                        direction === 'row' && styles.rowOption,
                    ]}
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
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 8,
    },
    rowOption: {
        marginRight: 16,
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
});

export default RadioButton;
