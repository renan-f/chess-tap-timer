import React, { useEffect, useRef, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TimerArea from './TimerArea';
import Toolbar from './toolbar/Toolbar';
import ModalComponent from './ModalComponent';
import ModalTimerConfiguration from './ModalTimerConfiguration';

const ClockChess = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [timeConfig, setTimeConfig] = useState<string>('')
    const [paused, setPaused] = useState<boolean>(false);
    const [activePlayer, setActivePlayer] = useState<'playerOne' | 'playerTwo' | null>(null);
    const playerOne = useRef<any>(null);
    const playerTwo = useRef<any>(null);
    const currentPlayer = useRef<any>(null);

    useEffect(() => {
        AsyncStorage.getItem('timeConfig').then(value => {
            if (!value) {
                value = '600';
                AsyncStorage.setItem('timeConfig', '600');
            }
            setTimeConfig(value)
        })
    })

    const handleOnTap = (ref: any) => {
        const nextPlayer = getRefNewPlayerByOnTap(ref);
        nextPlayer.current.start();
        currentPlayer.current = nextPlayer;
        setActivePlayer(Object.is(nextPlayer, playerOne) ? 'playerOne' : 'playerTwo');
        setPaused(false);
    }

    const getRefNewPlayerByOnTap = (ref: any) => Object.is(ref, playerOne) ? playerTwo : playerOne;

    const handlePause = () => {
        if (paused) {
            currentPlayer.current?.current?.start();
            setPaused(false);
            return;
        }

        pauseGame();
    };

    const pauseGame = () => {
        pausePlayer(playerOne);
        pausePlayer(playerTwo);
        if (currentPlayer.current) {
            setPaused(true);
        }
    };

    const handleReset = () => {
        resetPlayer(playerOne);
        resetPlayer(playerTwo);
        currentPlayer.current = null;
        setActivePlayer(null);
        setPaused(false);
    };

    const pausePlayer = (player: any) => {
        if (!player.current) return;
        player.current.pause();
    }

    const resetPlayer = (player: any) => {
        if (!player.current) return;
        player.current.reset();
    }

    const handleOnSettings = () => {
        pauseGame();
        setModalVisible(!modalVisible);
    }

    const handleConfirmationChangeTime = (value: string) => {
        setModalVisible(!modalVisible);
        AsyncStorage.setItem('timeConfig', value);
        currentPlayer.current = null;
        setActivePlayer(null);
        setPaused(false);
    }

    return (
        <View style={styles.container}>
            <TimerArea
                ref={playerOne}
                backgroundColor='#5d9948'
                onTap={handleOnTap}
                timeConfig={timeConfig}
                inverted
                highlighted={activePlayer === 'playerOne'}
            />
            <Toolbar onPause={handlePause} onReset={handleReset} onSetting={handleOnSettings} paused={paused} style={styles.toolbar} />
            <TimerArea
                ref={playerTwo}
                backgroundColor='#c7c7c6'
                onTap={handleOnTap}
                timeConfig={timeConfig}
                highlighted={activePlayer === 'playerTwo'}
            />
            <ModalComponent title='Configurações' modalVisible={modalVisible}>
                <ModalTimerConfiguration onConfirmation={handleConfirmationChangeTime} onCancel={() => setModalVisible(!modalVisible)} />
            </ModalComponent>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch'
    },
    toolbar: {
        paddingBlock: 12,
        backgroundColor: '#FFF3E5'
    }
});

export default ClockChess;
