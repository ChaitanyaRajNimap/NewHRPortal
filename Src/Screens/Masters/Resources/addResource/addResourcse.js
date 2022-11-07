import React, {useEffect, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../Constants/Theme';
import {fetchVenders} from '../../Vendor/vendor/vendorServices';
import {fetchTechnology} from './addResourceServices';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const initalState = {
  vendor: null,
  firstName: null,
  lastName: null,
  mobile: null,
  personalEmail: null,
  officailemail: null,
  primarySkill: null,
  secondarySkill: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'vendor':
      return {
        ...state,
        vendor: action.payload,
      };
    case 'firstname':
      return {
        ...state,
        firstName: action.payload,
      };
    case 'lastname':
      return {
        ...state,
        lastName: action.payload,
      };
    case 'mobile':
      return {
        ...state,
        mobile: action.payload,
      };
    case 'personalEmail':
      return {
        ...state,
        personalEmail: action.payload,
      };
    case 'officialEmail':
      return {
        ...state,
        officailemail: action.payload,
      };
    case 'primarySkill':
      return {
        ...state,
        primarySkill: action.payload,
      };
    case 'secondarySkill':
      return {
        ...state,
        secondarySkill: action.payload,
      };
    default:
      return state;
  }
};

const AddResource = () => {
  const dispatch = useDispatch();

  const [formData, dispatcher] = useReducer(reducer, initalState);
  const [venderList, setVenderList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [vendorOpen, setVendorOpen] = useState(false);
  const [primarySkillOpen, setPrimarySkillOpen] = useState(false);
  const [secondarySkillOpen, setSecondarySkillOpen] = useState(false);

  const {vendor, technology} = useSelector(state => ({
    vendor: state.vendor,
    technology: state.technology,
  }));

  console.log(technology);
  const {vendorError, vendorSuccess, vendorRequest} = vendor;
  const {technologyError, technologySuccess, technologyRequest} = technology;

  useEffect(() => {
    if (vendorSuccess) {
      const listOptions = vendorSuccess?.data?.vendors?.map(item => {
        return {label: item.company_name, value: item.id};
      });
      setVenderList(listOptions);
    }
  }, [vendorSuccess]);

  useEffect(() => {
    if (technologySuccess) {
      const listOptions = technologySuccess?.data?.technologies?.map(item => {
        return {label: item.technology, value: item.id};
      });
      setTechnologyList(listOptions);
    }
  }, [technologySuccess]);

  useEffect(() => {
    dispatch(fetchVenders());
    dispatch(fetchTechnology());
  }, []);

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.conatiner}>
        <CustomNavigationBar back={true} headername="Add Resource" />
        <ScrollView
          style={{flexGrow: 1}}
          nestedScrollEnabled={true}
          contentContainerStyle={{flex: 1}}>
          <View style={styles.formContainer}>
            <DropDownPicker
              style={styles.dropdownViewStyle}
              placeholder="Select Resource"
              placeholderStyle={{color: 'gray'}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatcher({type: 'vendor', payload: item.value});
                      setVendorOpen(false);
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={vendorOpen}
              value={formData.vendor}
              items={venderList}
              setOpen={setVendorOpen}
              setItems={setVenderList}
            />
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="First Name"
              placeholderTextColor={'gray'}
              value={formData.firstName}
              onChangeText={text => {
                dispatcher({type: 'firstname', payload: text});
              }}
            />
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Last Name"
              placeholderTextColor={'gray'}
              value={formData.lastName}
              onChangeText={text => {
                dispatcher({type: 'lastname', payload: text});
              }}
            />
            <View style={styles.verticalSpace} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.textInputIconView}>
                <FontAwesome name="phone" color={COLORS.blue} size={20} />
              </View>
              <TextInput
                style={[styles.textInputStyle, {flex: 1}]}
                placeholder="Mobile"
                placeholderTextColor={'gray'}
                value={formData.lastName}
                onChangeText={text => {
                  dispatcher({type: 'mobile', payload: text});
                }}
              />
            </View>
            <View style={styles.verticalSpace} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.textInputIconView}>
                <MaterialCommunityIcons
                  name="email-outline"
                  color={COLORS.blue}
                  size={20}
                />
              </View>
              <TextInput
                style={[styles.textInputStyle, {flex: 1}]}
                placeholder="Personal Email Id"
                placeholderTextColor={'gray'}
                value={formData.lastName}
                onChangeText={text => {
                  dispatcher({type: 'personalEmail', payload: text});
                }}
              />
            </View>
            <View style={styles.verticalSpace} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.textInputIconView}>
                <MaterialCommunityIcons
                  name="email-outline"
                  color={COLORS.blue}
                  size={20}
                />
              </View>
              <TextInput
                style={[styles.textInputStyle, {flex: 1}]}
                placeholder="Official Email Id"
                placeholderTextColor={'gray'}
                value={formData.lastName}
                onChangeText={text => {
                  dispatcher({type: 'officialEmail', payload: text});
                }}
              />
            </View>
            <View style={styles.verticalSpace} />
            <DropDownPicker
              style={styles.dropdownViewStyle}
              placeholder="Select Resource"
              placeholderStyle={{color: 'gray'}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              zIndex={2000}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatcher({type: 'primarySkill', payload: item.value});
                      setPrimarySkillOpen(false);
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={primarySkillOpen}
              value={formData.primarySkill}
              items={technologyList}
              setOpen={setPrimarySkillOpen}
              setItems={setTechnologyList}
            />
            <View style={styles.verticalSpace} />
            <DropDownPicker
              style={styles.dropdownViewStyle}
              placeholder="Select Resource"
              placeholderStyle={{color: 'gray'}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              zIndex={0}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      dispatcher({type: 'secondarySkill', payload: item.value});
                      setSecondarySkillOpen(false);
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={secondarySkillOpen}
              value={formData.secondarySkill}
              items={technologyList}
              setOpen={setSecondarySkillOpen}
              setItems={setTechnologyList}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  conatiner: {
    flex: 1,
  },
  verticalSpace: {
    height: 16,
  },
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  dropdownViewStyle: {
    backgroundColor: COLORS.white,
    marginHorizontal: 20,
    alignSelf: 'center',
    borderColor: COLORS.white,
  },
  dropDownContainerStyle: {
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: COLORS.white,
    height: 400,
  },
  cellStyle: {
    padding: 8,
    marginVertical: 4,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cellTextStyle: {
    color: COLORS.black,
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  textInputStyle: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInputIconView: {
    height: 48,
    width: 48,
    borderRadius: 8,
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddResource;
