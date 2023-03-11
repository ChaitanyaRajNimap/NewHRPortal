import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Linking,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SmallButton from './SmallButton';
import {COLORS} from '../Constants/Theme';
import {GLOBALSTYLE} from '../Constants/Styles';

const ViewPdf = ({pdfdata, onCancel, navigation}) => {
  const onPressPurchaseOrder = url => {
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
            console.log(supported);
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
            data={pdfdata}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onPressPurchaseOrder(item.toString().trim());
                }}>
                <Text style={styles.modalText}>
                  {item !== ''
                    ? `\u2022 ${item.toString().split('_').pop()}`
                    : null}
                </Text>
              </TouchableOpacity>
            )}
          />
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
};

export default ViewPdf;

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
