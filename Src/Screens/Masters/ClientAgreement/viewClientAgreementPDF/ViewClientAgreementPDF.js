import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';

function ViewClientAgreementPDF({pdfSrc, onCancel}) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <FlatList
          data={pdfSrc}
          renderItem={({item}) => <Text style={styles.modalText}>{item}</Text>}
          style={{flex: 1}}
        />

        <SmallButton
          color={COLORS.grey}
          title={'Cancel'}
          onPressFunction={() => {
            onCancel();
          }}
        />
      </View>
    </View>
  );
}

export default ViewClientAgreementPDF;

const styles = StyleSheet.create({
  centeredView: {
    // flex: 1,
    // justifyContent: 'center',
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
    shadowColor: '#000',
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
    textAlign: 'center',
  },
});
