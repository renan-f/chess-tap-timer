import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RadioButton from "./RadioButton";
import chessTimers from "../constants/ChessTimers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "../i18n";

interface IProps {
    onConfirmation: (value: string) => void,
    onCancel: () => void
}

const ModalTimerConfiguration = ({ onConfirmation, onCancel }: IProps) => {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState<string>('');

    useEffect(() => {
        AsyncStorage.getItem('timeConfig').then(value => setSelectedValue(value as string))
    }, []);

    const translatedTimers = chessTimers.map(timer => ({ ...timer, label: t(timer.label) }));

    return (
        <View style={{ flex: 1, gap: 8 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>{t('settings.selectTime')}</Text>
                <RadioButton
                    options={translatedTimers}
                    selectedValue={selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#5d9948' }]} onPress={() => onConfirmation(selectedValue)}>
                <Text style={[styles.buttonText, { color: 'white' }]}>{t('settings.confirm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#c7c7c6' }]} onPress={() => onCancel()}>
                <Text style={[styles.buttonText, { color: '#3c3a37', fontWeight: '600' }]}>{t('settings.cancel')}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 14,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default ModalTimerConfiguration;
