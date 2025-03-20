import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    backgroundColor: string,
    timeConfig: string,
    onTap: (ref: any) => any
}

const TimerArea = forwardRef(({ backgroundColor, onTap, timeConfig }: IProps, ref) => {
    const timerRef = useRef<any>(null);
    const startTimeRef = useRef<any>(null);

    const [timeSeconds, setTimeSeconds] = useState<number>(0);
    const [increaseTimeSeconds, setIncreaseTimeSeconds] = useState<number>(0);
    const [time, setTime] = useState<number>(timeSeconds);
    const [active, setActive] = useState<boolean>(false);

    useEffect(() => {
        const [TIME_SECONDS, INCREASE_TIME_SECONDS] = spliteTimes(timeConfig);
        setTimeSeconds(TIME_SECONDS);
        setIncreaseTimeSeconds(INCREASE_TIME_SECONDS);
        resetTimer(TIME_SECONDS);
    }, [timeConfig]);

    const spliteTimes = (timeConfig: string) => {
        const times = timeConfig.split('+');
        return [Number(times[0]), Number(times[1] ?? 0)]
    }

    const startTimer = () => {
        setActive(true);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        startTimeRef.current = Date.now();

        timerRef.current = setInterval(() => {
            const elapsed = (Date.now() - startTimeRef.current) / 1000;
            startTimeRef.current = Date.now();

            setTime((prevTime: any) => {
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
        setActive(false);
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    };

    const increaseTimer = () => {
        if (active) {
            setTime((value) => value + increaseTimeSeconds);
        }
    }

    const resetTimer = (TIME_SECONDS?: number) => {
        pauseTimer();
        setTime(TIME_SECONDS || timeSeconds);
    };

    useImperativeHandle(ref, () => ({
        start: startTimer,
        pause: pauseTimer,
        reset: resetTimer,
        active
    }));

    useEffect(() => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
    }, []);


    const formatTime = (timeInSeconds: number) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePressOut = () => {
        increaseTimer();
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