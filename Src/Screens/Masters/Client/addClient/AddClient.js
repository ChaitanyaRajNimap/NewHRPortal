import React, {useReducer, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import DropDownPicker from 'react-native-dropdown-picker';
import Toast from 'react-native-simple-toast';
import validation from '../../../../Util/helper';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {initialState, reducer} from './AddClientFormData';
import CustomRadioButtons from '../../../../Components/CustomRadioButtons';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const AddClient = () => {
  const [formData, dispatcher] = useReducer(reducer, initialState);

  //For date of invoice dropdown
  const [doiOpen, setDoiOpen] = useState(false);
  const [doiValue, setDoiValue] = useState(null);
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
  const [nationalityValue, setNationalityValue] = useState(null);
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

  //For closing other dropdowns
  const onDoiOpen = useCallback(() => setNationalityOpen(false), []);
  const onNationalityOpen = useCallback(() => setDoiOpen(false), []);

  //For radio buttons
  const [radioValues, setRadioValues] = useState({
    needTimesheet: 0,
    needMachine: 0,
    isWeekendWorking: 0,
    isAgreementSigned: 0,
    isFirstInvoiceSend: 0,
    needPhysicalCopy: 0,
    needPFProof: 0,
    purchaseOrderRequired: 0,
    isExternalProduct: 0,
  });

  const [data, setData] = useState({
    clientName: null,
    reportManagerName: null,
    reportManagerContact: null,
    reportManagerEmail: null,
    hrName: null,
    hrContact: null,
    hrEmail: null,
    interviewerName: null,
    interviewerContact: null,
    interviewerEmail: null,
    financeName: null,
    financeEmail: null,
    financeContact: null,
    url: null,
    address: null,
    description: null,
    billingAddress: null,
    operationalAddress: null,
    panNumber: null,
    gstNumber: null,
    tanNumber: null,
    creditPeriod: null,
    dateOfInvoice: null,
    mapLink: null,
    nationality: null,
    needTimesheet: null,
    needMachine: null,
    isWeekendWorking: null,
    isAgreementSigned: null,
    isFirstInvoiceSend: null,
    needPhysicalCopy: null,
    needPFProof: null,
    purchaseOrderRequired: null,
    isExternalProduct: null,
  });

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <CustomNavigationBar back={true} headername="Add Client" />
        <ScrollView style={GLOBALSTYLE.mainContainer}>
          {/*For client Name */}
          <TextInput
            placeholder="Enter Client Name*"
            style={[GLOBALSTYLE.TextInputStyle, {marginTop: 10}]}
            value={data.clientName}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  clientName: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Reporting Manager Name */}
          <TextInput
            placeholder="Enter Reporting Manager Name*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.reportManagerName}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  reportManagerName: vlaue,
                };
              });
            }}
            keyboardType="default"
          />
          {/*For Reporting Manager Contact */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.reportManagerContact}
              style={{flex: 1}}
              maxLength={10}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    reportManagerContact: vlaue,
                  };
                });
              }}
              keyboardType="numeric"
            />
          </View>
          {/*For Reporting Manager Email */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.reportManagerEmail}
              style={{flex: 1}}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    reportManagerEmail: vlaue,
                  };
                });
              }}
              keyboardType="email-address"
            />
          </View>

          {/*For HR Name */}
          <TextInput
            placeholder="Enter HR Name*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.hrName}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  hrName: vlaue,
                };
              });
            }}
            keyboardType="default"
          />
          {/*For HR Contact */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.hrContact}
              style={{flex: 1}}
              maxLength={10}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    hrContact: vlaue,
                  };
                });
              }}
              keyboardType="numeric"
            />
          </View>
          {/*For HR Email */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.hrEmail}
              style={{flex: 1}}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    hrEmail: vlaue,
                  };
                });
              }}
              keyboardType="email-address"
            />
          </View>

          {/*For Interviewer Name */}
          <TextInput
            placeholder="Enter Interviewer Name*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.interviewerName}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  interviewerName: vlaue,
                };
              });
            }}
            keyboardType="default"
          />
          {/*For Interviewer Contact */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.interviewerContact}
              style={{flex: 1}}
              maxLength={10}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    interviewerContact: vlaue,
                  };
                });
              }}
              keyboardType="numeric"
            />
          </View>
          {/*For Interviewer Email */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.interviewerEmail}
              style={{flex: 1}}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    interviewerEmail: vlaue,
                  };
                });
              }}
              keyboardType="email-address"
            />
          </View>

          {/*For Finance Name */}
          <TextInput
            placeholder="Enter Finance Name*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.financeName}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  financeName: vlaue,
                };
              });
            }}
            keyboardType="default"
          />
          {/*For Finance Contact */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.financeContact}
              style={{flex: 1}}
              maxLength={10}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    financeContact: vlaue,
                  };
                });
              }}
              keyboardType="numeric"
            />
          </View>
          {/*For Finance Email */}
          <View style={GLOBALSTYLE.uploadRowView}>
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
              value={data.financeEmail}
              style={{flex: 1}}
              onChangeText={vlaue => {
                return setData(prevData => {
                  return {
                    ...prevData,
                    financeEmail: vlaue,
                  };
                });
              }}
              keyboardType="email-address"
            />
          </View>

          {/*For URL */}
          <TextInput
            placeholder="Enter URL*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.url}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  url: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Address */}
          <TextInput
            placeholder="Enter Address*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.address}
            multiline={true}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  address: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Description */}
          <TextInput
            placeholder="Enter Description*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.description}
            multiline={true}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  description: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Billing Address */}
          <TextInput
            placeholder="Enter Billing Address*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.billingAddress}
            multiline={true}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  billingAddress: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Operational Address */}
          <TextInput
            placeholder="Enter Operational Address*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.operationalAddress}
            multiline={true}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  operationalAddress: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For PAN Number */}
          <TextInput
            placeholder="Enter PAN Number*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.panNumber}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  panNumber: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For GST Number */}
          <TextInput
            placeholder="Enter GST Number*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.gstNumber}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  gstNumber: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For TAN Number */}
          <TextInput
            placeholder="Enter TAN Number*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.tanNumber}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  tanNumber: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Credit Period */}
          <TextInput
            placeholder="Enter Credit Period*"
            style={GLOBALSTYLE.TextInputStyle}
            value={data.creditPeriod}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  creditPeriod: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Date Of Invoice */}
          <DropDownPicker
            style={[styles.dropdownViewStyle, styles.dropDownAligner]}
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
                    // dispatcher({
                    //   type: 'dateOfInvoice',
                    //   payload: item.value,
                    // });
                    // dispatcher({
                    //   type: 'dateOfInvoiceError',
                    //   payload: null,
                    // });
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
            style={GLOBALSTYLE.TextInputStyle}
            value={data.mapLink}
            onChangeText={vlaue => {
              return setData(prevData => {
                return {
                  ...prevData,
                  mapLink: vlaue,
                };
              });
            }}
            keyboardType="default"
          />

          {/*For Nationality */}
          <DropDownPicker
            style={[styles.dropdownViewStyle, styles.dropDownAligner]}
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
                    // dispatcher({
                    //   type: 'nationality',
                    //   payload: item.value,
                    // });
                    // dispatcher({
                    //   type: 'nationalityError',
                    //   payload: null,
                    // });
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
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  needTimesheet: value,
                };
              })
            }
          />

          {/*For Need Timesheet */}
          <CustomRadioButtons
            value={radioValues.needMachine}
            title="Do you need machine?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  needMachine: value,
                };
              })
            }
          />

          {/*For weekend working */}
          <CustomRadioButtons
            value={radioValues.isWeekendWorking}
            title="Weekend working?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  isWeekendWorking: value,
                };
              })
            }
          />

          {/*For Agreement Sign */}
          <CustomRadioButtons
            value={radioValues.isAgreementSigned}
            title="Agreement Sign?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  isAgreementSigned: value,
                };
              })
            }
          />

          {/*For First Invoice Send */}
          <CustomRadioButtons
            value={radioValues.isFirstInvoiceSend}
            title="First Invoice Send?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  isFirstInvoiceSend: value,
                };
              })
            }
          />

          {/*For Physical copy needed */}
          <CustomRadioButtons
            value={radioValues.needPhysicalCopy}
            title="Physical copy needed?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  needPhysicalCopy: value,
                };
              })
            }
          />

          {/*For PF Proof needed */}
          <CustomRadioButtons
            value={radioValues.needPFProof}
            title="PF Proof needed?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  needPFProof: value,
                };
              })
            }
          />

          {/*For Purchase Order Required */}
          <CustomRadioButtons
            value={radioValues.purchaseOrderRequired}
            title="Is Purchase Order Required?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  purchaseOrderRequired: value,
                };
              })
            }
          />

          {/*For Purchase Order Required */}
          <CustomRadioButtons
            value={radioValues.isExternalProduct}
            title="Is External Product?*"
            onPressFunction={value =>
              setRadioValues(prevValues => {
                return {
                  ...prevValues,
                  isExternalProduct: value,
                };
              })
            }
          />

          <TouchableOpacity
            style={[styles.btnStyle, styles.submitBtnAligner]}
            onPress={() => {}}>
            <Text style={styles.submitBtnTextStyle}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default AddClient;

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollview: {
    paddingVertical: 10,
    paddingHorizontal: 20,
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
