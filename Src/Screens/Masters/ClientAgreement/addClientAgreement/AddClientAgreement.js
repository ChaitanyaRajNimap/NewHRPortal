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
import validation from '../../../../Util/helper';
import dayjs from 'dayjs';
import DateTimePicker from '@react-native-community/datetimepicker';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const AddClientAgreement = ({navigation}) => {
  const [formData, dispatcher] = useReducer();
  const [clientList, setClientList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [agreementTypeList, setAgreementTypeList] = useState([]);
  const [openStartDatePicker, setStartOpenDatePicer] = useState(false);
  const [openEndDatePicker, setEndOpenDatePicer] = useState(false);
  // const [date, setDate] = useState(new Date(Date.now()));
  // const [datePicker, setDatePicker] = useState(false);
  // const [displayDate, setDisplayDate] = useState('Select Date');
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
    // startDate: '',
    // endDate: '',
  });
  const [datePicker, setDatePicker] = useState(false);
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
    setDatePicker(false);
    setDate(prevDates => {
      return {...prevDates, startDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, startDate: convertDate(value)};
    });
  }

  function onEndDateSelected(event, value) {
    setDatePicker(false);
    setDate(prevDates => {
      return {...prevDates, endDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, endDate: convertDate(value)};
    });
  }

  function showDatePicker() {
    setDatePicker(true);
  }

  return (
    // <View style={styles.rootContainer}>
    //   <Text style={styles.textStyle}>Add Client Agreement</Text>
    // </View>

    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Client Agreement" />
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.formContainer}>
            <Dropdown
              data={clientList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Client Name"
              // value={formData.vendor}
              onChange={() => {}}
            />
            {/* {formData.vendorError !== null && (
              <Text style={styles.errorText}>{formData.vendorError}</Text>
            )} */}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={resourceList}
              style={styles.dropdownViewStyle}
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
              style={styles.dropdownViewStyle}
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
            <TouchableOpacity style={styles.btnStyle} onPress={showDatePicker}>
              <Text style={{color: COLORS.black}}>{displayDate.startDate}</Text>
              <FontAwesome
                name="calendar-o"
                size={20}
                style={{alignSelf: 'center', right: 30}}
              />
            </TouchableOpacity>
            {datePicker === true ? (
              <DateTimePicker
                value={date.startDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onStartDateSelected}
              />
            ) : null}
            <View style={styles.verticalSpace} />
            <TouchableOpacity style={styles.btnStyle} onPress={showDatePicker}>
              <Text style={{color: COLORS.black}}>{displayDate.endDate}</Text>
              <FontAwesome
                name="calendar-o"
                size={20}
                style={{alignSelf: 'center', right: 30}}
              />
            </TouchableOpacity>
            {datePicker === true ? (
              <DateTimePicker
                value={date.endDate}
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                is24Hour={true}
                onChange={onEndDateSelected}
              />
            ) : null}
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
    backgroundColor: COLORS.white,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: COLORS.white,
  },
  dropDownPlaceholderStyle: {
    color: 'gray',
    fontSize: 14,
  },
  btnStyle: {
    // width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 10,
    marginHorizontal: 15,
    padding: 15,
  },
});
