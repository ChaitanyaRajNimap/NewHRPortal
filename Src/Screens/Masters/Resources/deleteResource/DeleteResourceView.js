import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import DateTimePicker from '@react-native-community/datetimepicker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const DeleteResourceView = ({onCancel}) => {
  const [date, setDate] = useState(new Date(Date.now()));
  const [datePicker, setDatePicker] = useState(false);
  const [displayDate, setDisplayDate] = useState('dd----yyyy');

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

    return [year, month, day].join('/');
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
  };

  const showDatePicker = () => {
    setDatePicker(true);
  };

  return (
    <View style={styles.rootContainer}>
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
        <View style={styles.btnConatiner}>
          <SmallButton
            color={COLORS.grey}
            title={'Cancel'}
            onPressFunction={() => {
              onCancel();
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DeleteResourceView;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  conatiner: {
    height: 250,
    width: 270,
    paddingVertical: 35,
    paddingHorizontal: 30,
    borderRadius: 20,
    borderWidth: 1,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.black,
    marginVertical: 20,
    marginHorizontal: 1,
    padding: 15,
  },
  verticalSpace: {height: 16},
  btnConatiner: {alignItems: 'center'},
});
