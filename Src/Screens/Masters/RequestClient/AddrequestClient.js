import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import {COLORS} from '../../../Constants/Theme';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DropDownPicker from 'react-native-dropdown-picker';
import {BlurView} from '@react-native-community/blur';
import validation from '../../../Util/helper';
import {
  reducer,
  initalState,
} from './UpdateRequestclient/RequestClientformData';
import {useSelector, useDispatch} from 'react-redux';
import {
  AddRequestClients,
  submitRequestClients,
} from '../../../Redux/Actions/RequestCllientAction';
import NavigationServices from '../../../Navigation/Rootroute/navigation_reference';
import {useNavigation} from '@react-navigation/native';

export default function AddrequestClient({
  id,
  closeAcceptmodal,
  visibel,
  navigation,
}) {
  const dispatch = useDispatch();
  const reducerdata = useSelector(state => state.RequestClientReducer);
  const [openAdd, setOpenAdd] = useState(false);
  const [formData, dispatcher] = useReducer(reducer, initalState);
  const [PreviousclientValue, setPreviousclientValue] = useState(null);
  const [PreviousclientItems, setPreviousclientItem] = useState([]);
  const [openDateInvoice, setopenDateInvoice] = useState(true);
  const [openDateInvoiceItems, setopenDateInvoiceItems] = useState([
    {label: '1st of Month', value: '1', id: 1},
    {label: '15th of Month', value: '2', id: 2},
    {label: '30th of Month', value: '3', id: 3},
  ]);
  const [openDateInvoiceValue, setopenDateInvoiceValue] = useState(null);
  const [creditperiod, setCreditperiod] = useState(null);
  const [showAdd, setshowAdd] = useState(true);
  console.log('showaddd', showAdd);

  // console.log(PreviousclientItems,PreviousclientValue)

  //.........................................GET CLIENT NAMES FROM REDUCER......................................//
  const requestClintName = () => {
    if (reducerdata.Clientsname !== null) {
      let newArray = [];
      for (var i of reducerdata.Clientsname) {
        // console.log("iiiiiiiiiiiiiiiiiiiiiiiiiiii",i.client_name==null,i.id)
        let item;
        if (i.client_name) {
          if (i.client_name !== null) {
            item = {id: i.id, label: `${i.client_name}`, value: i.id};
          }
        }
        newArray.push(item);
      }
      setPreviousclientItem(newArray);
    }
  };

  useEffect(() => {
    requestClintName();
  }, [reducerdata.Clientsname]);

  //.........................................ONSUBMIT BUTTON FOR UPDATE REQUEST CLIENT......................................//
  const onSubmit = id => {
    const previousclientError = validation.validateField(
      formData.previousclient,
    );
    const dateofinvoiceError = validation.validateField(formData.dateofinvoice);
    const creditperiodError = validation.validateField(formData.creditperiod);

    if (previousclientError || dateofinvoiceError || creditperiodError) {
      dispatcher({type: 'previousclientError', payload: previousclientError});
      dispatcher({type: 'dateofinvoiceError', payload: dateofinvoiceError});
      dispatcher({type: 'creditperiodError', payload: creditperiodError});
      return;
    }

    dispatcher({type: 'previousclientError', payload: null});
    dispatcher({type: 'dateofinvoiceError', payload: null});
    dispatcher({type: 'creditperiodError', payload: null});

    console.log('formData', formData);

    const newdata = {
      client_id: formData.previousclient.id.toString(),
      client_name: formData.previousclient.client_name.toString(),
      credit_period: formData.creditperiod.creditperiod.toString(),
      id: Number(id),
      invoice_date: formData.dateofinvoice.Invoice_Value.toString(),
    };
    dispatch(submitRequestClients(newdata, navigation, id));
  };
  //.........................................ADD SUBMIT BUTTON FOR ADD REQUEST CLIENT......................................//
  const Addsubmit = id => {
    console.log('closssssssssssssssssssssssss', closeAcceptmodal);
    const dateofinvoiceError = validation.validateField(formData.dateofinvoice);
    const creditperiodError = validation.validateField(formData.creditperiod);

    if (dateofinvoiceError || creditperiodError) {
      dispatcher({type: 'dateofinvoiceError', payload: dateofinvoiceError});
      dispatcher({type: 'creditperiodError', payload: creditperiodError});
      return;
    }
    dispatcher({type: 'dateofinvoiceError', payload: null});
    dispatcher({type: 'creditperiodError', payload: null});
    const AddNewData = {
      credit_period: formData.creditperiod.creditperiod.toString(),
      id: Number(id),
      invoice_date: formData.dateofinvoice.Invoice_Value.toString(),
    };
    console.log('diffeeeeeeeeeeeeeeeeeeeeeeeee dispatch');
    dispatch(AddRequestClients(AddNewData, navigation, id));
  };

  //.....................................FUNCTION FOR CLEAR FIELDS OF DROPDOWN......................................//
  const AddBtn = () => {
    setshowAdd(false);
    setopenDateInvoiceValue('');
    setPreviousclientValue('');
    setCreditperiod('');
  };
  //........................................FUNCTION FOR CLEAR FIELDS OF DROPDOWN......................................//
  const update = () => {
    setshowAdd(true);
    setopenDateInvoiceValue('');
    setCreditperiod('');
  };

  //.......................................FUNCTION FOR SET CREDIT PERIOD...........................................//

  const Creditperiod = text => {
    // console.log('texttttttttttttttttttt', text);
    setCreditperiod(text);
    {
      dispatcher({type: 'creditperiod', payload: {creditperiod: text}});
    }
  };

  return (
    <SafeAreaView style={[GLOBALSTYLE.mainContainer]}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
        <Modal animationType="fade" transparent={true} visible={visibel}>
          <View style={styles.modalContainer}>
            <BlurView blurType="light" blurAmount={30} style={styles.blur}>
              <View style={[styles.modal, {height: showAdd ? '90%' : '90%'}]}>
                <View>
                  <AntDesign
                    name="warning"
                    size={70}
                    color="#ff3333"
                    style={{fontWeight: 'bold', textAlign: 'center'}}
                  />
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 17,
                      color: 'black',
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    YOU ARE SURE
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 17,
                      marginTop: 10,
                      fontWeight: 'bold',
                    }}>
                    are you sure you want to delete ?
                  </Text>
                </View>
                <View style={[styles.buttonContainer, {marginTop: 10}]}>
                  <TouchableOpacity style={styles.DeletBtn} onPress={AddBtn}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Add
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.DeletBtn1} onPress={update}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      update
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.DeletBtn3}
                    onPress={closeAcceptmodal}>
                    <Text
                      style={{
                        color: COLORS.white,
                        fontSize: 18,
                        fontWeight: 'bold',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                </View>
                <View>
                  {showAdd ? (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Update Client
                    </Text>
                  ) : (
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 20,
                        marginTop: 10,
                        fontWeight: 'bold',
                        color: 'black',
                      }}>
                      Add Client
                    </Text>
                  )}
                </View>
                <View>
                  <View>
                    {showAdd ? (
                      <View>
                        <DropDownPicker
                          style={[styles.dropdownViewStyle, {marginTop: 25}]}
                          placeholder="Previous Client Name*"
                          dropDownContainerStyle={styles.dropDownContainerStyle}
                          listMode="FLATLIST"
                          renderListItem={({item}) => {
                            // console.log('rendderCliennnt', item);
                            return (
                              <TouchableOpacity
                                onPress={() => {
                                  setPreviousclientValue(item.value);
                                  setOpenAdd(false);
                                  dispatcher({
                                    type: 'previousclient',
                                    payload: {
                                      client_name: item.label,
                                      id: item.id,
                                    },
                                  });
                                  dispatcher({
                                    type: 'previousclientError',
                                    payload: null,
                                  });
                                }}
                                style={styles.cellStyle}>
                                <Text style={styles.cellTextStyle}>
                                  {item.label}
                                </Text>
                              </TouchableOpacity>
                            );
                          }}
                          open={openAdd}
                          setOpen={setOpenAdd}
                          value={PreviousclientValue}
                          items={PreviousclientItems}
                          setItems={setPreviousclientItem}
                        />
                        {formData.previousclientError !== null && (
                          <Text style={styles.errorText}>
                            {formData.previousclientError}
                          </Text>
                        )}
                      </View>
                    ) : (
                      ''
                    )}
                  </View>
                  <View>
                    <DropDownPicker
                      style={[styles.dropdownViewStyle]}
                      placeholder="Date Of Invoice"
                      dropDownContainerStyle={styles.dropDownContainerStyle}
                      listMode="FLATLIST"
                      renderListItem={({item}) => {
                        // console.log('rendderCliennnt', item);
                        return (
                          <TouchableOpacity
                            onPress={() => {
                              setopenDateInvoiceValue(item.value);
                              setopenDateInvoice(false);
                              dispatcher({
                                type: 'dateofinvoice',
                                payload: {
                                  Invoice_Value: item.label,
                                  id: item.id,
                                },
                              });
                              dispatcher({
                                type: 'dateofinvoiceError',
                                payload: validation.validateField(item.value),
                              });
                            }}
                            style={styles.cellStyle}>
                            <Text style={styles.cellTextStyle}>
                              {item.label}
                            </Text>
                          </TouchableOpacity>
                        );
                      }}
                      open={openDateInvoice}
                      setOpen={setopenDateInvoice}
                      value={openDateInvoiceValue}
                      items={openDateInvoiceItems}
                      setItems={setopenDateInvoiceItems}
                    />
                  </View>
                  {formData.dateofinvoiceError !== null && (
                    <Text style={styles.errorText}>
                      {formData.dateofinvoiceError}
                    </Text>
                  )}
                  <View style={{marginTop: 25}}>
                    <TextInput
                      style={styles.textinput}
                      value={creditperiod}
                      onChangeText={data => Creditperiod(data)}
                      placeholder="Credit-Period"
                    />
                    {formData.creditperiodError !== null && (
                      <Text style={styles.errorText}>
                        {formData.creditperiodError}
                      </Text>
                    )}
                  </View>
                  <View>
                    {showAdd ? (
                      <View>
                        <TouchableOpacity
                          style={styles.DeletBtn}
                          onPress={() => {
                            onSubmit(id);
                          }}>
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: 18,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            Update
                          </Text>
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View>
                        <TouchableOpacity
                          style={styles.DeletBtn}
                          onPress={() => {
                            Addsubmit(id);
                          }}>
                          <Text
                            style={{
                              color: COLORS.white,
                              fontSize: 18,
                              fontWeight: 'bold',
                              textAlign: 'center',
                            }}>
                            Add
                          </Text>
                        </TouchableOpacity>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            </BlurView>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  DeletBtn: {
    backgroundColor: COLORS.yellow,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },

  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  DeletBtn1: {
    backgroundColor: COLORS.lightgreen,
    paddingHorizontal: 22,
    paddingVertical: 15,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
  },
  dropDownContainerStyle: {
    marginVertical: 4,
    marginHorizontal: 10,
    paddingVertical: 10,
    borderColor: '#fff',
  },
  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 0,
    marginHorizontal: 10,
    alignSelf: 'center',
    borderColor: '#fff',
    zIndex: 100,
  },
  textinput: {
    borderColor: '#fff',
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 'bold',
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
    width: '50%',
    paddingHorizontal: 30,
    paddingVertical: 60,
    shadowColor: '#c2c2a3',
    shadowOffset: {width: -26, height: 0},
    shadowOpacity: 10,
    elevation: 10,
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

  cellStyle: {
    padding: 8,
    marginVertical: 4,
  },
  cellTextStyle: {
    color: '#000',
    fontSize: 16,
    textTransform: 'capitalize',
    fontWeight: '600',
    backgroundColor: '#fff',
  },
});
