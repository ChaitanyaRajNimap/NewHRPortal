import React, {useEffect, useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import dayjs from 'dayjs';
import validation from '../../Util/helper';
import {COLORS} from '../../Constants/Theme';

export default function Export({Onpress, ondatatSend}) {
  const initialState = {
    mail: ' ',
  };
  const [opendropdown, setOpenDropdown] = useState(false);
  const [value, setValue] = useState(['selecte Month']);
  const [Mail, SetMail] = useState(initialState);
  const [MailError, SetMailError] = useState('');
  const [MonthPicker, setMonthPicker] = useState([]);
  const [submit, setSubmit] = useState([]);
  const [addmonth, setAddmonth] = useState([]);
  const [IsFocused, setIsFocused] = useState(false);

  console.log(dayjs().format('YYYY-MM-DD'));

  const MonthYear = () => {
    const months = [];
    let items = [];
    let currentDate = dayjs().format('YYYY-MM-DD');
    let currentMonth = dayjs(currentDate);
    const endDate = dayjs('2000-12-31');
    while (currentMonth.isAfter(endDate)) {
      let mon = currentMonth.format('MMMM YYYY');
      months.push(mon);
      currentMonth = currentMonth.subtract(1, 'month');
    }
    for (let i = 0; i < months.length; i++) {
      let item = {id: i, month: months[i]};
      items.push(item);
    }
    setMonthPicker(items); // log the array of month-year combinations
  };

  useEffect(() => {
    MonthYear();
  }, []);

  console.log('vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv', value);

  const HandelSubmit = value => {
    setValue(value);
    setSubmit([...submit, value]);
    setOpenDropdown(false);
  };

  const add = submit => {
    let newArray = [];
    console.log('sssssssssssssssssss', submit.length);
    for (let i = 0; i < submit.length; i++) {
      let item;
      item = {id: i, month: submit[i]};
      console.log('yyyyyyyyyyy', item);
      newArray.push(item);
    }
    setAddmonth(newArray);
    console.log('newArrayyyyyyyyyyyy', newArray);
  };

  useEffect(() => {
    add(submit);
  }, []);

  console.log('addmonth=============================', addmonth);
  const removeMonth = month => {
    setSubmit(prevtSubmit => prevtSubmit.filter(m => m !== month));
  };

  const HandelMail = text => {
    console.log('text=>>>>>>>>>>>>', text);
    SetMail(preValue => {
      return {
        ...preValue,
        mail: text,
      };
    });
  };
  console.log('Mail', Mail);

  const Validate = value => {
    console.log('maiiiiiiiiiiiiiiiiii', value.mail);
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const error = {};
    if (value.mail.length < 1) {
      error.Mail = 'Please Write something';
    } else if (!reg.test(value.mail)) {
      error.Mail = 'Email address is invalid!';
    }
    return error;
  };

  //  useEffect(()=>{
  //   SetMailError(Validate(Mail))
  // },[Mail.mail])

  console.log('rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', MailError);

  const handleFocus = () => setIsFocused(true);

  //  const onSend=()=>{
  //  SetMailError(Validate(Mail))
  let array = {
    months: submit,
    email: Mail.mail,
  };

  const Datatosend = async array => {
    SetMailError(Validate(Mail));
    ondatatSend(array);
  };

  //  }
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          backgroundColor: COLORS.white,
          width: '80%',
          height: 300,
          padding: 10,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 1.84,
          shadowColor: '#000',
          elevation: 20,
          borderRadius: 10,
          paddingVertical: 15,
        }}>
        <View>
          <Text style={{fontSize: 20}}>Email*</Text>
          <View
            style={{
              borderWidth: 2.8,
              padding: 10,
              flexDirection: 'row',
              justifyContent: 'space-between',
              borderRadius: 10,
              alignItems: 'center',
              borderColor: COLORS.grey,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: 'black',
                position: 'absolute',
                bottom: submit.length == 0 ? 19 : 43,
                left: 10,
                backgroundColor: submit.length == 0 ? 'white' : 'white',
                overflow: 'hidden',
              }}>
              Selected Month
            </Text>
            <FlatList
              data={submit}
              horizontal
              keyExtractor={item => item}
              renderItem={({item}) => (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    zIndex: 100,
                  }}>
                  <View
                    style={{
                      backgroundColor: 'grey',
                      marginHorizontal: 10,
                      flexDirection: 'row',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 10,
                    }}>
                    <Text style={{fontSize: 16, color: 'white'}}>{item}</Text>
                    <TouchableOpacity onPress={() => removeMonth(item)}>
                      <Entypo name="cross" size={18} color={COLORS.white} />
                    </TouchableOpacity>
                  </View>
                </View>
              )}
            />
            <TouchableOpacity
              onPress={() => setOpenDropdown(!opendropdown)}
              style={{
                transform: opendropdown
                  ? [{rotate: '180deg'}]
                  : [{rotate: '0deg'}],
              }}>
              <MaterialIcons
                name="keyboard-arrow-down"
                size={30}
                color={COLORS.lightBlue}
              />
            </TouchableOpacity>
          </View>

          {opendropdown && (
            <View
              style={{
                backgroundColor: 'white',
                margin: 10,
                paddingHorizontal: 10,
                height: 200,
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1.84,
                shadowColor: '#000',
                elevation: 20,
                borderRadius: 10,
                paddingTop: 5,
                position: 'absolute',
                width: '100%',
                top: 90,
                zIndex: 100,
                left: -8,
              }}>
              <FlatList
                data={MonthPicker}
                renderItem={({item}) => (
                  <TouchableOpacity onPress={HandelSubmit}>
                    <Text
                      style={style.Text}
                      onPress={() => HandelSubmit(item.month)}>
                      {item.month}
                    </Text>
                  </TouchableOpacity>
                )}
                // keyExtractor={item => console.log(item.id)}
              />
            </View>
          )}
          <View>
            <TextInput
              value={Mail}
              style={{
                width: '100%',
                height: 200,
                backgroundColor: COLORS.white,
                height: 50,
                padding: 10,
                borderRadius: 10,
                fontSize: 16,
                borderColor: COLORS.grey,
                borderWidth: 2.5,
                marginTop: 30,
              }}
              onChangeText={text => HandelMail(text)}
              onFocus={handleFocus}
            />
            <Text
              style={{
                color: 'black',
                position: 'absolute',
                bottom: IsFocused ? 42 : 19,
                left: 10,
                backgroundColor: IsFocused ? 'white' : 'white',
                overflow: 'hidden',
              }}>
              Email
            </Text>
          </View>
          <Text style={{color: 'red', paddingLeft: 5}}>{MailError.Mail}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={[style.Btn, {backgroundColor: COLORS.lightBlue}]}
            onPress={() => Datatosend(array)}>
            <Text style={style.ButtonText}>Send</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[style.Btn, {backgroundColor: COLORS.grey}]}
            onPress={Onpress}>
            <Text style={style.ButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  Text: {
    fontSize: 18,
    color: 'grey',
    marginVertical: 5,
  },
  Btn: {
    backgroundColor: 'red',
    fontSize: 25,
    paddingHorizontal: 40,
    paddingVertical: 10,
    borderRadius: 10,
  },
  ButtonText: {
    fontSize: 20,
    color: 'white',
  },
});

// <ScrollView style={{backgroundColor:"white",margin:10,paddingHorizontal:10,height:200,shadowOffset: {
//   width: 0,
//   height: 2,
// },
// shadowOpacity: 0.25,
// shadowRadius: 1.84,
// shadowColor: '#000',
// elevation:20,
// borderRadius:10,
// paddingTop:20
// }}>
// <TouchableOpacity onPress={()=>setValue("January")}>
// <Text style={style.Text}>January 2021</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=>setValue("February")}>
// <Text style={style.Text}>January 2021</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=>setValue("March")}>
// <Text style={style.Text}>January 2021</Text>
// </TouchableOpacity>
// <TouchableOpacity onPress={()=>setValue("April")}>
// <Text style={style.Text}>January 2021</Text>
// </TouchableOpacity>
// </ScrollView>
