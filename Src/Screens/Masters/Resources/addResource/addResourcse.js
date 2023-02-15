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

  // console.log(formData);

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
    const vendorError = validation.validateField(formData.vendor_id);
    const fnameError = validation.validateField(formData.fname);
    const lnameError = validation.validateField(formData.lname);
    const phoneError = validation.validateField(formData.phone);
    const personalEmailError = validation.validateField(
      formData.personal_email,
    );
    const emailError = validation.validateField(formData.email);
    const projectError = validation.validateField(formData.project);
    const primarySkillError = validation.validateField(formData.primary_skill);
    const secondarySkillError = validation.validateField(
      formData.secondary_skill,
    );
    const experienceError = validation.validateField(formData.experience);
    const relationshipError = validation.validateField(formData.relationship);
    const alternateNoError = validation.validateField(formData.alternate_no);
    const residentAddressError = validation.validateField(
      formData.resident_address,
    );
    const resumeError = validation.validateField(formData.resume);
    const usShiftError = validation.validateField(formData.us_shift);
    const ukShiftError = validation.validateField(formData.uk_shift);
    const canRelocateError = validation.validateField(formData.can_relocate);
    const contractStartDateError = validation.validateField(
      formData.contract_start_date,
    );
    const contractEndDateError = validation.validateField(
      formData.contract_end_date,
    );
    const contractFileError = validation.validateField(formData.contract_file);
    const checklistError = validation.validateField(formData.checklist);
    const otherDocsError = validation.validateField(formData.other_docs);
    const passingYearError = validation.validateField(formData.passing_year);
    const panLinkError = validation.validateField(formData.pan_link);
    const aadharError = validation.validateField(formData.aadhar);
    const pfOptOutFormLinkError = validation.validateField(
      formData.pf_opt_out_form_link,
    );
    const costError = validation.validateField(formData.cost);
    // const l1Error = validation.validateField(formData.l1);

    if (
      vendorError ||
      fnameError ||
      lnameError ||
      phoneError ||
      personalEmailError ||
      emailError ||
      projectError ||
      primarySkillError ||
      secondarySkillError ||
      experienceError ||
      relationshipError ||
      alternateNoError ||
      residentAddressError ||
      resumeError ||
      usShiftError ||
      ukShiftError ||
      canRelocateError ||
      contractStartDateError ||
      contractEndDateError ||
      contractFileError ||
      checklistError ||
      otherDocsError ||
      passingYearError ||
      panLinkError ||
      aadharError ||
      pfOptOutFormLinkError ||
      costError
      // ||
      // l1Error
    ) {
      console.log('ERROR DISPATCHER REACHED');
      dispatcher({type: 'vendor_id_error', payload: vendorError});
      dispatcher({type: 'fname_error', payload: fnameError});
      dispatcher({type: 'lname_error', payload: lnameError});
      dispatcher({type: 'phone_error', payload: phoneError});
      dispatcher({type: 'personal_email_error', payload: personalEmailError});
      dispatcher({type: 'email_error', payload: emailError});
      dispatcher({type: 'project_error', payload: projectError});
      dispatcher({type: 'primary_skill_error', payload: primarySkillError});
      dispatcher({type: 'secondary_skill_error', payload: secondarySkillError});
      dispatcher({type: 'experience_error', payload: experienceError});
      dispatcher({type: 'relationship_error', payload: relationshipError});
      dispatcher({type: 'alternate_no_error', payload: alternateNoError});
      dispatcher({
        type: 'resident_address_error',
        payload: residentAddressError,
      });
      dispatcher({type: 'resume_error', payload: resumeError});
      dispatcher({type: 'us_shift_error', payload: usShiftError});
      dispatcher({type: 'uk_shift_error', payload: ukShiftError});
      dispatcher({type: 'can_relocate_error', payload: canRelocateError});
      dispatcher({
        type: 'contract_start_date_error',
        payload: contractStartDateError,
      });
      dispatcher({
        type: 'contract_end_date_error',
        payload: contractEndDateError,
      });
      dispatcher({type: 'contract_file_error', payload: contractFileError});
      dispatcher({type: 'checklist_error', payload: checklistError});
      dispatcher({type: 'other_docs_error', payload: otherDocsError});
      dispatcher({type: 'passing_year_error', payload: passingYearError});
      dispatcher({type: 'pan_link_error', payload: panLinkError});
      dispatcher({type: 'aadhar_error', payload: aadharError});
      dispatcher({
        type: 'pf_opt_out_form_link_error',
        payload: pfOptOutFormLinkError,
      });
      dispatcher({type: 'cost_error', payload: costError});
      // dispatcher({type: 'l1_error', payload: l1Error});

      return;
    }
    dispatcher({type: 'vendorError', payload: null});
    dispatcher({type: 'fnameError', payload: null});
    dispatcher({type: 'lnameError', payload: null});
    dispatcher({type: 'phoneError', payload: null});
    dispatcher({type: 'personalEmailError', payload: null});
    dispatcher({type: 'emailError', payload: null});
    dispatcher({type: 'projectError', payload: null});
    dispatcher({type: 'primarySkillError', payload: null});
    dispatcher({type: 'secondarySkillError', payload: null});
    dispatcher({type: 'experienceError', payload: null});
    dispatcher({type: 'relationshipError', payload: null});
    dispatcher({type: 'alternateNoError', payload: null});
    dispatcher({type: 'residentAddressError', payload: null});
    dispatcher({type: 'resumeError', payload: null});
    dispatcher({type: 'usShiftError', payload: null});
    dispatcher({type: 'ukShiftError', payload: null});
    dispatcher({type: 'canRelocateError', payload: null});
    dispatcher({type: 'contractStartDateError', payload: null});
    dispatcher({type: 'contractEndDateError', payload: null});
    dispatcher({type: 'contractFileError', payload: null});
    dispatcher({type: 'checklistError', payload: null});
    dispatcher({type: 'otherDocsError', payload: null});
    dispatcher({type: 'passingYearError', payload: null});
    dispatcher({type: 'panLinkError', payload: null});
    dispatcher({type: 'aadharError', payload: null});
    dispatcher({type: 'pfOptOutFormLinkError', payload: null});
    dispatcher({type: 'costError', payload: null});
    // dispatcher({type: 'l1Error', payload: null});

    console.log('FORMDATA FROM RESOURCES : ==>', formData);
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.conatiner}>
        <CustomNavigationBar back={true} headername="Add Resource" />
        <ScrollView style={styles.scrollViewStyle}>
          <View style={styles.formContainer}>
            {/*For vender list */}
            <Dropdown
              data={venderList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Vender"
              value={formData.vendor_id}
              onChange={item => {
                dispatcher({type: 'vendor_id', payload: item.value});
                dispatcher({
                  type: 'vendor_id_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.vendor_id_error !== null && (
              <Text style={styles.errorText}>{formData.vendor_id_error}</Text>
            )}
            {/* {console.log(formData.vvendor_id_error)} */}
            <View style={styles.verticalSpace} />
            {/*For first name */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="First Name"
              placeholderTextColor={'gray'}
              value={formData.fname}
              onChangeText={text => {
                dispatcher({type: 'fname', payload: text});
                dispatcher({
                  type: 'fname_error',
                  payload: validation.validateCharField(text),
                });
              }}
            />
            {formData.fname_error !== null && (
              <Text style={styles.errorText}>{formData.fname_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For last name */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Last Name"
              placeholderTextColor={'gray'}
              value={formData.lname}
              onChangeText={text => {
                dispatcher({type: 'lname', payload: text});
                dispatcher({
                  type: 'lname_error',
                  payload: validation.validateCharField(text),
                });
              }}
            />
            {formData.lname_error !== null && (
              <Text style={styles.errorText}>{formData.lname_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For contact number  */}
            <View style={{flexDirection: 'row'}}>
              <View style={styles.textInputIconView}>
                <FontAwesome name="phone" color={COLORS.blue} size={20} />
              </View>
              <TextInput
                style={[styles.textInputStyle, {flex: 1}]}
                placeholder="Mobile"
                placeholderTextColor={'gray'}
                value={formData.phone}
                maxLength={10}
                keyboardType="numeric"
                onChangeText={text => {
                  dispatcher({type: 'phone', payload: text});
                  dispatcher({
                    type: 'phone_error',
                    payload: validation.contactValidation(text),
                  });
                }}
              />
            </View>
            {formData.phone_error !== null && (
              <Text style={styles.errorText}>{formData.phone_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For personal email */}
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
                value={formData.personal_email}
                onChangeText={text => {
                  dispatcher({type: 'personal_email', payload: text});
                  dispatcher({
                    type: 'personal_email_error',
                    payload: validation.validateEmail(text),
                  });
                }}
              />
            </View>
            {formData.personal_email_error !== null && (
              <Text style={styles.errorText}>
                {formData.personal_email_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For official email */}
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
                value={formData.email}
                keyboardType="email-address"
                onChangeText={text => {
                  dispatcher({type: 'email', payload: text});
                  dispatcher({
                    type: 'email_error',
                    payload: validation.validateNotRequiredEmail(text),
                  });
                }}
              />
            </View>
            {formData.email_error !== null && (
              <Text style={styles.errorText}>{formData.email_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For project name */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Project Name"
              placeholderTextColor={'gray'}
              value={formData.project}
              onChangeText={text => {
                dispatcher({type: 'project', payload: text});
                dispatcher({
                  type: 'project_error',
                  payload: validation.validateField(text),
                });
              }}
            />
            {formData.project_error !== null && (
              <Text style={styles.errorText}>{formData.project_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For primary skill */}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Primary Skill"
              value={formData.primary_skill_error}
              onChange={item => {
                dispatcher({type: 'primary_skill_error', payload: item.value});
                dispatcher({
                  type: 'primary_skill_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.primary_skill_error !== null && (
              <Text style={styles.errorText}>
                {formData.primary_skill_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For secondary skill*/}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Secondary Skill"
              value={formData.secondary_skill}
              onChange={item => {
                dispatcher({type: 'secondary_skill', payload: item.value});
                dispatcher({
                  type: 'secondary_skill_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.secondary_skill_error !== null && (
              <Text style={styles.errorText}>
                {formData.secondary_skill_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For experience */}
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
                  type: 'experience_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.experience_error !== null && (
              <Text style={styles.errorText}>{formData.experience_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For relationship */}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Select Relationship"
              value={formData.relationship}
              onChange={item => {
                dispatcher({type: 'relationship', payload: item.value});
                dispatcher({
                  type: 'relationship_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.relationship_error !== null && (
              <Text style={styles.errorText}>
                {formData.relationship_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For alternate number */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Alternative Number"
              placeholderTextColor={'gray'}
              keyboardType="numeric"
              value={formData.alternate_no}
              onChangeText={text => {
                dispatcher({type: 'alternate_no', payload: text});
                dispatcher({
                  type: 'alternate_no_error',
                  payload: validation.contactValidation(text),
                });
              }}
            />
            {formData.alternate_no_error !== null && (
              <Text style={styles.errorText}>
                {formData.alternate_no_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For resident locality */}
            <TextInput
              style={styles.textInputAreaStyle}
              placeholder="Resident Locality"
              placeholderTextColor={'gray'}
              value={formData.resident_address}
              onChangeText={text => {
                dispatcher({type: 'resident_address', payload: text});
                dispatcher({
                  type: 'resident_address_error',
                  payload: validation.validateField(text),
                });
              }}
            />
            {formData.resident_address_error !== null && (
              <Text style={styles.errorText}>
                {formData.resident_address_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For resume */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('resume', 'resume_error');
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
            {formData.resume_error !== null && (
              <Text style={styles.errorText}>{formData.resume_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For US Shift */}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to work for US Shift"
              value={formData.us_shift}
              onChange={item => {
                dispatcher({type: 'us_shift', payload: item.value});
                dispatcher({
                  type: 'us_shift_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.us_shift_error !== null && (
              <Text style={styles.errorText}>{formData.us_shift_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For UK Shift */}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to work for UK Shift"
              value={formData.uk_shift}
              onChange={item => {
                dispatcher({type: 'uk_shift', payload: item.value});
                dispatcher({
                  type: 'uk_shift_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.uk_shift_error !== null && (
              <Text style={styles.errorText}>{formData.uk_shift_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For willing to relocate */}
            <Dropdown
              data={technologyList}
              style={styles.dropdownViewStyle}
              selectedTextStyle={{color: COLORS.black}}
              placeholderStyle={styles.dropDownPlaceholderStyle}
              labelField="label"
              valueField="value"
              placeholder="Willing to Relocate"
              value={formData.can_relocate}
              onChange={item => {
                dispatcher({type: 'can_relocate', payload: item.value});
                dispatcher({
                  type: 'can_relocate_error',
                  payload: validation.validateField(item.value),
                });
              }}
            />
            {formData.can_relocate_error !== null && (
              <Text style={styles.errorText}>
                {formData.can_relocate_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For contract start date */}
            <TouchableOpacity
              onPress={() => setStartOpenDatePicer(true)}
              style={styles.dateInputStyle}>
              <Text
                style={
                  formData.contract_start_date === null
                    ? styles.dropDownPlaceholderStyle
                    : {color: COLORS.black}
                }>
                {formData.contract_start_date === null
                  ? 'Contract Start Date'
                  : dayjs(
                      new Date(formData.contract_start_date.toString()),
                    ).format('DD/MM/YYYY')}
              </Text>

              <DatePicker
                date={
                  formData.contract_start_date
                    ? formData.contract_start_date
                    : new Date()
                }
                modal
                mode="date"
                open={openStartDatePicker}
                onConfirm={value => {
                  dispatcher({
                    type: 'contract_start_date',
                    payload: value,
                  });
                  dispatcher({
                    type: 'contract_start_date_error',
                    payload: validation.validateField(value),
                  });
                  setStartOpenDatePicer(false);
                }}
                onCancel={() => {
                  setStartOpenDatePicer(false);
                }}
              />
            </TouchableOpacity>
            {formData.contract_start_date_error !== null && (
              <Text style={styles.errorText}>
                {formData.contract_start_date_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For contract end date */}
            <TouchableOpacity
              onPress={() => setEndOpenDatePicer(true)}
              style={styles.dateInputStyle}>
              <Text
                style={
                  formData.contract_end_date === null
                    ? styles.dropDownPlaceholderStyle
                    : {color: COLORS.black}
                }>
                {formData.contract_end_date === null
                  ? 'Contract End Date'
                  : dayjs(
                      new Date(formData.contract_end_date.toString()),
                    ).format('DD/MM/YYYY')}
              </Text>
              <DatePicker
                date={
                  formData.contract_end_date
                    ? formData.contract_end_date
                    : new Date()
                }
                modal
                mode="date"
                open={openEndDatePicker}
                onConfirm={value => {
                  dispatcher({
                    type: 'contract_end_date',
                    payload: value,
                  });
                  dispatcher({
                    type: 'contract_end_date_error',
                    payload: validation.validateField(value),
                  });
                  setEndOpenDatePicer(false);
                }}
                onCancel={() => {
                  setEndOpenDatePicer(false);
                }}
              />
            </TouchableOpacity>
            {formData.contract_end_date_error !== null && (
              <Text style={styles.errorText}>
                {formData.contract_end_date_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For contarct file */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('contract_file', 'contract_file_error');
              }}>
              {formData.contract_file !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.contract_file?.name}
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
            {formData.contract_file_error !== null && (
              <Text style={styles.errorText}>
                {formData.contract_file_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For checklist */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('checklist', 'checklist_error');
              }}>
              {formData.checklist !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.checklist?.name}
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
            {formData.checklist_error !== null && (
              <Text style={styles.errorText}>{formData.checklist_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For other documents */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('other_docs', 'other_docs_error');
              }}>
              {formData.other_docs !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.other_docs?.name}
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
            {formData.other_docs_error !== null && (
              <Text style={styles.errorText}>{formData.other_docs_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For passing year */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Passing Year"
              placeholderTextColor={'gray'}
              value={formData.passing_year}
              maxLength={4}
              onChangeText={text => {
                dispatcher({type: 'passing_year', payload: text});
                dispatcher({
                  type: 'passing_year_error',
                  payload: validation.numericValidation(text),
                });
              }}
            />
            {formData.passing_year_error !== null && (
              <Text style={styles.errorText}>
                {formData.passing_year_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For pan card */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('pan_link', 'pan_link_error');
              }}>
              {formData.pan_link !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.pan_link?.name}
                </Text>
              ) : (
                <>
                  <AntDesign name="upload" color={COLORS.blue} size={24} />
                  <Text style={styles.uploadBtnTextStyle}>Upload Pan Card</Text>
                </>
              )}
            </TouchableOpacity>
            {formData.pan_link_error !== null && (
              <Text style={styles.errorText}>{formData.pan_link_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For aadhar card */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume('aadhar', 'aadhar_error');
              }}>
              {formData.aadhar !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.aadhar?.name}
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
            {formData.aadhar_error !== null && (
              <Text style={styles.errorText}>{formData.aadhar_error}</Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For pf form */}
            <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => {
                selectResume(
                  'pf_opt_out_form_link',
                  'pf_opt_out_form_link_error',
                );
              }}>
              {formData.pf_opt_out_form_link !== null ? (
                <Text style={styles.uploadBtnTextStyle}>
                  {formData?.pf_opt_out_form_link?.name}
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
            {formData.pf_opt_out_form_link_error !== null && (
              <Text style={styles.errorText}>
                {formData.pf_opt_out_form_link_error}
              </Text>
            )}
            <View style={styles.verticalSpace} />
            {/*For cost */}
            <TextInput
              style={styles.textInputStyle}
              placeholder="Enter Cost"
              placeholderTextColor={'gray'}
              value={formData.cost}
              onChangeText={text => {
                dispatcher({type: 'cost', payload: text});
                dispatcher({
                  type: 'cost_error',
                  payload: validation.validateField(text),
                });
              }}
            />
            {formData.cost_error !== null && (
              <Text style={styles.errorText}>{formData.cost_error}</Text>
            )}
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
