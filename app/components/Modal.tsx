import React, { Children, ReactNode } from 'react';
import { Modal, StyleSheet, Text, Pressable, View } from 'react-native';

interface IProps {
    children: ReactNode,
    modalVisible: boolean,
    title?: string
}

const ModalComponent = ({ children, modalVisible, title }: IProps) => {
    return (<>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}>
            <View style={styles.modal}>
                {title && <View style={styles.modalHeader}>
                    <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>{title}</Text>
                </View>}
                {children}
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
        flex: 1,
        flexDirection: 'column',
        maxHeight: 44,
        padding: 12,
        width: '100%',
        backgroundColor: '#3c3a37',
    }
});

export default ModalComponent;