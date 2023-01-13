import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';

function ViewClientAgreementPDF({pdfSrc, onCancel, navigation}) {
  const onPressViewPdf = url => {
    if (url === null || url === undefined) {
      Alert.alert(' ', 'Unable to download the document', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
    Alert.alert('Download', 'Please download document here', [
      {
        text: 'Yes, Download',
        onPress: () => {
          Linking.canOpenURL(url).then(supported => {
            console.log(url);
            console.log('Download supported : ', supported);
            // Linking.openURL(url);
            if (supported) {
              Linking.openURL(url);
            } else {
              // console.log("Don't know how to open URI: " + getDownloadLinkSuccess.downloadLink);
            }
          });
        },
      },
      {
        style: 'cancel',
        text: 'No',
      },
    ]);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={styles.flatListContainer}>
          <FlatList
            data={pdfSrc}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onPressViewPdf(item.toString().trim());
                }}>
                <Text style={styles.modalText}>
                  {item !== ''
                    ? `\u2022 ${item.toString().split('_').pop()}`
                    : null}
                </Text>
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
    // margin: 20,
    height: 250,
    width: 270,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    paddingVertical: 35,
    paddingHorizontal: 30,
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
    color: COLORS.blue,
    fontSize: 20,
    // fontWeight: 'bold',
    // textAlign: 'center',
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
