import { useState } from "react";
import { Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { useTranslation } from "../i18n";
import { CustomTimer } from "../types/timer";

interface IProps {
    onAdd: (timer: CustomTimer) => void;
    onBack: () => void;
}

const CustomTimerForm = ({ onAdd, onBack }: IProps) => {
    const { t } = useTranslation();
    const [inputMinutes, setInputMinutes] = useState('');
    const [inputIncrement, setInputIncrement] = useState('');

    const handleAdd = () => {
        const mins = parseInt(inputMinutes, 10);
        const inc = parseInt(inputIncrement, 10) || 0;
        if (!mins || mins <= 0) return;
        onAdd({ minutes: mins, increment: inc });
        setInputMinutes('');
        setInputIncrement('');
    };

    const handleBack = () => {
        setInputMinutes('');
        setInputIncrement('');
        onBack();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.helpText}>{t('custom.helpText')}</Text>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>{t('custom.gameTime')}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={inputMinutes}
                    onChangeText={v => setInputMinutes(v.replace(/\D/g, ''))}
                    placeholder="10"
                    placeholderTextColor="#c7c7c6"
                    underlineColorAndroid="transparent"
                    autoFocus
                />
                <Text style={styles.fieldHint}>{t('custom.gameTimeHint')}</Text>
            </View>
            <View style={styles.field}>
                <Text style={styles.fieldLabel}>{t('custom.increment')}</Text>
                <TextInput
                    style={styles.input}
                    keyboardType="number-pad"
                    value={inputIncrement}
                    onChangeText={v => setInputIncrement(v.replace(/\D/g, ''))}
                    placeholder="0"
                    placeholderTextColor="#c7c7c6"
                    underlineColorAndroid="transparent"
                />
                <Text style={styles.fieldHint}>{t('custom.incrementHint')}</Text>
            </View>
            <View style={{ flex: 1 }} />
            <View style={styles.buttonGroup}>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#5d9948' }]} onPress={handleAdd}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>{t('custom.add')}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: '#c7c7c6' }]} onPress={handleBack}>
                    <Text style={[styles.buttonText, { color: '#3c3a37' }]}>{t('custom.back')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 16,
    },
    helpText: {
        fontSize: 16,
        color: '#3c3a37',
        paddingHorizontal: 10,
        paddingTop: 4,
    },
    field: {
        gap: 6,
        paddingHorizontal: 10,
    },
    fieldLabel: {
        fontSize: 15,
        color: '#3c3a37',
        fontWeight: '500',
    },
    fieldHint: {
        fontSize: 13,
        color: '#6b6967',
        marginTop: -2,
    },
    input: {
        borderWidth: 1,
        borderColor: '#c7c7c6',
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        backgroundColor: '#fff',
        ...Platform.select({ web: { outlineWidth: 0 } as any }),
    },
    buttonGroup: {
        gap: 8,
    },
    button: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CustomTimerForm;
