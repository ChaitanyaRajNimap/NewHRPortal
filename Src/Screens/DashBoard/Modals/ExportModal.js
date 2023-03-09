import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  Linking,
} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import validation from '../../../Util/helper';
import SmallButton from '../../../Components/SmallButton';
import CustomDownloadRadioBtn from '../../../Components/CustomDownloadRadioBtn';
import XLSX from 'xlsx';
import RNFS from 'react-native-fs';
import {writeFile} from 'react-native-fs';
import Share from 'react-native-share';
import {MailComposer} from 'react-native-mail';
import Mailer from 'react-native-mail';
// import ExcelJS from 'exceljs-node';
// import moment from 'moment';

const ExportModal = ({
  onCancel,
  currRes,
  dashUpcomingRes,
  dashProjectTarget,
}) => {
  const [resOpen, setResOpen] = useState(false);
  const [resValue, setResValue] = useState(null);
  const [resItems, setResItems] = useState([
    {
      value: 'Current Resource Export',
      label: 'Current Resource Export',
    },
    {
      value: 'Upcoming Resource Export',
      label: 'Upcoming Resource Export',
    },
    {
      value: 'Project Export',
      label: 'Project Export',
    },
  ]);

  const [radioValue, setRadioValue] = useState(null);

  const [inputs, setInputs] = useState({
    res: null,
    action: null,
    email: null,
  });
  const [error, setError] = useState({
    resError: null,
    actionError: null,
    emailError: null,
  });

  const [formatedData, setFormatedData] = useState({
    currResFData: null,
    dashUpcomingResFData: null,
    dashProjectTargetFData: null,
  });

  //For formatting res data
  useEffect(() => {
    let currResFormatedData = formatCurrResData(currRes);
    let upcomingResFormatedData = formatUpcomingResData(dashUpcomingRes);
    let projectTargetFormatedData = formatProjectTargetData(dashProjectTarget);
    if (
      currResFormatedData &&
      upcomingResFormatedData &&
      projectTargetFormatedData
    ) {
      setFormatedData(prevData => {
        return {
          ...prevData,
          currResFData: currResFormatedData,
          dashUpcomingResFData: upcomingResFormatedData,
          dashProjectTargetFData: projectTargetFormatedData,
        };
      });
    }
  }, []);

  //For formatting curr res data
  const formatCurrResData = data => {
    const result = data.map(item => {
      return {
        Name: item.fname && item.lname ? item.fname + ' ' + item.lname : '--',
        Email: item.email ? item.email : '--',
        MobileNo: item.phone ? item.phone : '--',
        Address: item.resident_address ? item.resident_address : '--',
        Technology: item.Technology ? item.Technology : '--',
        VendorName: item.company_name ? item.company_name : '--',
        Experience: item.exp_date ? item.exp_date : '--',
        SR: item.successRatio ? item.successRatio : '--',
        CV: item.resume ? item.resume : '--',
        Idle: item.idleDays ? item.idleDays : '--',
      };
    });
    return result;
  };

  //For formatting curr res data
  const formatUpcomingResData = data => {
    const result = data.map(item => {
      return {
        Name: item.fname && item.lname ? item.fname + ' ' + item.lname : '--',
        Address: item.resident_address ? item.resident_address : '--',
        Technology: item.Technology ? item.Technology : '--',
        Experience: item.exp_date ? item.exp_date : '--',
        CV: item.resume ? item.resume : '--',
        ClientName: item.client_name ? item.client_name : '--',
        EndDate: item.end_date
          ? new Date(item.end_date)
              .toDateString('en-US', {})
              .split(' ')
              .slice(1)
              .join(' ')
          : '--',
      };
    });
    return result;
  };

  //For formatting curr res data
  const formatProjectTargetData = data => {
    const result = data.map(item => {
      return {
        Name: item.fname && item.lname ? item.fname + ' ' + item.lname : '--',
        Address: item.resident_address ? item.resident_address : '--',
        Technology: item.Technology ? item.Technology : '--',
        Experience: item.exp_date ? item.exp_date : '--',
        CV: item.resume ? item.resume : '--',
        ClientName: item.client_name ? item.client_name : '--',
        OnProject: item.on_project ? item.on_project : '--',
      };
    });
    return result;
  };

  //for handling send
  const handleSend = async () => {
    let err = validation.validateEmail(inputs.email);
    setError(prevIp => {
      return {
        ...prevIp,
        emailError: err,
      };
    });
    if (!err) {
      console.log('ID TO SEND MAIL :', inputs.email);
      setInputs(prevIp => {
        return {
          ...prevIp,
          email: null,
        };
      });
      setError(prevIp => {
        return {
          ...prevIp,
          emailError: null,
        };
      });
      // console.log('Cho9sse: ', inputs.res);
      if (inputs.res === 'Current Resource Export') {
        const excelFile = await createExcelFile(
          formatedData.currResFData,
          'current-resource',
        );
        await sendEmail(excelFile, 'Current Resource');
      } else if (inputs.res === 'Upcoming Resource Export') {
        const excelFile = await createExcelFile(
          formatedData.dashUpcomingResFData,
          'upcoming-resource',
        );
        await sendEmail(excelFile, 'Upcoming Resource');
      } else if (inputs.res === 'Project Export') {
        const excelFile = await createExcelFile(
          formatedData.dashProjectTargetFData,
          'project',
        );
        await sendEmail(excelFile, 'Project');
      }
      onCancel();
    }
  };

  //For creating Excel file from list
  const createExcelFile = async (data, fileName) => {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
    const excelData = XLSX.write(workbook, {type: 'base64', bookType: 'xlsx'});
    // console.log('excelData', excelData);
    const file = `${RNFS.DocumentDirectoryPath}/${fileName}.xlsx`;
    await RNFS.writeFile(file, excelData, 'base64');
    return file;
  };

  //For sending email with excel attachment
  const sendEmail = (excelFile, resName) => {
    Mailer.mail(
      {
        subject: `AutoMail: ${resName} Details`,
        recipients: [`${inputs.email}`],
        ccRecipients: ['test1@gmail.com'],
        body: `<b>Hi</b>\n<p>Please check attached ${resName} file</p>`,
        isHTML: true,
        attachments: [
          {
            path: excelFile,
            uri: '',
            type: '',
            name: '',
          },
        ],
      },
      (error, event) => {
        Alert.alert(
          error,
          event,
          [
            {
              text: 'Ok',
              onPress: () => console.log('OK: Email Error Response'),
            },
            {
              text: 'Cancel',
              onPress: () => console.log('CANCEL: Email Error Response'),
            },
          ],
          {cancelable: true},
        );
      },
    );
  };

  //For handling download
  const handleDownload = () => {
    const worksheet = XLSX.utils.json_to_sheet(currRes);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Current Resources');
    // Convert the workbook to a binary string
    const excelData = XLSX.write(workbook, {type: 'base64'});
    console.log('excelData', excelData);
    //   // Convert the binary string to a Uint8Array
    //   const buffer = new ArrayBuffer(excelData.length);
    //   const view = new Uint8Array(buffer);
    //   for (let i = 0; i < excelData.length; i++) {
    //     view[i] = excelData.charCodeAt(i) & 0xff;
    //   }
    //   // Write the binary data to the file
    const path = RNFS.DocumentDirectoryPath + '/curr-res.xlsx';
    RNFS.writeFile(path, excelData, 'base64')
      .then(() => {
        // Share the file
        Share.open({url: `file://${path}`, type: 'application/vnd.ms-excel'});
      })
      .catch(error => {
        console.error('Error saving file:', error);
      });
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.modalView}>
        <Text style={styles.headerText}>Export</Text>
        <KeyboardAvoidingView enabled>
          {/*For select option */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Select Option<Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <DropDownPicker
              style={[styles.dropdownViewStyle, styles.dropDownAligner]}
              placeholder="Select"
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setResValue(item.value);
                      setResOpen(false);
                      setInputs(prevIp => {
                        return {
                          ...prevIp,
                          res: item.value,
                        };
                      });
                      let err = validation.validateField(item.value);
                      setError(prevErr => {
                        return {
                          ...prevErr,
                          resError: err,
                        };
                      });
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={resOpen}
              value={resValue}
              items={resItems}
              setOpen={setResOpen}
              setItems={setResItems}
            />
            <Text style={styles.errorText}>{error.resError}</Text>
          </View>
          {/*For Download or send */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Download or Send<Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <CustomDownloadRadioBtn
              value={radioValue}
              title={null}
              onPressFunction={value => {
                let action = value === 0 ? 'Download' : 'Send';
                setInputs(prevIp => {
                  return {
                    ...prevIp,
                    action: action,
                  };
                });
                let err = validation.validateField(action);
                setError(prevErr => {
                  return {
                    ...prevErr,
                    actionError: err,
                  };
                });
                setRadioValue(value);
              }}
            />
            <Text style={styles.errorText}>{error.resError}</Text>
          </View>
          {inputs.action === 'Send' ? (
            <View style={styles.inputContainer}>
              <Text style={styles.label}>
                Email<Text style={{color: COLORS.red}}>*</Text>
              </Text>
              <TextInput
                placeholder=""
                style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
                value={inputs.email}
                onChangeText={value => {
                  setInputs(prevIp => {
                    return {
                      ...prevIp,
                      email: value,
                    };
                  });
                  let err = validation.validateEmail(value);
                  setError(prevErr => {
                    return {
                      ...prevErr,
                      emailError: err,
                    };
                  });
                }}
                keyboardType="default"
              />
              <Text style={styles.errorText}>{error.emailError}</Text>
            </View>
          ) : null}
          <View style={styles.upperViewStyle}>
            {inputs.action === 'Send' ? (
              <SmallButton
                color={COLORS.lightBlue}
                title={'Send'}
                onPressFunction={handleSend}
                customStyles={{marginHorizontal: 5}}
              />
            ) : (
              <SmallButton
                color={COLORS.lightBlue}
                title={'Download'}
                onPressFunction={handleDownload}
                customStyles={{marginHorizontal: 5}}
              />
            )}
            <SmallButton
              color={COLORS.grey}
              title={'Cancel'}
              onPressFunction={() => {
                onCancel();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default ExportModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    width: 350,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 30,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerText: {
    marginBottom: 20,
    color: COLORS.black,
    fontSize: 18,
  },
  inputContainer: {marginBottom: 0},
  label: {
    color: COLORS.black,
    fontSize: 15,
  },
  dropdownViewStyle: {
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: COLORS.grey,
    marginTop: 10,
    marginHorizontal: 10,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  dropDownContainerStyle: {
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: COLORS.grey,
  },
  dropDownPlaceholderStyle: {
    color: 'gray',
    fontSize: 14,
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
  dropDownAligner: {
    marginHorizontal: 15,
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginHorizontal: 5,
  },
  upperViewStyle: {flexDirection: 'row'},
  inputAligner: {
    width: 290,
    borderRadius: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.grey,
    paddingHorizontal: 15,
  },
});
