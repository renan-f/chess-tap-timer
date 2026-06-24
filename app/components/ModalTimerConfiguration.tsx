import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RadioButton from "./RadioButton";
import CustomTimerForm from "./CustomTimerForm";
import chessTimers from "../constants/ChessTimers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "../i18n";
import { CustomTimer } from "../types/timer";

const CUSTOM_TIMERS_KEY = 'customTimers';

const getCustomValue = (ct: CustomTimer) =>
    `${ct.minutes * 60}${ct.increment > 0 ? '+' + ct.increment : ''}`;

interface IProps {
    onConfirmation: (value: string) => void;
    onCancel: () => void;
}

const ModalTimerConfiguration = ({ onConfirmation, onCancel }: IProps) => {
    const { t } = useTranslation();
    const [selectedValue, setSelectedValue] = useState<string>('');
    const [customTimers, setCustomTimers] = useState<CustomTimer[]>([]);
    const [showForm, setShowForm] = useState(false);

    useEffect(() => {
        Promise.all([
            AsyncStorage.getItem('timeConfig'),
            AsyncStorage.getItem(CUSTOM_TIMERS_KEY),
        ]).then(([savedTime, raw]) => {
            const timers: CustomTimer[] = raw ? JSON.parse(raw) : [];
            setCustomTimers(timers);

            const allValues = [
                ...chessTimers.map(t => String(t.value)),
                ...timers.map(getCustomValue),
            ];
            const isValid = savedTime && allValues.includes(savedTime);
            setSelectedValue(isValid ? savedTime : String(chessTimers[0].value));
        });
    }, []);

    const getCustomLabel = (ct: CustomTimer) => {
        const minStr = `${ct.minutes} ${t('custom.minuteUnit')}`;
        if (ct.increment > 0) return `${minStr} + ${ct.increment} ${t('custom.secondUnit')}`;
        return minStr;
    };

    const allOptions = [
        ...chessTimers.map(timer => ({ ...timer, label: t(timer.label) })),
        ...customTimers.map(ct => ({
            label: getCustomLabel(ct),
            value: getCustomValue(ct),
            deletable: true,
        })),
    ];

    const saveCustomTimers = async (updated: CustomTimer[]) => {
        setCustomTimers(updated);
        await AsyncStorage.setItem(CUSTOM_TIMERS_KEY, JSON.stringify(updated));
    };

    const handleAdd = (timer: CustomTimer) => {
        const newValue = getCustomValue(timer);
        const alreadyExists =
            chessTimers.some(t => t.value === newValue) ||
            customTimers.some(ct => getCustomValue(ct) === newValue);

        if (!alreadyExists) {
            saveCustomTimers([...customTimers, timer]);
        }

        setSelectedValue(newValue);
        setShowForm(false);
    };

    const handleDelete = (value: string | number) => {
        const updated = customTimers.filter(ct => getCustomValue(ct) !== String(value));
        saveCustomTimers(updated);
        if (selectedValue === String(value)) setSelectedValue(String(chessTimers[0].value));
    };

    if (showForm) {
        return <CustomTimerForm onAdd={handleAdd} onBack={() => setShowForm(false)} />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.selectLabel}>{t('settings.selectTime')}</Text>
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <RadioButton
                    options={allOptions}
                    selectedValue={selectedValue}
                    onValueChange={setSelectedValue}
                    onDelete={handleDelete}
                />
                <TouchableOpacity style={styles.addCustomButton} onPress={() => setShowForm(true)}>
                    <Ionicons name="add-circle-outline" size={18} color="#5d9948" />
                    <Text style={styles.addCustomText}>{t('custom.addButton')}</Text>
                </TouchableOpacity>
            </ScrollView>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#5d9948' }]} onPress={() => onConfirmation(selectedValue)}>
                <Text style={[styles.buttonText, { color: 'white' }]}>{t('settings.confirm')}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#c7c7c6' }]} onPress={onCancel}>
                <Text style={[styles.buttonText, { color: '#3c3a37' }]}>{t('settings.cancel')}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: 8,
    },
    selectLabel: {
        fontSize: 16,
        color: '#3c3a37',
        paddingHorizontal: 10,
        paddingTop: 4,
    },
    addCustomButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    addCustomText: {
        color: '#5d9948',
        fontWeight: '600',
        fontSize: 15,
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

export default ModalTimerConfiguration;
