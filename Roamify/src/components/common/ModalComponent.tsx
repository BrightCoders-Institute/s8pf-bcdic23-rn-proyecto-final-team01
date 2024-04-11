import React from 'react';
import { Modal, View, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { globalStyles } from '../../theme/globalStyles';
import ButtonComponent from '../ButtonComponent';
import { ModalComponentProps } from '../types';

const ModalComponent = ({ visible, onClose, children, aceptar }: ModalComponentProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.contentContainer}>
                {children}
              </View>
              <View style={styles.buttonContainer}>
                <ButtonComponent
                  text={'Cancelar'}
                  styles={[
                    globalStyles.buttonPrimary,
                    {width: 125, backgroundColor: '#CCCCCC'}
                  ]}
                  onPress={onClose}
                />
                <ButtonComponent
                  text={'Aceptar'}
                  styles={[globalStyles.buttonPrimary, {width: 125}]}
                  onPress={aceptar}
                />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    width: '80%'
  },
  contentContainer: {
    padding: 5,
    marginBottom: 30,
    marginTop: 20
  },
  buttonContainer: {
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
});

export default ModalComponent;
