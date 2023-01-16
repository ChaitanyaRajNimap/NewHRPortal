import React, {useState, useEffect, useReducer} from 'react';
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
import {addClientAgreement} from '../../../../Redux/Actions/ClientAgreementAction';
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

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const AddClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);
  // console.log('reducerdata------->', reducerData.clientAgreementData);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([]);

  const [formData, dispatcher] = useReducer();
  const [clientList, setClientList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [agreementTypeList, setAgreementTypeList] = useState([]);
  const [openStartDatePicker, setStartOpenDatePicer] = useState(false);
  const [openEndDatePicker, setEndOpenDatePicer] = useState(false);
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    // startDate: '',
    // endDate: '',
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
      tempDate.getMonth() +
      1 +
      '/' +
      tempDate.getDate() +
      '/' +
      tempDate.getFullYear();
    //console.log(fDate)
    return fDate;
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
  }

  function showStartDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
  }

  function showEndDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
  }

  useEffect(() => {
    if (reducerData.clientAgreementData != null) {
      //For getting each clirnt record
      let newArray = [];
      //For getting each user only once
      let newIdsList = [];
      for (let i of reducerData.clientAgreementData) {
        // console.log(i.client_id);

        if (!newIdsList.some(o => o.client_id === i.client_id)) {
          newIdsList.push({...i});
        }
      }

      for (let i of newIdsList) {
        let item;
        // console.log(i);
        if (i.client) {
          if (i.client !== null) {
            item = {
              id: i.client.id,
              label: i.client.client_name,
              value: i.client.id,
            };
          }
          newArray.push(item);
        }
      }
      console.log('newIdsList : ', newIdsList);
      setItems(newArray);
    }
  }, [reducerData.clientAgreementData]);

  const selectResume = async (fileName, Error) => {
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

  return (
    // <View style={styles.rootContainer}>
    //   <Text style={styles.textStyle}>Add Client Agreement</Text>
    // </View>

    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Client Agreement" />
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.formContainer}>
            <DropDownPicker
              style={styles.dropdownViewStyle}
              placeholder="Client Name"
              placeholderStyle={{color: 'lightgray'}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setValue(item.value);
                      setOpen(false);
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setItems={setItems}
            />
            {/* <Dropdown
              data={clientList}
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Client Name"
              // value={formData.vendor}
              onChange={() => {}}
            /> */}
            {/* {formData.vendorError !== null && (
              <Text style={styles.errorText}>{formData.vendorError}</Text>
            )} */}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={resourceList}
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Resource"
              // value={formData.vendor}
              onChange={() => {}}
            />
            {/* {formData.vendorError !== null && (
              <Text style={styles.errorText}>{formData.vendorError}</Text>
            )} */}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={agreementTypeList}
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Agreement Type"
              // value={formData.vendor}
              onChange={() => {}}
            />
            {/* {formData.vendorError !== null && (
              <Text style={styles.errorText}>{formData.vendorError}</Text>
            )} */}
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
              />
            ) : null}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={[styles.btnStyle, styles.uploadBtnAligner]}
              onPress={() => {
                selectResume('resume', 'resumeError');
              }}>
              <>
                <AntDesign name="upload" color={COLORS.blue} size={24} />
                <Text style={styles.uploadBtnTextStyle}>Upload SO/POW</Text>
              </>
              {/* {formData.resume !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.resume?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>Upload SO/POW</Text>
                </>
              )} */}
            </TouchableOpacity>
            {/* {formData.resumeError !== null && (
              <Text style={styles.errorText}>{formData.resumeError}</Text>
            )} */}
            <View style={styles.verticalSpace} />
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
});
