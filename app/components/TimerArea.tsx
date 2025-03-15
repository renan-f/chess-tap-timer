import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    backgroundColor: string,
    onTap: (ref: any) => any
}

const TimerArea = forwardRef(({ backgroundColor, onTap }: IProps, ref) => {
    const DEFAULT_TIME_SECONDS = 60 * 10;
    const [time, setTime] = useState<number>(DEFAULT_TIME_SECONDS)

    const timerRef = useRef<any>(null);
    const startTimeRef = useRef<any>(null);

    const startTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        startTimeRef.current = Date.now();

        timerRef.current = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            startTimeRef.current = Date.now();

            setTime(prevTime => {
                const newTime = prevTime - elapsed;
                if (newTime <= 0) {
                    clearInterval(timerRef.current);
                    return 0;
                }
                return newTime;
            });
        }, 100);
    };

    const pauseTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const resetTimer = () => {
        pauseTimer();
        setTime(DEFAULT_TIME_SECONDS);
    };

    useImperativeHandle(ref, () => ({
        start: startTimer,
        pause: pauseTimer,
        reset: resetTimer
    }));

    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);


    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePressOut = () => {
        pauseTimer();
        onTap(ref);
    }

    return (
        <Pressable onPressOut={handlePressOut} style={[styles.area, { backgroundColor }]}>
            <View>
                <Text style={styles.timer}>{formatTime(time)}</Text>
            </View>
        </Pressable>
    )

});

const styles = StyleSheet.create({
    area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
    },
    timer: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    }
})

export default TimerArea;