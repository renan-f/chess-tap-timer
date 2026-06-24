import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import IconButton from "./IconButton";

interface IProps {
    style: StyleProp<ViewStyle>,
    onPause: () => void,
    onReset: () => void,
    onSetting: () => void,
    paused: boolean,
}

const Toolbar = ({ onPause, onReset, onSetting, paused, style }: IProps) => {
    return (
        <View style={[styles.tools, style]}>
            <View style={styles.side} />
            <View style={styles.center}>
                <IconButton icon={paused ? 'play' : 'pause'} text={paused ? 'continue' : 'pause'} onPress={onPause} style={styles.mainButton} />
                <IconButton icon='refresh' text='resete' onPress={onReset} style={styles.mainButton} />
            </View>
            <View style={styles.side}>
                <IconButton icon='settings' onPress={onSetting} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tools: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    center: {
        flexDirection: 'row',
        gap: 16,
    },
    side: {
        flex: 1,
        alignItems: 'flex-end',
    },
    mainButton: {
        width: 102
    }
})

export default Toolbar;
