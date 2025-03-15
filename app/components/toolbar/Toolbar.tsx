import { Button, StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import IconButton from "./IconButton";

interface IProps {
    style: StyleProp<ViewStyle>,
    onPause: () => void,
    onReset: () => void
}

const Toolbar = ({ onPause, onReset, style }: IProps) => {
    return (
        <View style={[styles.tools, style]}>
            <IconButton icon='play' text='pause' onPress={onPause} />
            <IconButton icon='refresh' text='resete' onPress={onReset} />
        </View>
    );
}
const styles = StyleSheet.create({
    tools: {
        flexDirection: "row",
        justifyContent: 'center',
        gap: 20
    }
})

export default Toolbar;