import React from 'react';
import {View, Text, Modal, StyleSheet, FlatList} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';

function ViewClientAgreementPDF({pdfSrc, visible, onCancel}) {
  return (
    <Modal visible={visible} animationType="slide" style={styles.modal}>
      <View style={styles.modal}>
        <FlatList
          data={pdfSrc}
          renderItem={({item}) => <Text>{item}</Text>}
          style={{flex: 1}}
        />
        <View style={{flex: 1}}>
          <SmallButton
            color={COLORS.grey}
            title={'Cancel'}
            onPressFunction={() => {
              onCancel();
            }}
          />
        </View>
      </View>
    </Modal>
  );
}

export default ViewClientAgreementPDF;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
