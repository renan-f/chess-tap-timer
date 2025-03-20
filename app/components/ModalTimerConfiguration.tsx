import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import RadioButton from "./RadioButton";
import chessTimers from "../constants/ChessTimers";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface IProps {
    onConfirmation: (value: string) => void,
    onCancel: () => void
}

const ModalTimerConfiguration = ({ onConfirmation, onCancel }: IProps) => {
    const [selectedValue, setSelectedValue] = useState<string>('');
    useEffect(() => {
        AsyncStorage.getItem('timeConfig').then(value => setSelectedValue(value as string))
    }, []);

    return (
        <View style={{ flex: 1, gap: 8 }}>
            <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 16 }}>Selecione o tempo da partida</Text>
                <RadioButton
                    options={chessTimers}
                    selectedValue={selectedValue}
                    onValueChange={(value) => setSelectedValue(value)}
                />
            </View>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#5d9948' }]} onPress={() => onConfirmation(selectedValue)}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Confirmar</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, { backgroundColor: '#c7c7c6' }]} onPress={() => onCancel()}>
                <Text style={[styles.buttonText, { color: 'black', fontWeight: '600' }]}>Cancelar</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        padding: 8,
        borderRadius: 8,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 14
    }
});

export default ModalTimerConfiguration;
