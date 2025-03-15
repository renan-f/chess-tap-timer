import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import TimerArea from './TimerArea';
import Toolbar from './toolbar/Toolbar';

const ClockChess = () => {
    const playerOne = useRef<any>(null);
    const playerTwo = useRef<any>(null);

    const handlerOnTap = (ref: any) => {
        getRefNewPlayerByOnTap(ref).current.start();
    }

    const getRefNewPlayerByOnTap = (ref: any) => Object.is(ref, playerOne) ? playerTwo : playerOne;

    const handlePause = () => {
        pausePlayer(playerOne);
        pausePlayer(playerTwo);
    };
    const handleReset = () => {
        resetPlayer(playerOne);
        resetPlayer(playerTwo);
    };

    const pausePlayer = (player: any) => {
        if (!player.current) return;
        player.current.pause();
    }

    const resetPlayer = (player: any) => {
        if (!player.current) return;
        player.current.reset();
    }

    return (
        <View style={styles.container}>
            <TimerArea ref={playerOne} backgroundColor='#5d9948' onTap={handlerOnTap} />
            <Toolbar onPause={handlePause} onReset={handleReset} style={styles.toolbar} />
            <TimerArea ref={playerTwo} backgroundColor='#c7c7c6' onTap={handlerOnTap} />
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