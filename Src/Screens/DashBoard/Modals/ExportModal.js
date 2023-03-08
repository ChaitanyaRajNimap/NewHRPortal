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

  //for handling send
  const handleSend = () => {
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
      Mailer.mail(
        {
          subject: 'AutoMail: Current Resource Details',
          recipients: [`${inputs.email}`],
          ccRecipients: ['test1@gmail.com'],
          body: '<b>Hi</b>\n<p>Please check attached Current Resource file</p>',
          isHTML: true,
          // attachments: [
          //   {
          //     path: '',
          //     uri: '',
          //     type: '',
          //     name: '',
          //   },
          // ],
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
    }
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

  console.log(inputs.action);

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
    // backgroundColor: '#f00',
    borderRadius: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.grey,
    paddingHorizontal: 15,
  },
});
