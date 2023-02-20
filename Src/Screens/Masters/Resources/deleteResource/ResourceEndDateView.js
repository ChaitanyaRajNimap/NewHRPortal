import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import validation from '../../../../Util/helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResourceEndDateView = ({closeModal, idToDel, previewMailFun}) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [datePicker, setDatePicker] = useState(false);
  const [displayDate, setDisplayDate] = useState('dd----yyyy');

  const [resEndDate, setResEndDate] = useState(null);
  const [dateErr, setDateErr] = useState(null);

  //For storing mail body
  const [mailBody, setMailBody] = useState(null);

  const convertDate = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let month = '' + (tempDate.getMonth() + 1),
      day = '' + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    // return [year, month, day].join('/');
    return [day, month, year].join('/');
  };

  //Covert to send in post req
  const convertDateToSend = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let month = '' + (tempDate.getMonth() + 1),
      day = '' + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [year, month, day].join('-');
  };

  const onDateSelected = (event, value) => {
    setDatePicker(false);
    setDate(value);
    setDisplayDate(convertDate(value));
    setResEndDate(convertDate(value));
    setDateErr(null);
  };

  //For enabling date picker
  const showDatePicker = () => {
    setDatePicker(true);
  };

  //For getting mail body when page loads
  useEffect(() => {
    reqForMailBody(idToDel);
  }, []);

  //For previewing mail
  const previewMail = () => {
    let endDateErr = validation.validateField(resEndDate);
    if (endDateErr) {
      setDateErr(endDateErr);
      return;
    }
    setDateErr(null);
    // console.log('Preview Mail Clicked!', idToDel, resEndDate, date);
    previewMailFun(resEndDate, mailBody);
  };

  const reqForMailBody = async id => {
    const authToken = await AsyncStorage.getItem('token');
    try {
      const response = await fetch(
        `http://144.91.79.237:8905/api/resource/${id}/delete-mail-template`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        },
      );
      const json = await response.json();
      // console.log('MAIL BODY RES ==========>', json.data);
      setMailBody(json.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.conatiner}>
      <Text style={styles.title}>Resource End Date</Text>
      <TouchableOpacity style={styles.dateBtnStyle} onPress={showDatePicker}>
        <Text style={{color: COLORS.black}}>{displayDate}</Text>
        <FontAwesome
          name="calendar-o"
          size={20}
          style={{alignSelf: 'center'}}
        />
      </TouchableOpacity>
      {datePicker === true ? (
        <DateTimePicker
          value={date}
          mode={'date'}
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          is24Hour={true}
          onChange={onDateSelected}
        />
      ) : null}
      {dateErr !== null && <Text style={styles.errorText}>{dateErr}</Text>}
      <View style={styles.upperViewStyle}>
        <View>
          <SmallButton
            color={COLORS.red}
            title={'Preview Mail'}
            onPressFunction={previewMail}
          />
        </View>
        <View>
          <SmallButton
            color={COLORS.grey}
            title={'Cancel'}
            onPressFunction={() => {
              closeModal();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default ResourceEndDateView;

const styles = StyleSheet.create({
  conatiner: {
    height: 250,
    paddingVertical: 35,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    color: COLORS.black,
    fontSize: 22,
    textAlign: 'center',
  },
  dateBtnStyle: {
    width: 150,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.black,
    marginTop: 20,
    marginBottom: 5,
    marginHorizontal: 1,
    padding: 15,
    alignSelf: 'center',
  },
  verticalSpace: {height: 16},
  dateConatiner: {alignItems: 'center'},
  upperViewStyle: {flexDirection: 'row'},
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginVertical: 2,
    paddingHorizontal: 2,
    alignSelf: 'center',
  },
});
