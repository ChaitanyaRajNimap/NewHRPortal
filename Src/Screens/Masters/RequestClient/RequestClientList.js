import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import SmallButton from '../../../Components/SmallButton';
import DeleteModal from '../../../Components/DeleteModal';
import AddrequestClient from './AddrequestClient';

function RequestClientList({data, deleteRequestClient, navigation}) {
  const [DeletmodalVisible, setDeletmodalVisible] = useState(false);
  const [modalVisible, setmodalVisible] = useState(false);

  //.........................................FUNCTION FOR CLOSING MODAL......................................//
  const closeModal = () => {
    // console.log(modalVisible,"modalVisible")
    setDeletmodalVisible(false);
  };

  //.........................................FUNCTION FOR ACCEPT BUTTON MODAL......................................//
  const closeAcceptmodal = () => {
    // console.log(modalVisible,"modalclosed")
    setmodalVisible(false);
  };

  //.........................................FUNCTION FOR RENDERING FLATLIST DATA......................................//
  const _renderItem = ({item}) => {
    const DeletRequestClient = () => {
      console.log('DeleteClientCalled');
      deleteRequestClient(item.id), setDeletmodalVisible(!DeletmodalVisible);
    };
    return (
      <>
        {/* //...............................DeleteModal MODAL FOR REQUEST CLIENT DATA.........................// */}
        <DeleteModal
          closeModal={closeModal}
          onpress={DeletRequestClient}
          visibel={DeletmodalVisible}
        />
        {/* //...............................ADD OR ACCEPT MODAL IN REQUEST CLIENT DATA.........................// */}
        <AddrequestClient
          visibel={modalVisible}
          id={item.id}
          closeAcceptmodal={closeAcceptmodal}
        />
        <View style={[GLOBALSTYLE.cardView]}>
          <View style={GLOBALSTYLE.columnView}>
            {item.company_name && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Company Name</Text>
                <Text style={GLOBALSTYLE.text}>{item.company_name}</Text>
              </View>
            )}

            {item.finance_name && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Finance Name</Text>
                <Text style={GLOBALSTYLE.text}>{item.finance_name}</Text>
              </View>
            )}
          </View>

          <View style={GLOBALSTYLE.columnView}>
            {item.finance_email && (
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Finance Email</Text>
                <Text style={GLOBALSTYLE.text}>{item.finance_email}</Text>
              </View>
            )}
            <View style={GLOBALSTYLE.rowView}>
              {item.finance_contact_number && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Finance Number</Text>
                  <Text style={GLOBALSTYLE.text}>
                    {item.finance_contact_number}
                  </Text>
                </View>
              )}

              {item.nationality && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Nationality</Text>
                  <Text style={GLOBALSTYLE.text}>{item.nationality}</Text>
                </View>
              )}
            </View>
            <View style={GLOBALSTYLE.columnView}>
              {item.pan && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Tan Number</Text>
                  <Text style={GLOBALSTYLE.text}>{item.pan}</Text>
                </View>
              )}
              {item.pan && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Pan Number</Text>
                  <Text style={GLOBALSTYLE.text}>{item.tan}</Text>
                </View>
              )}
              {item.gst && (
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>gst</Text>
                  <Text style={GLOBALSTYLE.text}>{item.gst}</Text>
                </View>
              )}
            </View>
            <View style={styles.upperViewStyle}>
              <View style={[styles.innerViewStyle]}>
                <SmallButton
                  color={COLORS.lightgreen}
                  title={'Aceept'}
                  onPressFunction={() => {
                    setmodalVisible(true);
                  }}
                />
              </View>
              <View style={[styles.innerViewStyle]}>
                <SmallButton
                  color={COLORS.red}
                  title={'Reject'}
                  onPressFunction={() => {
                    setDeletmodalVisible(true);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList data={data} renderItem={_renderItem} edit />
    </View>
  );
}

export default RequestClientList;

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
  modalContainer: {
    // flex:1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 150,
  },
  absolute: {
    width: '50%',
    height: '90%',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

  DeletBtn: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  DeletBtn1: {
    backgroundColor: COLORS.lightgreen,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  DeletBtn3: {
    backgroundColor: COLORS.grey,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  modal: {
    backgroundColor: 'white',
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 60,
    borderRadius: 10,
    borderColor: '#ccccb3',
    shadowColor: 'black',
    shadowOffset: {width: 20, height: 20},
    shadowOpacity: 0.5,
    elevation: 25,
    zIndex: 1,
  },
  cancelBtn: {
    backgroundColor: '#707070',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10,
    color: 'white',
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    fontSize: 25,
    width: '100%',
    color: 'white',
    borderRadius: 5,
  },
  blurViewStyle: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  },

  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderColor: '#fff',
    zIndex: 100,
  },
  dropDownContainerStyle: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 4,
    borderColor: '#fff',
  },
});
