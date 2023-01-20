import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import DocumentPicker from 'react-native-document-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import validation from '../../../../Util/helper';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {initialState, reducer} from './EditClientAgreementFormData';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const EditClientAgreement = ({navigation}) => {
  //For getting data from ClientAgreementReducer
  const reducerData = useSelector(state => state.ClientAgreementReducer);
  console.log('reducerdata------->', reducerData);
  // console.log('reducerdata------->', reducerData.getClientData);

  const [formData, dispatcher] = useReducer(reducer, initialState);

  //For storing dropdown state
  const [open, setOpen] = useState({
    clientOpen: false,
    resourceOpen: false,
    agreementTypeOpen: false,
  });
  const [value, setValue] = useState({
    clientValue: null,
    resourceValue: null,
    agreementTypeValue: null,
  });
  const [items, setItems] = useState({
    clientItems: [],
    resourceItems: [],
    agreementTypeItems: [
      {
        value: 'msa',
        label: 'msa',
      },
      {
        value: 'po',
        label: 'po',
      },
      {
        value: 'sow',
        label: 'sow',
      },
    ],
  });
  //For storing date state
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  });
  const [datePicker, setDatePicker] = useState({
    startDatePicker: false,
    endDatePicker: false,
  });
  const [displayDate, setDisplayDate] = useState({
    startDate: 'Start Date',
    endDate: 'End Date',
  });

  const convertDate = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let month = '' + (tempDate.getMonth() + 1),
      day = '' + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('/');
  };

  //For storing start date in form data
  function onStartDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, startDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, startDate: convertDate(value)};
    });
    dispatcher({
      type: 'startDate',
      payload: convertDateToSend(value),
    });
    dispatcher({
      type: 'startDateError',
      payload: null,
    });
    console.log('onStartDateSelected--------------->');
  }

  //For storing end date in form data
  function onEndDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, endDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, endDate: convertDate(value)};
    });
    dispatcher({
      type: 'endDate',
      payload: convertDateToSend(value),
    });
    dispatcher({
      type: 'endDateError',
      payload: null,
    });
    // console.log('onEndDateSelected--------------->');
  }

  //For showing start date picker
  function showStartDatePicker() {
    console.log('Start Date Picker Opened!!');
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
  }

  //For showing end date picker
  function showEndDatePicker() {
    console.log('End Date Picker Opened!!');
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
  }

  //For client name
  //   useEffect(() => {
  //     if (reducerData.getClientData != null) {
  //       let newArray = [];
  //       for (let i of reducerData.getClientData) {
  //         let item;
  //         if (i.client_name) {
  //           if (i.client_name !== null) {
  //             item = {id: i.id, label: i.client_name, value: i.id};
  //           }
  //           newArray.push(item);
  //         }
  //       }
  //       setItems(newArray);
  //     }
  //   }, [reducerData.getClientData]);

  //For client name
  //   useEffect(() => {
  //     if (reducerData.getClientData != null) {
  //       let newArray = [];
  //       for (let i of reducerData.getClientData) {
  //         let item;
  //         if (i.client_name) {
  //           if (i.client_name !== null) {
  //             item = {id: i.id, label: i.client_name, value: i.id};
  //           }
  //           newArray.push(item);
  //         }
  //       }
  //       setItems(newArray);
  //     }
  //   }, [reducerData.getClientData]);

  //For resources
  //   useEffect(() => {
  //     if (reducerData.getResorceData != null) {
  //       let newArray = [];
  //       for (let i of reducerData.getResorceData) {
  //         let item;
  //         if (i.resources !== null) {
  //           item = {id: i.id, label: `${i.fname} ${i.lname}`, value: i.id};
  //         }
  //         newArray.push(item);
  //       }
  //       setItemsResource(newArray);
  //     }
  //   }, [reducerData.getResorceData]);

  //For resources
  //   useEffect(() => {
  //     if (reducerData.getResorceData != null) {
  //       let newArray = [];
  //       for (let i of reducerData.getResorceData) {
  //         let item;
  //         if (i.resources !== null) {
  //           item = {id: i.id, label: `${i.fname} ${i.lname}`, value: i.id};
  //         }
  //         newArray.push(item);
  //       }
  //       setItemsResource(newArray);
  //     }
  //   }, [reducerData.getResorceData]);

  const selectAgreement = async (fileName, Error) => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.docx,
          DocumentPicker.types.doc,
        ],
      });

      dispatcher({
        type: fileName,
        payload: {uri: file.uri, type: file.type, name: file.name},
      });

      dispatcher({
        type: Error,
        payload: validation.validatefile(file.uri),
      });

      if (file !== null) {
        Toast.showWithGravity(
          'File Selected Successfully',
          Toast.SHORT,
          Toast.BOTTOM,
        );
      }
    } catch (e) {
      Toast.showWithGravity(
        'File Not Selected Successfully',
        Toast.SHORT,
        Toast.BOTTOM,
      );
    }
  };

  const onSubmit = () => {
    const clientError = validation.validateField(formData.client);
    // const resourceError = validation.validateField(formData.resource);
    const agreementTypeError = validation.validateField(formData.agreementType);
    const startDateError = validation.validateField(formData.startDate);
    const endDateError = validation.validateField(formData.endDate);
    const agreementError = validation.validatefile(formData.agreement?.uri);

    if (
      clientError ||
      // resourceError ||
      agreementTypeError ||
      startDateError ||
      endDateError ||
      agreementError
    ) {
      dispatcher({type: 'clientError', payload: clientError});
      // dispatcher({type: 'resourceError', payload: resourceError});
      dispatcher({type: 'agreementTypeError', payload: agreementTypeError});
      dispatcher({type: 'startDateError', payload: startDateError});
      dispatcher({type: 'endDateError', payload: endDateError});
      dispatcher({type: 'agreementError', payload: agreementError});
      return;
    }

    dispatcher({type: 'clientError', payload: null});
    // dispatcher({type: 'resourceError', payload: null});
    dispatcher({type: 'agreementTypeError', payload: null});
    dispatcher({type: 'startDateError', payload: null});
    dispatcher({type: 'endDateError', payload: null});
    dispatcher({type: 'agreementError', payload: null});

    // let data = convertClientAgreement(formData);

    console.log(formData);

    // dispatch(addClientAgreement(formData, navigation));
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Edit Client Agreement" />
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.formContainer}>
            <DropDownPicker
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              placeholder="Client"
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setValue(prevValue => {
                        return {
                          ...prevValue,
                          clientValue: item.value,
                        };
                      });
                      setOpen(prevOpen => {
                        return {
                          ...prevOpen,
                          clientOpen: false,
                        };
                      });
                      dispatcher({
                        type: 'client',
                        // payload: item.value,
                        payload: {
                          client_name: item.label,
                          id: item.value,
                        },
                      });
                      dispatcher({
                        type: 'clientError',
                        payload: null,
                      });
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={open.clientOpen}
              value={value.clientValue}
              items={items.clientItems}
              setOpen={setOpen}
              setItems={setItems}
            />
            {formData.clientError !== null && (
              <Text style={styles.errorText}>{formData.clientError}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/* <DropDownPicker
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              placeholder="Resource"
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      //   setValueResource(item.value);
                      setValue(prevValue => {
                        return {
                          ...prevValue,
                          resourceValue: item.value,
                        };
                      });
                      //   setOpenResource(false);
                      setOpen(prevOpen => {
                        return {
                          ...prevOpen,
                          resourceOpen: false,
                        };
                      });
                      dispatcher({
                        type: 'resource',
                        payload: item.value,
                      });
                      dispatcher({
                        type: 'resourceError',
                        payload: null,
                      });
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={open.resourceOpen}
              value={value.resourceValue}
              items={items.resourceItems}
              setOpen={setOpen}
              setItems={setItems}
            /> */}
            {formData.resourceError !== null && (
              <Text style={styles.errorText}>{formData.resourceError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <DropDownPicker
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              placeholder="Agreement Type"
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      //   setValueAgreementType(item.value);
                      setValue(prevValue => {
                        return {
                          ...prevValue,
                          agreementTypeValue: item.value,
                        };
                      });
                      //   setOpenAgreementType(false);
                      setOpen(prevOpen => {
                        return {
                          ...prevOpen,
                          agreementTypeOpen: false,
                        };
                      });
                      dispatcher({
                        type: 'agreementType',
                        payload: item.value,
                      });
                      dispatcher({
                        type: 'agreementTypeError',
                        payload: null,
                      });
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={open.agreementTypeOpen}
              value={value.agreementTypeValue}
              items={items.agreementTypeItems}
              setOpen={setOpen}
              setItems={setItems}
            />
            {formData.agreementTypeError !== null && (
              <Text style={styles.errorText}>
                {formData.agreementTypeError}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.dateBtnStyle}
              onPress={showStartDatePicker}>
              <Text style={{color: COLORS.black}}>{displayDate.startDate}</Text>
              <FontAwesome
                name="calendar-o"
                size={20}
                style={{alignSelf: 'center', right: 30}}
              />
            </TouchableOpacity>
            {datePicker.startDatePicker === true ? (
              <DateTimePicker
                value={date.startDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onStartDateSelected}
              />
            ) : null}
            {formData.startDateError !== null && (
              <Text style={styles.errorText}>{formData.startDateError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.dateBtnStyle}
              onPress={showEndDatePicker}>
              <Text style={{color: COLORS.black}}>{displayDate.endDate}</Text>
              <FontAwesome
                name="calendar-o"
                size={20}
                style={{alignSelf: 'center', right: 30}}
              />
            </TouchableOpacity>
            {datePicker.endDatePicker === true ? (
              <DateTimePicker
                value={date.endDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onEndDateSelected}
                minimumDate={date.startDate}
              />
            ) : null}
            {formData.endDateError !== null && (
              <Text style={styles.errorText}>{formData.endDateError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={[styles.btnStyle, styles.uploadBtnAligner]}
              onPress={() => {
                selectAgreement('agreement', 'agreementError');
              }}>
              {/* <>
                <AntDesign name="upload" color={COLORS.blue} size={24} />
                <Text style={styles.uploadBtnTextStyle}>Upload SO/POW</Text>
              </> */}
              {formData.agreement !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.agreement?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>Upload SO/POW</Text>
                </>
              )}
            </TouchableOpacity>
            {formData.agreementError !== null && (
              <Text style={styles.errorText}>{formData.agreementError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={[styles.btnStyle, styles.submitBtnAligner]}
              onPress={() => {
                onSubmit();
              }}>
              <Text style={styles.submitBtnTextStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditClientAgreement;

const styles = StyleSheet.create({
  container: {flex: 1},
  verticalSpace: {height: 16},
  scrollViewStyle: {flex: 1},
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownViewStyle: {
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: COLORS.white,
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  dropDownContainerStyle: {
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: '#fff',
  },
  dropDownPlaceholderStyle: {
    color: 'gray',
    fontSize: 14,
  },
  dateBtnStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginHorizontal: 15,
    padding: 15,
  },
  cellStyle: {
    padding: 8,
    marginVertical: 4,
  },
  cellTextStyle: {
    color: '#000',
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  btnStyle: {
    height: 48,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadBtnTextStyle: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  dropDownAligner: {
    marginHorizontal: 15,
  },
  uploadBtnAligner: {
    marginHorizontal: 15,
  },
  submitBtnAligner: {
    marginHorizontal: 15,
  },
  submitBtnTextStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
});
