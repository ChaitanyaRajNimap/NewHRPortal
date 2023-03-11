import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  Linking,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import SmallButton from '../../../Components/SmallButton';
import ViewPdf from '../../../Components/ViewPdf';
import {SafeAreaView} from 'react-native-safe-area-context';
import DeleteModal from '../../../Components/DeleteModal';

function PurchaseOrderList({
  data,
  editPurchaseOrder,
  navigation,
  deletePurchaseOrder,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [DeletmodalVisible, setDeletmodalVisible] = useState(false);
  const [PdfData, setPdfData] = useState('');

  const closeModal = () => {
    console.log('useCallback modal');
    setDeletmodalVisible(false);
  };

  console.log('deletemodalVisible', DeletmodalVisible);
  const closeModalHandler = () => {
    setModalVisible(!modalVisible);
    // console.log('----MODAL CLOSED!----');
  };

  const _renderItem = ({item}) => {
    const DeletePurchaseOrder = () => {
      console.log('DeleteClientCalled');
      deletePurchaseOrder(item.id), setDeletmodalVisible(!DeletmodalVisible);
    };

    return (
      <>
        <SafeAreaView style={[GLOBALSTYLE.mainContainer]}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <ViewPdf
              pdfdata={PdfData}
              onCancel={closeModalHandler}
              navigation={navigation}
            />
          </Modal>
        </SafeAreaView>

        <DeleteModal
          closeModal={closeModal}
          onpress={DeletePurchaseOrder}
          visibel={DeletmodalVisible}
        />
        <View style={[GLOBALSTYLE.cardView, {opacity: modalVisible ? 0.6 : 1}]}>
          <View style={[GLOBALSTYLE.rowView]}>
            {item.clients.client_name && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Client Name</Text>
                <Text style={GLOBALSTYLE.text}>{item.clients.client_name}</Text>
              </View>
            )}
            {item.resources[0] !== undefined &&
              item.resources[0].fname &&
              item.resources[0].lname && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Resource Name</Text>
                  <Text style={GLOBALSTYLE.text}>
                    {item.resources[0].fname} {item.resources[0].lname}
                  </Text>
                </View>
              )}
          </View>
          <View style={GLOBALSTYLE.rowView}>
            {item.order_number && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Order Number</Text>
                <Text style={GLOBALSTYLE.text}>{item.order_number}</Text>
              </View>
            )}

            {item.pdf_file && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Pdf File</Text>
                <TouchableOpacity
                  onPress={() => {
                    setModalVisible(true);
                    setPdfData(item.pdf_file);
                    // console.log('----VIEW CLIKED!----');
                  }}>
                  <Text style={[GLOBALSTYLE.text, {color: COLORS.lightBlue}]}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={GLOBALSTYLE.rowView}>
            {item.start_date && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Start Date</Text>
                <Text style={GLOBALSTYLE.text}>{item.start_date}</Text>
              </View>
            )}

            {item.end_date && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>End Date</Text>
                <Text style={GLOBALSTYLE.text}>{item.end_date}</Text>
              </View>
            )}
          </View>
          <View style={styles.upperViewStyle}>
            <View style={[styles.innerViewStyle]}>
              <SmallButton
                color={COLORS.lightBlue}
                title={'Edit'}
                onPressFunction={() => {
                  editPurchaseOrder(item);
                }}
              />
            </View>
            <View style={[styles.innerViewStyle]}>
              <SmallButton
                color={COLORS.red}
                title={'Delete'}
                onPressFunction={() => {
                  setDeletmodalVisible(true);
                }}
              />
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        edit
      />
    </View>
  );
}

export default PurchaseOrderList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  nameViewStyle: {
    width: '100%',
  },
  personViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  innerViewStyle: {
    flex: 1,
  },
  upperViewStyle: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  indicatorTextStyle: {
    color: COLORS.grey,
    fontSize: 14,
  },
  contentTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  modal: {
    backgroundColor: 'white',
    width: '80%',
    paddingHorizontal: 30,
    paddingVertical: 60,
    borderRadius: 5,
    shadowColor: '#c2c2a3',
    shadowOffset: {width: -2, height: 0},
    shadowOpacity: 25,
    elevation: 20,
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
  DeletBtn: {
    backgroundColor: '#ff4500',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    fontSize: 25,
    color: 'white',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
});
