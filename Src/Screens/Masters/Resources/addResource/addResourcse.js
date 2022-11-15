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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../../../../Constants/Theme';
import {fetchVenders} from '../../Vendor/vendor/vendorServices';
import {fetchTechnology} from './addResourceServices';
import DocumentPicker from 'react-native-document-picker';
import DatePicker from 'react-native-date-picker';
import Toast from 'react-native-simple-toast';
import {Dropdown} from 'react-native-element-dropdown';
import validation from '../../../../Util/helper';
import {initalState, reducer} from './addResourcseFormData';
import dayjs from 'dayjs';

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

// const initalState = {
//   vendor: null,
//   firstName: null,
//   lastName: null,
//   mobile: null,
//   personalEmail: null,
//   officialEmail: null,
//   projectname: null,
//   primarySkill: null,
//   secondarySkill: null,
//   experience: null,
//   relationship: null,
//   alternativeContact: null,
//   residentLocality: null,
//   resume: null,
//   usaShift: null,
//   ukShift: null,
//   relocate: null,
//   contractStartDate: null,
//   contractEndDate: null,
//   contractFile: null,
//   checkList: null,
//   otherDocument: null,
//   passingYear: null,
//   panCard: null,
//   aadharCard: null,
//   pfForm: null,
//   cost: null,
//   vendorError: null,
//   firstNameError: null,
//   lastNameError: null,
//   mobileError: null,
//   personalEmailError: null,
//   officialEmailError: null,
//   primarySkillError: null,
//   secondarySkillError: null,
//   experienceError: null,
//   relationshipError: null,
//   alternativeContactError: null,
//   residentLocalityError: null,
//   resumeError: null,
//   usaShiftError: null,
//   ukShiftError: null,
//   relocateError: null,
//   contractStartDateError: null,
//   contractEndDateError: null,
//   contractFileError: null,
//   checkListError: null,
//   otherDocumentError: null,
//   passingYearError: null,
//   panCardError: null,
//   aadharCarderror: null,
//   pfFormError: null,
//   costError: null,
// };

// const reducer = (state, action) => {
//   switch (action.type) {
//     case 'vendor':
//       return {
//         ...state,
//         vendor: action.payload,
//       };
//     case 'firstname':
//       return {
//         ...state,
//         firstName: action.payload,
//       };
//     case 'lastname':
//       return {
//         ...state,
//         lastName: action.payload,
//       };
//     case 'mobile':
//       return {
//         ...state,
//         mobile: action.payload,
//       };
//     case 'personalEmail':
//       return {
//         ...state,
//         personalEmail: action.payload,
//       };
//     case 'officialEmail':
//       return {
//         ...state,
//         officialEmail: action.payload,
//       };
//     case 'projectname':
//       return {
//         ...state,
//         projectname: action.payload,
//       };
//     case 'primarySkill':
//       return {
//         ...state,
//         primarySkill: action.payload,
//       };
//     case 'secondarySkill':
//       return {
//         ...state,
//         secondarySkill: action.payload,
//       };
//     case 'experience':
//       return {
//         ...state,
//         experience: action.payload,
//       };
//     case 'relationship':
//       return {
//         ...state,
//         relationship: action.payload,
//       };
//     case 'alternativeContact':
//       return {
//         ...state,
//         alternativeContact: action.payload,
//       };
//     case 'residentLocality':
//       return {
//         ...state,
//         residentLocality: action.payload,
//       };
//     case 'resume':
//       return {
//         ...state,
//         resume: action.payload,
//       };
//     case 'usaShift':
//       return {
//         ...state,
//         usaShift: action.payload,
//       };
//     case 'ukShift':
//       return {
//         ...state,
//         ukShift: action.payload,
//       };
//     case 'relocate':
//       return {
//         ...state,
//         relocate: action.payload,
//       };
//     case 'contractStartDate':
//       return {
//         ...state,
//         contractStartDate: action.payload,
//       };
//     case 'contractEndDate':
//       return {
//         ...state,
//         contractEndDate: action.payload,
//       };
//     case 'contractFile':
//       return {
//         ...state,
//         contractFile: action.payload,
//       };
//     case 'checkList':
//       return {
//         ...state,
//         checkList: action.payload,
//       };
//     case 'otherDocument':
//       return {
//         ...state,
//         otherDocument: action.payload,
//       };
//     case 'passingYear':
//       return {
//         ...state,
//         passingYear: action.payload,
//       };
//     case 'panCard':
//       return {
//         ...state,
//         panCard: action.payload,
//       };
//     case 'aadharCard':
//       return {
//         ...state,
//         aadharCard: action.payload,
//       };
//     case 'pfForm':
//       return {
//         ...state,
//         pfForm: action.payload,
//       };
//     case 'cost':
//       return {
//         ...state,
//         cost: action.payload,
//       };
//     case 'vendorError':
//       return {
//         ...state,
//         vendorError: action.payload,
//       };
//     case 'firstnameError':
//       return {
//         ...state,
//         firstNameError: action.payload,
//       };
//     case 'lastnameError':
//       return {
//         ...state,
//         lastNameError: action.payload,
//       };
//     case 'mobileError':
//       return {
//         ...state,
//         mobileError: action.payload,
//       };
//     case 'personalEmailError':
//       return {
//         ...state,
//         personalEmail: action.payload,
//       };
//     case 'officialEmailError':
//       return {
//         ...state,
//         officialEmailError: action.payload,
//       };
//     case 'primarySkillError':
//       return {
//         ...state,
//         primarySkillError: action.payload,
//       };
//     case 'secondarySkillError':
//       return {
//         ...state,
//         secondarySkillError: action.payload,
//       };
//     case 'experienceError':
//       return {
//         ...state,
//         experienceError: action.payload,
//       };
//     case 'relationshipError':
//       return {
//         ...state,
//         relationshipError: action.payload,
//       };
//     case 'alternativeContactError':
//       return {
//         ...state,
//         alternativeContactError: action.payload,
//       };
//     case 'residentLocalityError':
//       return {
//         ...state,
//         residentLocalityError: action.payload,
//       };
//     case 'resumeError':
//       return {
//         ...state,
//         resumeError: action.payload,
//       };
//     case 'usaShiftError':
//       return {
//         ...state,
//         usaShiftError: action.payload,
//       };
//     case 'ukShiftError':
//       return {
//         ...state,
//         ukShiftError: action.payload,
//       };
//     case 'relocateError':
//       return {
//         ...state,
//         relocateError: action.payload,
//       };
//     case 'contractStartDateError':
//       return {
//         ...state,
//         contractStartDateError: action.payload,
//       };
//     case 'contractEndDateError':
//       return {
//         ...state,
//         contractEndDateError: action.payload,
//       };
//     case 'contractFileError':
//       return {
//         ...state,
//         contractFileError: action.payload,
//       };
//     case 'checkListError':
//       return {
//         ...state,
//         checkList: action.payload,
//       };
//     case 'otherDocumentError':
//       return {
//         ...state,
//         otherDocument: action.payload,
//       };
//     case 'passingYearError':
//       return {
//         ...state,
//         passingYearError: action.payload,
//       };
//     case 'panCardError':
//       return {
//         ...state,
//         panCardError: action.payload,
//       };
//     case 'aadharCardError':
//       return {
//         ...state,
//         aadharCardError: action.payload,
//       };
//     case 'pfFormError':
//       return {
//         ...state,
//         pfFormError: action.payload,
//       };
//     case 'costError':
//       return {
//         ...state,
//         costError: action.payload,
//       };
//     default:
//       return state;
//   }
// };

const AddResource = () => {
  const dispatch = useDispatch();

  const [formData, dispatcher] = useReducer(reducer, initalState);
  const [venderList, setVenderList] = useState([]);
  const [technologyList, setTechnologyList] = useState([]);
  const [openStartDatePicker, setStartOpenDatePicer] = useState(false);
  const [openEndDatePicker, setEndOpenDatePicer] = useState(false);

  const {vendor, technology} = useSelector(state => ({
    vendor: state.vendor,
    technology: state.technology,
  }));

  const {vendorSuccess, vendorRequest} = vendor;
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

  console.log(formData);

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

  const onSubmit = () => {
    const vendorError = validation.validateField(formData.vendor);
    const firstNameError = validation.validateCharField(formData.firstName);
    const lastNameError = validation.validateCharField(formData.lastName);
    const mobileError = validation.contactValidation(formData.mobile);
    const personalEmailError = validation.validateEmail(formData.personalEmail);
    const primarySkillError = validation.validateField(formData.primarySkill);
    const experienceError = validation.validateField(formData.experience);
    const relationshipError = validation.validateField(formData.relationship);
    const alternativeContactError = validation.contactValidation(
      formData.alternativeContact,
    );
    const residentLocalityError = validation.validateField(
      formData.residentLocality,
    );

    const resumeError = validation.validatefile(formData.resume?.uri);
    const usaShiftError = validation.validateField(formData.usaShift);
    const ukShiftError = validation.validateField(formData.ukShift);
    const relocateError = validation.validateField(formData.relocate);
    const passingYearError = validation.numericValidation(formData.passingYear);
    const panCardError = validation.validatefile(formData.panCard?.uri);
    const aadharCardError = validation.validatefile(formData.aadharCard?.uri);
    const pfFormError = validation.validatefile(formData.pfForm?.uri);

    if (
      vendorError ||
      firstNameError ||
      lastNameError ||
      mobileError ||
      personalEmailError ||
      primarySkillError ||
      experienceError ||
      relationshipError ||
      alternativeContactError ||
      residentLocalityError ||
      resumeError ||
      usaShiftError ||
      ukShiftError ||
      relocateError ||
      passingYearError ||
      panCardError ||
      aadharCardError ||
      pfFormError
    ) {
      dispatcher({type: 'vendorError', payload: vendorError});
      dispatcher({type: 'firstNameError', payload: firstNameError});
      dispatcher({type: 'lastNameError', payload: lastNameError});
      dispatcher({type: 'mobileError', payload: mobileError});
      dispatcher({type: 'personalEmailError', payload: personalEmailError});
      dispatcher({type: 'primarySkillError', payload: primarySkillError});
      dispatcher({type: 'experienceError', payload: experienceError});
      dispatcher({type: 'relationshipError', payload: relationshipError});
      dispatcher({
        type: 'alternativeContactError',
        payload: alternativeContactError,
      });
      dispatcher({
        type: 'residentLocalityError',
        payload: residentLocalityError,
      });
      dispatcher({type: 'resumeError', payload: resumeError});
      dispatcher({type: 'usaShiftError', payload: usaShiftError});
      dispatcher({type: 'ukShiftError', payload: ukShiftError});
      dispatcher({type: 'relocateError', payload: relocateError});
      dispatcher({type: 'passingYearError', payload: passingYearError});
      dispatcher({type: 'panCardError', payload: panCardError});
      dispatcher({type: 'aadharCardError', payload: aadharCardError});
      dispatcher({type: 'pfFormError', payload: pfFormError});

      return;
    }
    dispatcher({type: 'vendorError', payload: null});
    dispatcher({type: 'firstNameError', payload: null});
    dispatcher({type: 'lastNameError', payload: null});
    dispatcher({type: 'mobileError', payload: null});
    dispatcher({type: 'personalEmailError', payload: null});
    dispatcher({type: 'primarySkillError', payload: null});
    dispatcher({type: 'experienceError', payload: null});
    dispatcher({type: 'relationshipError', payload: null});
    dispatcher({
      type: 'alternativeContactError',
      payload: null,
    });
    dispatcher({
      type: 'residentLocalityError',
      payload: null,
    });
    dispatcher({type: 'resumeError', payload: null});
    dispatcher({type: 'usaShiftError', payload: null});
    dispatcher({type: 'ukShiftError', payload: null});
    dispatcher({type: 'relocateError', payload: null});
    dispatcher({type: 'passingYearError', payload: null});
    dispatcher({type: 'panCardError', payload: null});
    dispatcher({type: 'aadharCardError', payload: null});
    dispatcher({type: 'pfFormError', payload: null});
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.conatiner}>
        <CustomNavigationBar back={true} headername="Add Resource" />
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.formContainer}>
            <Dropdown
              data={venderList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Vender"
              value={formData.vendor}
              onChange={item => {
                dispatcher({type: 'vendor', payload: item.value});
                dispatcher({
                  type: 'vendorError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.vendorError !== null && (
              <Text style={styles.errorText}>{formData.vendorError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="First Name"
              placeholderTextColor={'gray'}
              value={formData.firstName}
              onChangeText={text => {
                dispatcher({type: 'firstname', payload: text});
                dispatcher({
                  type: 'firstNameError',
                  payload: validation.validateCharField(text),
                });
              }}
            />
            {formData.firstNameError !== null && (
              <Text style={styles.errorText}>{formData.firstNameError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Last Name"
              placeholderTextColor={'gray'}
              value={formData.lastName}
              onChangeText={text => {
                dispatcher({type: 'lastname', payload: text});
                dispatcher({
                  type: 'lastNameError',
                  payload: validation.validateCharField(text),
                });
              }}
            />
            {formData.lastNameError !== null && (
              <Text style={styles.errorText}>{formData.lastNameError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <View style={{flexDirection: 'row'}}>
              <View style={styles.textInputIconView}>
                <FontAwesome name="phone" color={COLORS.blue} size={20} />
              </View>
              <TextInput
                style={[styles.textInputStyle, {flex: 1}]}
                placeholder="Mobile"
                placeholderTextColor={'gray'}
                value={formData.mobile}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={text => {
                  dispatcher({type: 'mobile', payload: text});
                  dispatcher({
                    type: 'mobileError',
                    payload: validation.contactValidation(text),
                  });
                }}
              />
            </View>
            {formData.mobileError !== null && (
              <Text style={styles.errorText}>{formData.mobileError}</Text>
            )}
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
                keyboardType="email-address"
                value={formData.lastName}
                onChangeText={text => {
                  dispatcher({type: 'personalEmail', payload: text});
                  dispatcher({
                    type: 'personalEmailError',
                    payload: validation.validateEmail(text),
                  });
                }}
              />
            </View>
            {formData.personalEmailError !== null && (
              <Text style={styles.errorText}>
                {formData.personalEmailError}
              </Text>
            )}
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
                keyboardType="email-address"
                onChangeText={text => {
                  dispatcher({type: 'officialEmail', payload: text});
                  dispatcher({
                    type: 'officialEmailError',
                    payload: validation.validateNotRequiredEmail(text),
                  });
                }}
              />
            </View>
            {formData.officialEmailError !== null && (
              <Text style={styles.errorText}>
                {formData.officialEmailError}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Project Name"
              placeholderTextColor={'gray'}
              value={formData.alternativeContact}
              onChangeText={text => {
                dispatcher({type: 'projectname', payload: text});
              }}
            />
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Primary Skill"
              value={formData.primarySkill}
              onChange={item => {
                dispatcher({type: 'primarySkill', payload: item.value});
                dispatcher({
                  type: 'primarySkillError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.primarySkillError !== null && (
              <Text style={styles.errorText}>{formData.primarySkillError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Secondary Skill"
              value={formData.secondarySkill}
              onChange={item => {
                dispatcher({type: 'secondarySkill', payload: item.value});
              }}
            />
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Year Of Experience"
              value={formData.experience}
              onChange={item => {
                dispatcher({type: 'experience', payload: item.value});
                dispatcher({
                  type: 'experienceError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.experienceError !== null && (
              <Text style={styles.errorText}>{formData.experienceError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Relationship"
              value={formData.experience}
              onChange={item => {
                dispatcher({type: 'relationship', payload: item.value});
                dispatcher({
                  type: 'relationshipError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.relationshipError !== null && (
              <Text style={styles.errorText}>{formData.relationshipError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Alternative Number"
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              value={formData.alternativeContact}
              onChangeText={text => {
                dispatcher({type: 'alternativeContact', payload: text});
                dispatcher({
                  type: 'alternativeContactError',
                  payload: validation.contactValidation(text),
                });
              }}
            />
            {formData.alternativeContactError !== null && (
              <Text style={styles.errorText}>
                {formData.alternativeContactError}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputAreaStyle}
              placeholder="Resident Locality"
              placeholderTextColor={'gray'}
              value={formData.residentLocality}
              onChangeText={text => {
                dispatcher({type: 'residentLocality', payload: text});
                dispatcher({
                  type: 'residentLocalityError',
                  payload: validation.validateField(text),
                });
              }}
            />
            {formData.residentLocalityError !== null && (
              <Text style={styles.errorText}>
                {formData.residentLocalityError}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('resume', 'resumeError');
              }}>
              {formData.resume !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.resume?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>Upload Resume</Text>
                </>
              )}
            </TouchableOpacity>
            {formData.resumeError !== null && (
              <Text style={styles.errorText}>{formData.resumeError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to work for US Shift"
              value={formData.usaShift}
              onChange={item => {
                dispatcher({type: 'usaShift', payload: item.value});
                dispatcher({
                  type: 'usaShiftError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.usaShiftError !== null && (
              <Text style={styles.errorText}>{formData.usaShiftError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to work for UK Shift"
              value={formData.ukShift}
              onChange={item => {
                dispatcher({type: 'ukShift', payload: item.value});
                dispatcher({
                  type: 'ukShiftError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.ukShiftError !== null && (
              <Text style={styles.errorText}>{formData.ukShiftError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to Relocate"
              value={formData.relocate}
              onChange={item => {
                dispatcher({type: 'relocate', payload: item.value});
                dispatcher({
                  type: 'relocateError',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.relocateError !== null && (
              <Text style={styles.errorText}>{formData.relocateError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              onPress={() => setStartOpenDatePicer(true)}
              style={styles.dateInputStyle}>
              <Text
                style={
                  formData.contractEndDate === null
                    ? styles.dropDownPlaceholderStyle
                    : {color: COLORS.black}
                }>
                {formData.contractStartDate === null
                  ? 'Contract Start Date'
                  : dayjs(
                      new Date(formData.contractStartDate.toString()),
                    ).format('DD/MM/YYYY')}
              </Text>
            </TouchableOpacity>
            <DatePicker
              date={
                formData.contractStartDate
                  ? formData.contractStartDate
                  : new Date()
              }
              modal
              mode="date"
              open={openStartDatePicker}
              onConfirm={value => {
                dispatcher({
                  type: 'contractStartDate',
                  payload: value,
                });
                setStartOpenDatePicer(false);
              }}
              onCancel={() => {
                setStartOpenDatePicer(false);
              }}
            />
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              onPress={() => setEndOpenDatePicer(true)}
              style={styles.dateInputStyle}>
              <Text
                style={
                  formData.contractEndDate === null
                    ? styles.dropDownPlaceholderStyle
                    : {color: COLORS.black}
                }>
                {formData.contractEndDate === null
                  ? 'Contract End Date'
                  : dayjs(new Date(formData.contractEndDate.toString())).format(
                      'DD/MM/YYYY',
                    )}
              </Text>
              <DatePicker
                date={
                  formData.contractStartDate
                    ? formData.contractStartDate
                    : new Date()
                }
                modal
                mode="date"
                open={openEndDatePicker}
                onConfirm={value => {
                  dispatcher({
                    type: 'contractEndDate',
                    payload: value,
                  });
                  setEndOpenDatePicer(false);
                }}
                onCancel={() => {
                  setEndOpenDatePicer(false);
                }}
              />
            </TouchableOpacity>
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('contractFile');
              }}>
              {formData.contractFile !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.contractFile?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>
                    Upload Contract File
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('checkList');
              }}>
              {formData.checkList !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.checkList?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>
                    Upload Checklist
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('otherDocument');
              }}>
              {formData.otherDocument !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.otherDocument?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>
                    Upload Other Document
                  </Text>
                </>
              )}
            </TouchableOpacity>
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Passing Year"
              placeholderTextColor={'gray'}
              value={formData.passingYear}
              maxLength={4}
              onChangeText={text => {
                dispatcher({type: 'passingYear', payload: text});
                dispatcher({
                  type: 'passingYearError',
                  payload: validation.numericValidation(text),
                });
              }}
            />
            {formData.passingYearError !== null && (
              <Text style={styles.errorText}>{formData.passingYearError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('panCard', 'panCardError');
              }}>
              {formData.panCard !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.panCard?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>Upload Pan Card</Text>
                </>
              )}
            </TouchableOpacity>
            {formData.panCardError !== null && (
              <Text style={styles.errorText}>{formData.panCardError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('aadharCard', 'aadharCardError');
              }}>
              {formData.aadharCard !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.aadharCard?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>
                    Upload Aadhar Card
                  </Text>
                </>
              )}
            </TouchableOpacity>
            {formData.aadharCardError !== null && (
              <Text style={styles.errorText}>{formData.aadharCardError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('pfForm', 'pfFormError');
              }}>
              {formData.pfForm !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.pfForm?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>
                    Upload Pf Opt Out Form
                  </Text>
                </>
              )}
            </TouchableOpacity>
            {formData.pfFormError !== null && (
              <Text style={styles.errorText}>{formData.pfFormError}</Text>
            )}
            <View style={styles.verticalSpace} />
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Cost"
              placeholderTextColor={'gray'}
              value={formData.firstName}
              onChangeText={text => {
                dispatcher({type: 'cost', payload: text});
              }}
            />
            <View style={styles.verticalSpace} />
            <TouchableOpacity
              style={styles.btnStyle}
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
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 8,
    borderColor: COLORS.white,
  },
  dropDownPlaceholderStyle: {
    color: 'gray',
    fontSize: 14,
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
  scrollViewStyle: {
    flex: 1,
  },
  dateInputStyle: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 8,
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 48,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInputAreaStyle: {
    textAlignVertical: 'top',
    height: 100,
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

export default AddResource;
