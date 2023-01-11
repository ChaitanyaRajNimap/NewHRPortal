import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import ViewPdf from '../ViewPdf';

function ViewClientAgreementPDF({pdfSrc, onCancel, navigation}) {
  // const [closeModal, setCloseModal] = useState('');

  // const closeModalFunction = useCallback(() => {
  //   setCloseModal(onCancel);
  // }, [closeModal]);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={pdfSrc}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => navigation.navigate('ViewPdf')}>
                <Text style={styles.modalText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          {/* <ViewPdf /> */}
        </View>
        <SmallButton
          color={COLORS.grey}
          title={'Cancel'}
          onPressFunction={() => {
            onCancel();
          }}
          style={{flex: 1}}
        />
      </View>
    </View>
  );
}

export default ViewClientAgreementPDF;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    color: COLORS.black,
    textAlign: 'center',
  },
  onPress: {color: COLORS.blue},
  flatListContainer: {
    maxHeight: 200,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
