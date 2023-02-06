import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import {
  getResources,
  getClient,
  addClientAgreement,
} from '../../../../Redux/Actions/ClientAgreementAction';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import DocumentPicker from 'react-native-document-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import validation from '../../../../Util/helper';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {initialState, reducer} from './AddClientAgreementFormData';
import axios from 'axios';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const AddClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);
  console.log('reducerdata from Add Client------->', reducerData);

  const [formData, dispatcher] = useReducer(reducer, initialState);

  const [clientOpen, setClientOpen] = useState(false);
  const [clientValue, setClientValue] = useState(null);
  const [clientItems, setClientItems] = useState([]);

  const [resourceOpen, setResourceOpen] = useState(false);
  const [resourceValue, setResourceValue] = useState([]);
  const [resourceItems, setResourceItems] = useState([]);

  const [agreementTypeOpen, setAgreementTypeOpen] = useState(false);
  const [agreementTypeValue, setAgreementTypeValue] = useState(null);
  const [agreementTypeItems, setAgreementTypeItems] = useState([
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
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
    setClientOpen(false);
    setResourceOpen(false);
    setAgreementTypeOpen(false);
  }

  function showEndDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
    setClientOpen(false);
    setResourceOpen(false);
    setAgreementTypeOpen(false);
  }

  //For closing other dropdowns
  const onClientOpen = useCallback(() => {
    setResourceOpen(false);
    setAgreementTypeOpen(false);
  }, []);

  const onResourceOpen = useCallback(() => {
    setClientOpen(false);
    setAgreementTypeOpen(false);
  }, []);

  const onAgreementTypeOpen = useCallback(() => {
    setClientOpen(false);
    setResourceOpen(false);
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
      setClientItems(newArray);
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
      setResourceItems(newArray);
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
    //For converting resource id array ti string array to send
    let resourcesArr = data.resource.map(id => id.toString());
    // console.log('resourcesArr : ', resourcesArr);
    //Format data to post/add client agreement
    let dataToSend = {
      client_id: data.client.id,
      start_date: data.startDate,
      end_date: data.endDate,
      title: 'Add New Client Agreement',
      description: 'Adding new client agreement',
      pdf_file: data.agreement,
      resource_id: resourcesArr,
    };

    return dataToSend;
  };

  const onSubmit = async () => {
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

    console.log('<--------- FORMDATA -------->', formData);
    let data = convertClientAgreement(formData);
    console.log('<---------# CONVERTED DATA #--------->', data);
    dispatch(addClientAgreement(data, navigation));

    // const fmData = new FormData();

    // fmData.append('data', JSON.stringify(data));
    // fmData.append('pdf_file', formData.agreement);

    // console.log('FMDATA=========>', fmData);

    // let resourcesArr = formData.resource.map(id => id.toString());

    // fmData.append('client_id', formData.client.id);
    // fmData.append('start_date', formData.startDate);
    // fmData.append('end_date', formData.endDate);
    // fmData.append('title', 'Add New Client Agreement');
    // fmData.append('description', 'Adding new client agreement');
    // fmData.append('pdf_file', formData.agreement);
    // fmData.append('resource_id', resourcesArr);

    // console.log('FMDATA=========>', fmData);

    // const boundary = '--------------------------125436698574584';

    // try {
    //   const response = await fetch(
    //     'http://144.91.79.237:8905/api/client-agreement',
    //     {
    //       method: 'POST',
    //       headers: {
    //         Authorization:
    //           'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJlbWFpbCI6InRlc3RAbmltYXBpbmZvdGVjaC5jb20iLCJpYXQiOjE2NzU2NjE5NzcsImV4cCI6MTY3NTc0ODM3N30.HekSNjk8MkowydNgGjRh7m0wx5bHAFoHyKn4PmqYQwM',
    //         'Content-Type': `multipart/form-data;`,
    //       },
    //       body: fmData,
    //     },
    //   );
    //   const responseJson = await response.json();
    //   console.log('ADD CLIENT AGREEMENT POST RESPONE ======> ', responseJson);
    // } catch (error) {
    //   console.error('ADD CLIENT AGREEMENT POST ERROR ======> ', error);
    // }
  };

  //For dispatching resources to formdata
  useEffect(() => {
    dispatcher({
      type: 'resource',
      payload: resourceValue,
    });
    dispatcher({
      type: 'resourceError',
      payload: null,
    });
  }, [resourceValue]);

  //For adding res if not selected before
  const addResIfNotPresent = (resVal, item) => {
    if (resVal) {
      if (resVal.includes(item.value)) {
        let index = resVal.indexOf(item.value);
        if (index > -1) {
          resVal.splice(index, 1);
        }
        return setResourceValue([...resourceValue]);
      } else {
        return setResourceValue([...resourceValue, item.value]);
      }
    }
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
                      setClientValue(item.value);
                      setClientOpen(false);
                      dispatcher({
                        type: 'client',
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
              open={clientOpen}
              onOpen={onClientOpen}
              value={clientValue}
              items={clientItems}
              setOpen={setClientOpen}
              setItems={setClientItems}
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
              multiple={true}
              mode="BADGE"
              // extendableBadgeContainer={true}
              badgeTextStyle={{color: '#000'}}
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      addResIfNotPresent(resourceValue, item);
                      setResourceOpen(false);
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={resourceOpen}
              onOpen={onResourceOpen}
              value={resourceValue}
              items={resourceItems}
              setOpen={setResourceOpen}
              setItems={setResourceItems}
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
                      setAgreementTypeValue(item.value);
                      setAgreementTypeOpen(false);
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
              open={agreementTypeOpen}
              onOpen={onAgreementTypeOpen}
              value={agreementTypeValue}
              items={agreementTypeItems}
              setOpen={setAgreementTypeOpen}
              setItems={setAgreementTypeItems}
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
                // fun();
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
  container: {flex: 1},
  verticalSpace: {height: 16},
  scrollViewStyle: {flex: 1},
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 25,
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
    marginHorizontal: 1,
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
    marginHorizontal: 1,
    backgroundColor: COLORS.whiteBlue,
  },
  submitBtnAligner: {
    marginHorizontal: 1,
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
