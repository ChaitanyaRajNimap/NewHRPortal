import React, {useState, useEffect, useReducer, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
  KeyboardAvoidingView,
} from 'react-native';
import {editClient} from '../../../../Redux/Actions/ClientAction';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {useSelector, useDispatch} from 'react-redux';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';
import validation from '../../../../Util/helper';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CustomRadioButtons from '../../../../Components/CustomRadioButtons';
import {reducer} from '../ClientFormData';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const EditClient = ({navigation, route}) => {
  const params = route.params.newData;
  // console.log('PARAMS from EditClient : =====> ', params);
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientReducer);

  const [formData, dispatcher] = useReducer(reducer, {
    clientName: params.client_name,
    reportManagerName: params.reporting_name,
    reportManagerContact: params.reporting_contact,
    reportManagerEmail: params.reporting_email,
    hrName: params.hr_name,
    hrContact: params.hr_contact,
    hrEmail: params.hr_email,
    interviewerName: params.Interviewer_name,
    interviewerContact: params.Interviewer_contact,
    interviewerEmail: params.Interviewer_email,
    financeName: params.account_name,
    financeEmail: params.account_email,
    financeContact: params.account_mobile,
    url: params.url,
    address: params.address,
    description: params.description,
    billingAddress: params.billing_address,
    operationalAddress: params.operational_address,
    panNumber: params.pan,
    gstNumber: params.gst,
    tanNumber: params.tan,
    creditPeriod: params.credit_period.toString(),
    dateOfInvoice: params.invoice_date,
    mapLink: params.address_map_link,
    nationality: params.nationality,
    needTimesheet: null,
    needMachine: null,
    isWeekendWorking: null,
    isAgreementSigned: null,
    isFirstInvoiceSend: null,
    needPhysicalCopy: null,
    needPFProof: null,
    purchaseOrderRequired: null,
    isExternalProduct: null,
    externalProduct: null,
    clientNameError: null,
    reportManagerNameError: null,
    reportManagerContactError: null,
    reportManagerEmailError: null,
    hrNameError: null,
    hrContactError: null,
    hrEmailError: null,
    interviewerNameError: null,
    interviewerContactError: null,
    interviewerEmailError: null,
    financeNameError: null,
    financeEmailError: null,
    financeContactError: null,
    urlError: null,
    addressError: null,
    descriptionError: null,
    billingAddressError: null,
    operationalAddressError: null,
    panNumberError: null,
    gstNumberError: null,
    tanNumberError: null,
    creditPeriodError: null,
    mapLinkError: null,
  });

  //For date of invoice dropdown
  const [doiOpen, setDoiOpen] = useState(false);
  const [doiValue, setDoiValue] = useState(params.invoice_date);
  const [doiItems, setDoiItems] = useState([
    {
      value: '1st Of Months',
      label: '1st Of Months',
    },
    {
      value: '15th Of Months',
      label: '15th Of Months',
    },
    {
      value: '30th Of Months',
      label: '30th Of Months',
    },
  ]);

  //For nationality dropdown
  const [nationalityOpen, setNationalityOpen] = useState(false);
  const [nationalityValue, setNationalityValue] = useState(params.nationality);
  const [nationalityItems, setNationalityItems] = useState([
    {
      value: 'Other',
      label: 'Other',
    },
    {
      value: 'India',
      label: 'India',
    },
  ]);

  //For external product dropdown
  const [externalProductOpen, setExternalProductOpen] = useState(false);
  const [externalProductValue, setExternalProductValue] = useState(null);
  const [externalProductItems, setExternalProductItems] = useState([]);

  //For closing other dropdowns
  const onDoiOpen = useCallback(() => {
    setNationalityOpen(false);
    setExternalProductOpen(false);
  }, []);

  const onNationalityOpen = useCallback(() => {
    setDoiOpen(false);
    setExternalProductOpen(false);
  }, []);

  const onExternalProductOpen = useCallback(() => {
    setDoiOpen(false);
    setNationalityOpen(false);
  }, []);

  //For external products
  useEffect(() => {
    if (reducerData.getExternalProductData) {
      let newArray = [];
      for (let i of reducerData.getExternalProductData) {
        let item;
        if (i.name) {
          item = {id: i.id, label: i.name, value: i.id};
        }
        newArray.push(item);
      }
      setExternalProductItems(newArray);
    }
  }, [reducerData.getExternalProductData]);

  //For radio buttons
  const [radioValues, setRadioValues] = useState({
    needTimesheet:
      params.need_timesheet === 'Y' ||
      params.need_timesheet === 'Yes' ||
      params.need_timesheet === 1
        ? 1
        : 0,
    needMachine:
      params.need_machine === 'Y' ||
      params.need_machine === 'Yes' ||
      params.need_machine === 1
        ? 1
        : 0,
    isWeekendWorking:
      params.weekend_working === 'Y' ||
      params.weekend_working === 'Yes' ||
      params.weekend_working === 1
        ? 1
        : 0,
    isAgreementSigned:
      params.aggrement_sign === 'Y' ||
      params.aggrement_sign === 'Yes' ||
      params.aggrement_sign === 1
        ? 1
        : 0,
    isFirstInvoiceSend:
      params.first_invoice === 'Y' ||
      params.first_invoice === 'Yes' ||
      params.first_invoice === 1
        ? 1
        : 0,
    needPhysicalCopy:
      params.is_invoice_need === 'Y' ||
      params.is_invoice_need === 'Yes' ||
      params.is_invoice_need === 1
        ? 1
        : 0,
    needPFProof:
      params.pf_proof === 'Y' ||
      params.pf_proof === 'Yes' ||
      params.pf_proof === 1
        ? 1
        : 0,
    purchaseOrderRequired:
      params.is_pruchase_ord_req === 'Y' ||
      params.is_pruchase_ord_req === 'Yes' ||
      params.is_pruchase_ord_req === 1
        ? 1
        : 0,
    isExternalProduct:
      params.is_external_product === 'Y' ||
      params.is_external_product === 'Yes' ||
      params.is_external_product === 1
        ? 1
        : 0,
  });

  //For setting initial values of radio buttons to formdata
  useEffect(() => {
    let needTimesheet =
      params.need_timesheet === 'Y' ||
      params.need_timesheet === 'Yes' ||
      params.need_timesheet === 1
        ? 'Yes'
        : 'No';
    let needMachine =
      params.need_machine === 'Y' ||
      params.need_machine === 'Yes' ||
      params.need_machine === 1
        ? 'Yes'
        : 'No';
    let isWeekendWorking =
      params.weekend_working === 'Y' ||
      params.weekend_working === 'Yes' ||
      params.weekend_working === 1
        ? 'Yes'
        : 'No';
    let isAgreementSigned =
      params.aggrement_sign === 'Y' ||
      params.aggrement_sign === 'Yes' ||
      params.aggrement_sign === 1
        ? 'Yes'
        : 'No';
    let isFirstInvoiceSend =
      params.first_invoice === 'Y' ||
      params.first_invoice === 'Yes' ||
      params.first_invoice === 1
        ? 'Yes'
        : 'No';
    let needPhysicalCopy =
      params.is_invoice_need === 'Y' ||
      params.is_invoice_need === 'Yes' ||
      params.is_invoice_need === 1
        ? 'Yes'
        : 'No';
    let needPFProof =
      params.pf_proof === 'Y' ||
      params.pf_proof === 'Yes' ||
      params.pf_proof === 1
        ? 'Yes'
        : 'No';
    let purchaseOrderRequired =
      params.is_pruchase_ord_req === 'Y' ||
      params.is_pruchase_ord_req === 'Yes' ||
      params.is_pruchase_ord_req === 1
        ? 'Yes'
        : 'No';
    let isExternalProduct =
      params.is_external_product === 'Y' ||
      params.is_external_product === 'Yes' ||
      params.is_external_product === 1
        ? 'Yes'
        : 'No';

    dispatcher({type: 'needTimesheet', payload: needTimesheet});
    dispatcher({type: 'needMachine', payload: needMachine});
    dispatcher({type: 'isWeekendWorking', payload: isWeekendWorking});
    dispatcher({type: 'isAgreementSigned', payload: isAgreementSigned});
    dispatcher({type: 'isFirstInvoiceSend', payload: isFirstInvoiceSend});
    dispatcher({type: 'needPhysicalCopy', payload: needPhysicalCopy});
    dispatcher({type: 'needPFProof', payload: needPFProof});
    dispatcher({type: 'purchaseOrderRequired', payload: purchaseOrderRequired});
    dispatcher({type: 'isExternalProduct', payload: isExternalProduct});
  }, [navigation]);

  const convertClientData = data => {
    return {
      client_name: data.clientName,
      reporting_name: data.reportManagerName,
      reporting_contact: data.reportManagerContact,
      reporting_email: data.reportManagerEmail,
      hr_name: data.hrName,
      hr_contact: data.hrContact,
      hr_email: data.hrEmail,
      Interviewer_name: data.interviewerName,
      Interviewer_contact: data.interviewerContact,
      Interviewer_email: data.interviewerEmail,
      account_name: data.financeName,
      account_email: data.financeEmail,
      account_mobile: data.financeContact,
      url: data.url,
      address: data.address,
      billing_address: data.billingAddress,
      operational_address: data.operationalAddress,
      description: data.description,
      pan: data.panNumber,
      gst: data.gstNumber,
      tan: data.tanNumber,
      credit_period: data.creditPeriod,
      invoice_date: data.dateOfInvoice,
      address_map_link: data.mapLink,
      nationality: data.nationality,
      need_timesheet: data.needTimesheet,
      need_machine: data.needMachine,
      weekend_working: data.isWeekendWorking,
      aggrement_sign: data.isAgreementSigned,
      first_invoice: data.isFirstInvoiceSend,
      is_invoice_need: data.needPhysicalCopy,
      pf_proof: data.needPFProof,
      is_pruchase_ord_req: data.purchaseOrderRequired,
      is_external_product: data.isExternalProduct,
      external_product: data.externalProduct,
      holidays: 'N',
      invoice_client: 0,
    };
  };

  const onSubmit = () => {
    const clientNameError = validation.validateNameFeild(formData.clientName);
    const reportManagerNameError = validation.validateNameFeild(
      formData.reportManagerName,
    );
    const reportManagerContactError = validation.contactValidation(
      formData.reportManagerContact,
    );
    const reportManagerEmailError = validation.validateEmail(
      formData.reportManagerEmail,
    );
    const hrNameError = validation.validateNameFeild(formData.hrName);
    const hrContactError = validation.contactValidation(formData.hrContact);
    const hrEmailError = validation.validateEmail(formData.hrEmail);
    const interviewerNameError = validation.validateNameFeild(
      formData.interviewerName,
    );
    const interviewerContactError = validation.contactValidation(
      formData.interviewerContact,
    );
    const interviewerEmailError = validation.validateEmail(
      formData.interviewerEmail,
    );
    const financeNameError = validation.validateNameFeild(formData.financeName);
    const financeEmailError = validation.validateEmail(formData.financeEmail);
    const financeContactError = validation.contactValidation(
      formData.financeContact,
    );
    const urlError = validation.validateUrl(formData.url);
    const addressError = validation.validateNameFeild(formData.address);
    const descriptionError = validation.validateNameFeild(formData.description);
    const billingAddressError = validation.validateNameFeild(
      formData.billingAddress,
    );
    const operationalAddressError = validation.validateNameFeild(
      formData.operationalAddress,
    );
    const panNumberError = validation.validatePan(formData.panNumber);
    const gstNumberError = validation.validateGst(formData.gstNumber);
    const tanNumberError = validation.validateTan(formData.tanNumber);
    const creditPeriodError = validation.validateCP(formData.creditPeriod);
    const mapLinkError = validation.validateUrl(formData.mapLink);

    if (
      clientNameError ||
      reportManagerNameError ||
      reportManagerContactError ||
      reportManagerEmailError ||
      hrNameError ||
      hrContactError ||
      hrEmailError ||
      interviewerNameError ||
      interviewerContactError ||
      interviewerEmailError ||
      financeNameError ||
      financeEmailError ||
      financeContactError ||
      urlError ||
      addressError ||
      descriptionError ||
      billingAddressError ||
      operationalAddressError ||
      panNumberError ||
      gstNumberError ||
      tanNumberError ||
      creditPeriodError ||
      mapLinkError
    ) {
      dispatcher({type: 'clientNameError', payload: clientNameError});
      dispatcher({
        type: 'reportManagerNameError',
        payload: reportManagerNameError,
      });
      dispatcher({
        type: 'reportManagerContactError',
        payload: reportManagerContactError,
      });
      dispatcher({
        type: 'reportManagerEmailError',
        payload: reportManagerEmailError,
      });
      dispatcher({type: 'hrNameError', payload: hrNameError});
      dispatcher({type: 'hrContactError', payload: hrContactError});
      dispatcher({type: 'hrEmailError', payload: hrEmailError});
      dispatcher({type: 'interviewerNameError', payload: interviewerNameError});
      dispatcher({
        type: 'interviewerContactError',
        payload: interviewerContactError,
      });
      dispatcher({
        type: 'interviewerEmailError',
        payload: interviewerEmailError,
      });
      dispatcher({type: 'financeNameError', payload: financeNameError});
      dispatcher({type: 'financeEmailError', payload: financeEmailError});
      dispatcher({type: 'financeContactError', payload: financeContactError});
      dispatcher({type: 'urlError', payload: urlError});
      dispatcher({type: 'addressError', payload: addressError});
      dispatcher({type: 'descriptionError', payload: descriptionError});
      dispatcher({type: 'billingAddressError', payload: billingAddressError});
      dispatcher({
        type: 'operationalAddressError',
        payload: operationalAddressError,
      });
      dispatcher({type: 'panNumberError', payload: panNumberError});
      dispatcher({type: 'gstNumberError', payload: gstNumberError});
      dispatcher({type: 'tanNumberError', payload: tanNumberError});
      dispatcher({type: 'creditPeriodError', payload: creditPeriodError});
      dispatcher({type: 'mapLinkError', payload: mapLinkError});

      return;
    }

    dispatcher({type: 'clientNameError', payload: null});
    dispatcher({
      type: 'reportManagerNameError',
      payload: null,
    });
    dispatcher({
      type: 'reportManagerContactError',
      payload: null,
    });
    dispatcher({
      type: 'reportManagerEmailError',
      payload: null,
    });
    dispatcher({type: 'hrNameError', payload: null});
    dispatcher({type: 'hrContactError', payload: null});
    dispatcher({type: 'hrEmailError', payload: null});
    dispatcher({type: 'interviewerNameError', payload: null});
    dispatcher({
      type: 'interviewerContactError',
      payload: null,
    });
    dispatcher({
      type: 'interviewerEmailError',
      payload: null,
    });
    dispatcher({type: 'financeNameError', payload: null});
    dispatcher({type: 'financeEmailError', payload: null});
    dispatcher({type: 'financeContactError', payload: null});
    dispatcher({type: 'urlError', payload: null});
    dispatcher({type: 'addressError', payload: null});
    dispatcher({type: 'descriptionError', payload: null});
    dispatcher({type: 'billingAddressError', payload: null});
    dispatcher({
      type: 'operationalAddressError',
      payload: null,
    });
    dispatcher({type: 'panNumberError', payload: null});
    dispatcher({type: 'gstNumberError', payload: null});
    dispatcher({type: 'tanNumberError', payload: null});
    dispatcher({type: 'creditPeriodError', payload: null});
    dispatcher({type: 'mapLinkError', payload: null});

    // console.log('<--------- FORMDATA -------->', formData);
    let data = convertClientData(formData);
    console.log('<---------# CONVERTED DATA #-------->', data);
    dispatch(editClient(data, params.id, navigation));
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Edit Client" />
        <ScrollView
          keyboardShouldPersistTaps="handled"
          style={GLOBALSTYLE.mainContainer}>
          <KeyboardAvoidingView enabled>
            <View style={styles.formContainer}>
              {/*For client Name */}
              <TextInput
                placeholder="Enter Client Name*"
                style={[
                  GLOBALSTYLE.TextInputStyle,
                  {marginTop: 10},
                  styles.inputAligner,
                ]}
                value={formData.clientName}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'clientName',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'clientNameError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.clientNameError !== null && (
                <Text style={styles.errorText}>{formData.clientNameError}</Text>
              )}

              {/*For Reporting Manager Name */}
              <TextInput
                placeholder="Enter Reporting Manager Name*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.reportManagerName}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'reportManagerName',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'reportManagerNameError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.reportManagerNameError !== null && (
                <Text style={styles.errorText}>
                  {formData.reportManagerNameError}
                </Text>
              )}

              {/*For Reporting Manager Contact */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="phone"
                    size={30}
                    style={{right: 15, marginStart: 27}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Reporting Manager Contact No.*"
                  value={formData.reportManagerContact}
                  style={{flex: 1}}
                  maxLength={10}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'reportManagerContact',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'reportManagerContactError',
                      payload: null,
                    });
                  }}
                  keyboardType="numeric"
                />
              </View>
              {formData.reportManagerContactError !== null && (
                <Text style={styles.errorText}>
                  {formData.reportManagerContactError}
                </Text>
              )}

              {/*For Reporting Manager Email */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="envelope-o"
                    size={30}
                    style={{right: 10, marginStart: 20}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Reporting Manager Email*"
                  value={formData.reportManagerEmail}
                  style={{flex: 1}}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'reportManagerEmail',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'reportManagerEmailError',
                      payload: null,
                    });
                  }}
                  keyboardType="email-address"
                />
              </View>
              {formData.reportManagerEmailError !== null && (
                <Text style={styles.errorText}>
                  {formData.reportManagerEmailError}
                </Text>
              )}

              {/*For HR Name */}
              <TextInput
                placeholder="Enter HR Name*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.hrName}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'hrName',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'hrNameError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.hrNameError !== null && (
                <Text style={styles.errorText}>{formData.hrNameError}</Text>
              )}

              {/*For HR Contact */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="phone"
                    size={30}
                    style={{right: 15, marginStart: 27}}
                  />
                </View>
                <TextInput
                  placeholder="Enter HR Contact No.*"
                  value={formData.hrContact}
                  style={{flex: 1}}
                  maxLength={10}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'hrContact',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'hrContactError',
                      payload: null,
                    });
                  }}
                  keyboardType="numeric"
                />
              </View>
              {formData.hrContactError !== null && (
                <Text style={styles.errorText}>{formData.hrContactError}</Text>
              )}

              {/*For HR Email */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="envelope-o"
                    size={30}
                    style={{right: 10, marginStart: 20}}
                  />
                </View>
                <TextInput
                  placeholder="Enter HR Email*"
                  value={formData.hrEmail}
                  style={{flex: 1}}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'hrEmail',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'hrEmailError',
                      payload: null,
                    });
                  }}
                  keyboardType="email-address"
                />
              </View>
              {formData.hrEmailError !== null && (
                <Text style={styles.errorText}>{formData.hrEmailError}</Text>
              )}

              {/*For Interviewer Name */}
              <TextInput
                placeholder="Enter Interviewer Name*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.interviewerName}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'interviewerName',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'interviewerNameError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.interviewerNameError !== null && (
                <Text style={styles.errorText}>
                  {formData.interviewerNameError}
                </Text>
              )}

              {/*For Interviewer Contact */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="phone"
                    size={30}
                    style={{right: 15, marginStart: 27}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Interviewer Contact No.*"
                  value={formData.interviewerContact}
                  style={{flex: 1}}
                  maxLength={10}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'interviewerContact',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'interviewerContactError',
                      payload: null,
                    });
                  }}
                  keyboardType="numeric"
                />
              </View>
              {formData.interviewerContactError !== null && (
                <Text style={styles.errorText}>
                  {formData.interviewerContactError}
                </Text>
              )}

              {/*For Interviewer Email */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="envelope-o"
                    size={30}
                    style={{right: 10, marginStart: 20}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Interviewer Email*"
                  value={formData.interviewerEmail}
                  style={{flex: 1}}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'interviewerEmail',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'interviewerEmailError',
                      payload: null,
                    });
                  }}
                  keyboardType="email-address"
                />
              </View>
              {formData.interviewerEmailError !== null && (
                <Text style={styles.errorText}>
                  {formData.interviewerEmailError}
                </Text>
              )}

              {/*For Finance Name */}
              <TextInput
                placeholder="Enter Finance Name*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.financeName}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'financeName',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'financeNameError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.financeNameError !== null && (
                <Text style={styles.errorText}>
                  {formData.financeNameError}
                </Text>
              )}

              {/*For Finance Contact */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="phone"
                    size={30}
                    style={{right: 15, marginStart: 27}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Finance Contact No.*"
                  value={formData.financeContact}
                  style={{flex: 1}}
                  maxLength={10}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'financeContact',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'financeContactError',
                      payload: null,
                    });
                  }}
                  keyboardType="numeric"
                />
              </View>
              {formData.financeContactError !== null && (
                <Text style={styles.errorText}>
                  {formData.financeContactError}
                </Text>
              )}

              {/*For Finance Email */}
              <View
                style={[
                  GLOBALSTYLE.uploadRowView,
                  styles.uploadRowViewAligner,
                ]}>
                <View style={GLOBALSTYLE.iconBackgroundView}>
                  <FontAwesome
                    color={COLORS.lightBlue}
                    name="envelope-o"
                    size={30}
                    style={{right: 10, marginStart: 20}}
                  />
                </View>
                <TextInput
                  placeholder="Enter Finance Email*"
                  value={formData.financeEmail}
                  style={{flex: 1}}
                  onChangeText={vlaue => {
                    dispatcher({
                      type: 'financeEmail',
                      payload: vlaue,
                    });
                    dispatcher({
                      type: 'financeEmailError',
                      payload: null,
                    });
                  }}
                  keyboardType="email-address"
                />
              </View>
              {formData.financeEmailError !== null && (
                <Text style={styles.errorText}>
                  {formData.financeEmailError}
                </Text>
              )}

              {/*For URL */}
              <TextInput
                placeholder="Enter URL*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.url}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'url',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'urlError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.urlError !== null && (
                <Text style={styles.errorText}>{formData.urlError}</Text>
              )}

              {/*For Address */}
              <TextInput
                placeholder="Enter Address*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.address}
                multiline={true}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'address',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'addressError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.addressError !== null && (
                <Text style={styles.errorText}>{formData.addressError}</Text>
              )}

              {/*For Description */}
              <TextInput
                placeholder="Enter Description*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.description}
                multiline={true}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'description',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'descriptionError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.descriptionError !== null && (
                <Text style={styles.errorText}>
                  {formData.descriptionError}
                </Text>
              )}

              {/*For Billing Address */}
              <TextInput
                placeholder="Enter Billing Address*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.billingAddress}
                multiline={true}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'billingAddress',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'billingAddressError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.billingAddressError !== null && (
                <Text style={styles.errorText}>
                  {formData.billingAddressError}
                </Text>
              )}

              {/*For Operational Address */}
              <TextInput
                placeholder="Enter Operational Address*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.operationalAddress}
                multiline={true}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'operationalAddress',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'operationalAddressError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.operationalAddressError !== null && (
                <Text style={styles.errorText}>
                  {formData.operationalAddressError}
                </Text>
              )}

              {/*For PAN Number */}
              <TextInput
                placeholder="Enter PAN Number*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.panNumber}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'panNumber',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'panNumberError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.panNumberError !== null && (
                <Text style={styles.errorText}>{formData.panNumberError}</Text>
              )}

              {/*For GST Number */}
              <TextInput
                placeholder="Enter GST Number*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.gstNumber}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'gstNumber',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'gstNumberError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.gstNumberError !== null && (
                <Text style={styles.errorText}>{formData.gstNumberError}</Text>
              )}

              {/*For TAN Number */}
              <TextInput
                placeholder="Enter TAN Number*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.tanNumber}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'tanNumber',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'tanNumberError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.tanNumberError !== null && (
                <Text style={styles.errorText}>{formData.tanNumberError}</Text>
              )}

              {/*For Credit Period */}
              <TextInput
                placeholder="Enter Credit Period*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.creditPeriod}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'creditPeriod',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'creditPeriodError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.creditPeriodError !== null && (
                <Text style={styles.errorText}>
                  {formData.creditPeriodError}
                </Text>
              )}

              {/*For Date Of Invoice */}
              <DropDownPicker
                style={[
                  styles.dropdownViewStyle,
                  styles.dropDownAligner,
                  styles.inputAligner,
                ]}
                placeholder="Date Of Invoice*"
                placeholderStyle={{color: COLORS.grey}}
                listMode="FLATLIST"
                dropDownContainerStyle={styles.dropDownContainerStyle}
                renderListItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setDoiValue(item.value);
                        setDoiOpen(false);
                        dispatcher({
                          type: 'dateOfInvoice',
                          payload: item.value,
                        });
                        dispatcher({
                          type: 'dateOfInvoiceError',
                          payload: null,
                        });
                      }}
                      style={styles.cellStyle}>
                      <Text style={styles.cellTextStyle}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                }}
                open={doiOpen}
                onOpen={onDoiOpen}
                value={doiValue}
                items={doiItems}
                setOpen={setDoiOpen}
                setItems={setDoiItems}
              />
              <View style={styles.verticalSpace} />

              {/*For Map Link */}
              <TextInput
                placeholder="Enter Map Link*"
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={formData.mapLink}
                onChangeText={vlaue => {
                  dispatcher({
                    type: 'mapLink',
                    payload: vlaue,
                  });
                  dispatcher({
                    type: 'mapLinkError',
                    payload: null,
                  });
                }}
                keyboardType="default"
              />
              {formData.mapLinkError !== null && (
                <Text style={styles.errorText}>{formData.mapLinkError}</Text>
              )}

              {/*For Nationality */}
              <DropDownPicker
                style={[
                  styles.dropdownViewStyle,
                  styles.dropDownAligner,
                  styles.inputAligner,
                ]}
                placeholder="Nationality*"
                placeholderStyle={{color: COLORS.grey}}
                listMode="FLATLIST"
                dropDownContainerStyle={styles.dropDownContainerStyle}
                renderListItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setNationalityValue(item.value);
                        setNationalityOpen(false);
                        dispatcher({
                          type: 'nationality',
                          payload: item.value,
                        });
                        dispatcher({
                          type: 'nationalityError',
                          payload: null,
                        });
                      }}
                      style={styles.cellStyle}>
                      <Text style={styles.cellTextStyle}>{item.label}</Text>
                    </TouchableOpacity>
                  );
                }}
                open={nationalityOpen}
                onOpen={onNationalityOpen}
                value={nationalityValue}
                items={nationalityItems}
                setOpen={setNationalityOpen}
                setItems={setNationalityItems}
              />
              <View style={styles.verticalSpace} />

              {/*For Need Timesheet */}
              <CustomRadioButtons
                value={radioValues.needTimesheet}
                title="Do you need timesheet?*"
                onPressFunction={value => {
                  let needTimesheet = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'needTimesheet',
                    payload: needTimesheet,
                  });
                  dispatcher({
                    type: 'needTimesheetError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      needTimesheet: value,
                    };
                  });
                }}
              />

              {/*For Need Machine */}
              <CustomRadioButtons
                value={radioValues.needMachine}
                title="Do you need machine?*"
                onPressFunction={value => {
                  let needMachine = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'needMachine',
                    payload: needMachine,
                  });
                  dispatcher({
                    type: 'needMachineError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      needMachine: value,
                    };
                  });
                }}
              />

              {/*For weekend working */}
              <CustomRadioButtons
                value={radioValues.isWeekendWorking}
                title="Weekend working?*"
                onPressFunction={value => {
                  let isWeekendWorking = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'isWeekendWorking',
                    payload: isWeekendWorking,
                  });
                  dispatcher({
                    type: 'isWeekendWorkingError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      isWeekendWorking: value,
                    };
                  });
                }}
              />

              {/*For Agreement Sign */}
              <CustomRadioButtons
                value={radioValues.isAgreementSigned}
                title="Agreement Sign?*"
                onPressFunction={value => {
                  let isAgreementSigned = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'isAgreementSigned',
                    payload: isAgreementSigned,
                  });
                  dispatcher({
                    type: 'isAgreementSignedError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      isAgreementSigned: value,
                    };
                  });
                }}
              />

              {/*For First Invoice Send */}
              <CustomRadioButtons
                value={radioValues.isFirstInvoiceSend}
                title="First Invoice Send?*"
                onPressFunction={value => {
                  let isFirstInvoiceSend = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'isFirstInvoiceSend',
                    payload: isFirstInvoiceSend,
                  });
                  dispatcher({
                    type: 'isFirstInvoiceSendError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      isFirstInvoiceSend: value,
                    };
                  });
                }}
              />

              {/*For Physical copy needed */}
              <CustomRadioButtons
                value={radioValues.needPhysicalCopy}
                title="Physical copy needed?*"
                onPressFunction={value => {
                  let needPhysicalCopy = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'needPhysicalCopy',
                    payload: needPhysicalCopy,
                  });
                  dispatcher({
                    type: 'needPhysicalCopyError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      needPhysicalCopy: value,
                    };
                  });
                }}
              />

              {/*For PF Proof needed */}
              <CustomRadioButtons
                value={radioValues.needPFProof}
                title="PF Proof needed?*"
                onPressFunction={value => {
                  let needPFProof = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'needPFProof',
                    payload: needPFProof,
                  });
                  dispatcher({
                    type: 'needPFProofError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      needPFProof: value,
                    };
                  });
                }}
              />

              {/*For Purchase Order Required */}
              <CustomRadioButtons
                value={radioValues.purchaseOrderRequired}
                title="Is Purchase Order Required?*"
                onPressFunction={value => {
                  let purchaseOrderRequired = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'purchaseOrderRequired',
                    payload: purchaseOrderRequired,
                  });
                  dispatcher({
                    type: 'purchaseOrderRequiredError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      purchaseOrderRequired: value,
                    };
                  });
                }}
              />

              {/*For Purchase Order Required */}
              <CustomRadioButtons
                value={radioValues.isExternalProduct}
                title="Is External Product?*"
                onPressFunction={value => {
                  let isExternalProduct = value === 0 ? 'No' : 'Yes';
                  dispatcher({
                    type: 'isExternalProduct',
                    payload: isExternalProduct,
                  });
                  dispatcher({
                    type: 'isExternalProductError',
                    payload: null,
                  });
                  setRadioValues(prevValues => {
                    return {
                      ...prevValues,
                      isExternalProduct: value,
                    };
                  });
                }}
              />

              {radioValues.isExternalProduct === 1 ? (
                <>
                  <DropDownPicker
                    style={[
                      styles.dropdownViewStyle,
                      styles.dropDownAligner,
                      styles.inputAligner,
                    ]}
                    placeholder="External Product"
                    placeholderStyle={{color: COLORS.grey}}
                    listMode="SCROLLVIEW"
                    dropDownContainerStyle={styles.dropDownContainerStyle}
                    renderListItem={({item}) => {
                      return (
                        <TouchableOpacity
                          onPress={() => {
                            setExternalProductValue(item.value);
                            setExternalProductOpen(false);
                            dispatcher({
                              type: 'externalProduct',
                              payload: item.label,
                            });
                          }}
                          style={styles.cellStyle}>
                          <Text style={styles.cellTextStyle}>{item.label}</Text>
                        </TouchableOpacity>
                      );
                    }}
                    open={externalProductOpen}
                    onOpen={onExternalProductOpen}
                    value={externalProductValue}
                    items={externalProductItems}
                    setOpen={setExternalProductOpen}
                    setItems={setExternalProductItems}
                  />
                  <View style={styles.verticalSpace} />
                </>
              ) : null}

              <TouchableOpacity
                style={[styles.btnStyle, styles.submitBtnAligner]}
                onPress={() => {
                  onSubmit();
                }}>
                <Text style={styles.submitBtnTextStyle}>Submit</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default EditClient;

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollview: {
    // paddingVertical: 10,
    // paddingHorizontal: 20,
    flex: 1,
  },
  formContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    color: '#f00',
    fontSize: 25,
    fontWeight: 'bold',
  },
  uploadRowViewAligner: {width: 350},
  inputAligner: {width: 350, paddingHorizontal: 15},
  dropdownViewStyle: {
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: COLORS.white,
    marginTop: 5,
    marginHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  dropDownAligner: {
    marginHorizontal: 15,
  },
  dropDownContainerStyle: {
    margin: 10,
    paddingVertical: 4,
    borderColor: '#fff',
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
  verticalSpace: {height: 5},
  btnStyle: {
    height: 48,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnAligner: {
    marginVertical: 10,
    marginHorizontal: 7,
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
