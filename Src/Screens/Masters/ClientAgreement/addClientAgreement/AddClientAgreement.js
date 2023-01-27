import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LogBox,
} from 'react-native';
import {
  getResources,
  getClient,
  addClientAgreement,
} from '../../../../Redux/Actions/ClientAgreementAction';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../Constants/Theme';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {Dropdown} from 'react-native-element-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';
import validation from '../../../../Util/helper';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';
import {initialState, reducer} from './AddClientAgreementFormData';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const AddClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);
  console.log('reducerdata from Add Client------->', reducerData);
  // console.log(
  //   'reducerdata.getClientData from Add Client------->',
  //   reducerData.getClientData,
  // );
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [openResource, setOpenResource] = useState(false);
  const [valueResource, setValueResource] = useState(null);
  const [itemsResource, setItemsResource] = useState([]);

  const [openAgreementType, setOpenAgreementType] = useState(false);
  const [valueAgreementType, setValueAgreementType] = useState(null);
  const [itemsAgreementType, setItemsAgreementType] = useState([
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
  ]);

  const [formData, dispatcher] = useReducer(reducer, initialState);
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
    let fDate =
      tempDate.getDate() +
      '/' +
      Number(tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    //console.log(fDate)
    return fDate;
  };

  //Covert to send in post req
  const convertDateToSend = value => {
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

    return [year, month, day].join('-');
  };

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
    // console.log('onStartDateSelected--------------->');
  }

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

  function showStartDatePicker() {
    // console.log('Start Date Picker Opened!!');
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
    setOpen(false);
    setOpenResource(false);
    setOpenAgreementType(false);
  }

  function showEndDatePicker() {
    // console.log('END Date Picker Opened!!');
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
    setOpen(false);
    setOpenResource(false);
    setOpenAgreementType(false);
  }

  //For closing other dropdowns
  const onClientOpen = useCallback(() => {
    setOpenResource(false);
    setOpenAgreementType(false);
  }, []);

  const onResourceOpen = useCallback(() => {
    setOpen(false);
    setOpenAgreementType(false);
  }, []);

  const onAgreementTypeOpen = useCallback(() => {
    setOpen(false);
    setOpenResource(false);
  }, []);

  //For client name
  useEffect(() => {
    if (reducerData.getClientData != null) {
      let newArray = [];
      for (let i of reducerData.getClientData) {
        let item;
        if (i.client_name) {
          if (i.client_name !== null) {
            item = {id: i.id, label: i.client_name, value: i.id};
          }
          newArray.push(item);
        }
      }
      setItems(newArray);
    }
  }, [reducerData.getClientData]);

  //For resources
  useEffect(() => {
    if (reducerData.getResorceData != null) {
      let newArray = [];
      for (let i of reducerData.getResorceData) {
        let item;
        if (i.resources !== null) {
          item = {
            id: i.id,
            label: `${i.fname} ${i.lname}`,
            value: i.id,
            fname: i.fname,
            lname: i.lname,
          };
        }
        newArray.push(item);
      }
      setItemsResource(newArray);
    }
  }, [reducerData.getResorceData]);

  const selectAgreement = async (fileName, Error) => {
    try {
      const file = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.docx,
          DocumentPicker.types.doc,
        ],
      });

      // console.log('FILE : ', file);
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

  const convertClientAgreement = data => {
    //Format data to post/add client agreement
    let dataToSend = {
      // agreement: data.agreementType,
      // client: {
      //   client_name: data.client.client_name,
      //   id: data.client.id,
      // },
      client_id: data.client.id,
      // created_at: new Date().toISOString(),
      // deleted_at: null,
      description: 'Adding new client agreement',
      end_date: data.endDate,
      // id: null,
      // msa: data.agreementType === 'msa' ? 'msa' : null,
      // pdf_file: [data.agreement.uri],
      pdf_file: data.agreement,
      // po: data.agreementType === 'po' ? 'po' : null,
      resource_id: data.resource.id,
      // resources: [
      //   {
      //     clientAgreement_resource: {
      //       clientAgreementId: null,
      //       resourceId: data.resource.id,
      //     },
      //     fname: data.resource.fname,
      //     id: data.resource.id,
      //     lname: data.resource.lname,
      //   },
      // ],
      // sow: data.agreementType === 'sow' ? 'sow' : null,
      start_date: data.startDate,
      title: 'Add new client agreement',
      // updated_at: '',
    };

    return dataToSend;
  };

  const onSubmit = () => {
    const clientError = validation.validateField(formData.client);
    const resourceError = validation.validateField(formData.resource);
    const agreementTypeError = validation.validateField(formData.agreementType);
    const startDateError = validation.validateField(formData.startDate);
    const endDateError = validation.validateField(formData.endDate);
    const agreementError = validation.validatefile(formData.agreement?.uri);

    if (
      clientError ||
      resourceError ||
      agreementTypeError ||
      startDateError ||
      endDateError ||
      agreementError
    ) {
      dispatcher({type: 'clientError', payload: clientError});
      dispatcher({type: 'resourceError', payload: resourceError});
      dispatcher({type: 'agreementTypeError', payload: agreementTypeError});
      dispatcher({type: 'startDateError', payload: startDateError});
      dispatcher({type: 'endDateError', payload: endDateError});
      dispatcher({type: 'agreementError', payload: agreementError});
      return;
    }

    dispatcher({type: 'clientError', payload: null});
    dispatcher({type: 'resourceError', payload: null});
    dispatcher({type: 'agreementTypeError', payload: null});
    dispatcher({type: 'startDateError', payload: null});
    dispatcher({type: 'endDateError', payload: null});
    dispatcher({type: 'agreementError', payload: null});

    console.log('FORMDATA -------->', formData);
    let data = convertClientAgreement(formData);

    console.log('##DATA##', data);

    dispatch(addClientAgreement(data, navigation));
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Client Agreement" />
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
                      setValue(item.value);
                      setOpen(false);
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
              open={open}
              onOpen={onClientOpen}
              value={value}
              items={items}
              setOpen={setOpen}
              setItems={setItems}
            />
            {formData.clientError !== null && (
              <Text style={styles.errorText}>{formData.clientError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <DropDownPicker
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              placeholder="Resource"
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                // console.log('Resource ITEM :- ', item);
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setValueResource(item.value);
                      setOpenResource(false);
                      dispatcher({
                        type: 'resource',
                        // payload: item.value,
                        payload: {
                          fname: item.fname,
                          id: item.value,
                          lname: item.lname,
                        },
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
              open={openResource}
              onOpen={onResourceOpen}
              value={valueResource}
              items={itemsResource}
              setOpen={setOpenResource}
              setItems={setItemsResource}
            />
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
                      setValueAgreementType(item.value);
                      setOpenAgreementType(false);
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
              open={openAgreementType}
              onOpen={onAgreementTypeOpen}
              value={valueAgreementType}
              items={itemsAgreementType}
              setOpen={setOpenAgreementType}
              setItems={setItemsAgreementType}
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

export default AddClientAgreement;

const styles = StyleSheet.create({
  // rootContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // textStyle: {
  //   fontSize: 25,
  //   color: '#000',
  // },
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
    // width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    // margin: 10,
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
