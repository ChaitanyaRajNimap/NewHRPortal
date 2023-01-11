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

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const AddClientAgreement = ({navigation}) => {
  const [formData, dispatcher] = useReducer();
  const [clientList, setClientList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [agreementTypeList, setAgreementTypeList] = useState([]);
  const [openStartDatePicker, setStartOpenDatePicer] = useState(false);
  const [openEndDatePicker, setEndOpenDatePicer] = useState(false);

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
});
