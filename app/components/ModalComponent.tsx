import React, { ReactNode } from 'react';
import { Modal, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IProps {
    children: ReactNode,
    modalVisible: boolean,
    title?: string
}

const ModalComponent = ({ children, modalVisible, title }: IProps) => {
    const insets = useSafeAreaInsets();
    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modal}>
                {title && <View style={[styles.modalHeader, { paddingTop: insets.top + 12, maxHeight: insets.top + 52 }]}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>}
                <View style={{ flex: 1, width: '100%', padding: 12, paddingBottom: Math.max(12, insets.bottom) }}>
                    {children}
                </View>
            </View>
        </Modal>
    </>);
};

const styles = StyleSheet.create({
    modal: {
        flex: 1,
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white'
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 52,
        paddingHorizontal: 16,
        width: '100%',
        backgroundColor: '#3c3a37',
    }
});

export default ModalComponent;
