import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

interface IProps {
    backgroundColor: string,
    timeConfig: string,
    onTap: (ref: any) => any,
    inverted?: boolean,
    highlighted?: boolean
}

const TimerArea = forwardRef(({ backgroundColor, onTap, timeConfig, inverted = false, highlighted = false }: IProps, ref) => {
    const timerRef = useRef<any>(null);
    const startTimeRef = useRef<any>(null);
    const pulseAnim = useRef(new Animated.Value(0)).current;

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

    useEffect(() => {
        if (!highlighted) {
            pulseAnim.stopAnimation();
            pulseAnim.setValue(0);
            return;
        }

        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(pulseAnim, {
                    toValue: 1,
                    duration: 900,
                    useNativeDriver: true,
                }),
                Animated.timing(pulseAnim, {
                    toValue: 0,
                    duration: 900,
                    useNativeDriver: true,
                }),
            ])
        );

        pulse.start();

        return () => pulse.stop();
    }, [highlighted, pulseAnim]);


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
        <Pressable onPressOut={handlePressOut} style={[styles.area, { backgroundColor }, highlighted && styles.highlightedArea]}>
            {highlighted && (
                <>
                    <View pointerEvents="none" style={styles.highlightOverlay} />
                    <Animated.View
                        pointerEvents="none"
                        style={[
                            styles.pulseOverlay,
                            {
                                opacity: pulseAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [0.12, 0.28],
                                }),
                            },
                        ]}
                    />
                </>
            )}
            <View style={inverted && styles.inverted}>
                <View style={highlighted && styles.highlightedTimerWrapper}>
                    <Text style={[styles.timer, highlighted && styles.highlightedTimer]}>{formatTime(time)}</Text>
                </View>
            </View>
        </Pressable>
    )

});

const styles = StyleSheet.create({
    area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        overflow: 'hidden'
    },
    highlightedArea: {
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.35,
        shadowRadius: 12,
        zIndex: 1,
    },
    highlightOverlay: {
        ...StyleSheet.absoluteFill,
        borderColor: 'rgba(255, 255, 255, 0.52)',
        borderWidth: 4,
    },
    pulseOverlay: {
        ...StyleSheet.absoluteFill,
        backgroundColor: '#ffffff',
    },
    highlightedTimerWrapper: {
        transform: [{ scale: 1.04 }],
    },
    timer: {
        fontSize: 48,
        fontWeight: 'bold',
        fontFamily: 'monospace',
    },
    highlightedTimer: {
        color: '#050505',
    },
    inverted: {
        transform: [{ rotate: '180deg' }],
    }
})

export default TimerArea;
