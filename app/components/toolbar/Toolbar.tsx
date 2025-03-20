import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import IconButton from "./IconButton";

interface IProps {
    style: StyleProp<ViewStyle>,
    onPause: () => void,
    onReset: () => void,
    onSetting: () => void,
}

const Toolbar = ({ onPause, onReset, onSetting, style }: IProps) => {
    return (
        <View style={[styles.tools, style]}>
            <IconButton icon='play' text='pause' onPress={onPause} />
            <IconButton icon='refresh' text='resete' onPress={onReset} />
            <IconButton icon='settings' onPress={onSetting} style={styles.settings} />
        </View>
    );
}
const styles = StyleSheet.create({
    tools: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 20,
        position: 'relative'
    },
    settings: {
        position: 'absolute',
        right: 16,
        top: 12
    }
})

export default Toolbar;