import React from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {COLORS} from '../Constants/Theme';
import {GLOBALSTYLE} from '../Constants/Styles';
import {BlurView} from '@react-native-community/blur';

export default function DeleteModal({onpress, closeModal, visibel}) {
  //.................................................DELETEMODAL...........................................//

  return (
    <SafeAreaView style={[GLOBALSTYLE.mainContainer]}>
      <Modal animationType="fade" transparent={true} visible={visibel}>
        <View style={styles.modalContainer}>
          <BlurView blurType="xlight" blurAmount={5}>
            <View style={styles.modal}>
              <View>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 25,
                    color: 'black',
                    marginTop: 10,
                  }}>
                  YOU ARE SURE
                </Text>
              </View>
              <View>
                <Text
                  style={{textAlign: 'center', fontSize: 18, marginTop: 10}}>
                  are you sure you want to delete ?
                </Text>
              </View>
              <View style={[styles.buttonContainer, {marginTop: 10}]}>
                <TouchableOpacity onPress={onpress} style={styles.DeletBtn}>
                  <Text style={{color: COLORS.white, fontSize: 18}}>
                    Delete
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={closeModal} style={styles.cancelBtn}>
                  <Text style={{color: COLORS.white, fontSize: 18}}>
                    cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </BlurView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  DeletBtn: {
    backgroundColor: '#ff4500',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  modal: {
    backgroundColor: 'white',
    paddingHorizontal: 30,
    paddingVertical: 60,
    borderRadius: 5,
    shadowColor: '#c2c2a3',
    shadowOffset: {width: -2, height: 0},
    shadowOpacity: 25,
    elevation: 20,
    borderRadius: 5,
  },
  cancelBtn: {
    backgroundColor: '#707070',
    paddingHorizontal: 30,
    paddingVertical: 10,
    marginHorizontal: 10,
    color: 'white',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    fontSize: 25,
    color: 'white',
    borderRadius: 5,
  },
});
