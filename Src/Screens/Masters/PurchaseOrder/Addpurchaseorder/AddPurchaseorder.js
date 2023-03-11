import React, {useState, useEffect, useReducer} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Platform,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomNavigationBar from '../../../../Components/CustomNavigationBar';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../../../../Constants/Theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DocumentPicker from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import {initalState, reducer} from './addPurchaseFormData';
import validation from '../../../../Util/helper';
import {addPurchaseOrder} from '../../../../Redux/Actions/PurchaseOrderAction';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {MultipleSelectList} from 'react-native-dropdown-select-list';

export default function AddPurchaseorder({navigation}) {
  const dispatch = useDispatch();
  const reducerdata = useSelector(state => state.PurchaseOrderReducer);
  // console.log('reducerDataAdd', reducerdata.getResorceData);
  // console.log('reducerDataAdd', reducerdata.getResorceData)
  const [formData, dispatcher] = useReducer(reducer, initalState);
  // const [resourceopen, setResourceOpen] = useState(false);
  // const [resourceValue, setResourceValue] = useState(null);
  const [resourceItem, setResourceItem] = useState([]);
  const [clientopen, setclientopen] = useState(false);
  const [clientValue, setclientValue] = useState(null);
  const [clientItems, setclientItems] = useState([]);
  const [Selected, setSelected] = useState([]);
  const [date, setDate] = useState({
    startDate: new Date(Date.now()),
    endDate: new Date(Date.now()),
  });
  const [displayDate, setDisplayDate] = useState({
    startDate: 'Start Date',
    endDate: 'End Date',
  });

  const [datePicker, setDatePicker] = useState({
    startDatePicker: false,
    endDatePicker: false,
  });

  // console.log("orderNumber=>>>>>>>",OrderNumber)

  const selectResume = async (fileName, Error) => {
    try {
      let file = await DocumentPicker.pickSingle({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.plainText,
          DocumentPicker.types.docx,
        ],
      });
      console.log('file -------', file);
      dispatcher({
        type: fileName,
        payload: {file: file, name: file.name},
      });

      dispatcher({
        type: Error,
        payload: validation.validatefile(file),
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
    console.log('presssssssssssssssss');
    const resumeError = validation.validatefile(formData.resume.file);
    const clientError = validation.validateField(formData.client);
    const resourceError = validation.validateField(formData.resource);
    const startDateError = validation.validateField(formData.startDate);
    const EndDateError = validation.validateField(formData.EndDate);
    const OrderError = validation.validateField(formData.Order.order_number);
    if (
      resourceError ||
      clientError ||
      resumeError ||
      startDateError ||
      EndDateError ||
      OrderError
    ) {
      dispatcher({type: 'resumeError', payload: resumeError});
      dispatcher({type: 'clientError', payload: clientError});
      dispatcher({type: 'resourceError', payload: resourceError});
      dispatcher({type: 'startDateError', payload: startDateError});
      dispatcher({type: 'EndDateError', payload: EndDateError});
      dispatcher({type: 'OrderError', payload: OrderError});
      return;
    }

    dispatcher({type: 'resumeError', payload: null});
    dispatcher({type: 'resumeError', payload: null});
    dispatcher({type: 'resourceError', payload: null});
    dispatcher({type: 'startDateError', payload: null});
    dispatcher({type: 'EndDateError', payload: null});
    dispatcher({type: 'clientError', payload: null});
    dispatcher({type: 'OrderError', payload: null});
    // fun(formData)
    //  ( formData.client.id)
    console.log('formData', formData.resume);
    let data = convertData(formData);
    // dispatch(addPurchaseOrder(data,navigation))
  };

  let result;

  const convertData = formData => {
    result = formData.Order.order_number;
    console.log('typeof', typeof result);
    const newData = new FormData();
    newData.append('resource_id', [formData.resource.id]);
    newData.append('client_id', formData.client.id);
    newData.append('order_number', Number(result));
    newData.append('start_date', formData.startDate);
    newData.append('end_date', formData.EndDate);
    //  newData.append('title', 'Slang');
    //  newData.append('description', 'A Unseen Gamer');
    newData.append('pdf_file', formData.resume.file.uri);
    return newData;
  };
  //    let fun=(formData)=> {
  //     console.log("function inside",formData,formData.resume.file.uri)
  //     console.log("function called")
  //     // const newData=new FormData()
  //     //  newData.append('resource_id', [formData.resource.id]);
  //     //  newData.append('client_id', formData.client.id)
  //     //  newData.append('order_number',(JSON.stringify(formData.Order.order_number)));
  //     //  newData.append( "start_date",formData.startDate,);
  //     //  newData.append( "end_date",formData.EndDate);
  //     //  newData.append('title', 'Slang');
  //     //  newData.append('description', 'A Unseen Gamer');
  //     //  newData.append( "pdf_file", {uri: formData.resume.file.uri, name: formData.resume.file.name, type: formData.resume.file.type});
  //     ;

  // const Data=new FormData()
  // // Data.append('newData', {
  // //   "string": JSON.stringify(newData), //This is how it works :)
  // //   type: 'application/json'
  // // });
  // Data.append("pdf_file",{uri: formData.resume.file.uri, name: formData.resume.file.name, type: formData.resume.file.type})

  // const newData={
  //   "response_id":318,
  //   "client_id":255,
  //    "order_number":"6545",
  //    "start_date":"2022-14-02",
  //    "end_date":"2022-14-02",
  //    'title':'Slang',
  //    'description': 'A Unseen Gamer'
  // }

  // console.log("DAaaaaaaaaaaaaa",Data)

  //   var config = {
  //     method:'post',
  //     url: 'http://144.91.79.237:8905/api/purchase',
  //     maxBodyLength: Infinity,
  //     headers: {
  //      Authorization:' Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTUzLCJlbWFpbCI6InRlc3RAbmltYXBpbmZvdGVjaC5jb20iLCJpYXQiOjE2NzU0ODk4MzUsImV4cCI6MTY3NTU3NjIzNX0.ilzoUho5yyyOyrgjop4w81Ai3IfxGo6TXhqsoZmPfl8',
  //         'Content-Type': 'multipart/form-data',
  //     },
  //     body:{Data,newData},
  //   };
  //   console.log("newData",newData)

  //   axios(config)
  //     .then(function (response) {
  //       return response.json();
  //       // console.log(JSON.stringify(response.data));
  //     })
  //     .catch(function (error) {
  //       console.log(error.message,error.response);
  //     });
  // };

  const ResourceList = () => {
    //  console.log("resffsdg",reducerdata.getResorceData)
    if (reducerdata.getResorceData != null) {
      let newArray = [];
      for (var i of reducerdata.getResorceData) {
        console.log('i=>>>>>>>>>>>>>>>>>>', i);
        let item;
        if (i.fname || i.lname) {
          if (i.fname && i.lname !== null) {
            // console.log("ifname,lname",i.fname,i.lname)
            item = {id: i.id, value: `${i.fname} ${i.lname}`, key: i.id};
          }
          newArray.push(item);
        }
      }
      setResourceItem(newArray);
    }
  };

  useEffect(() => {
    ResourceList();
  }, [reducerdata.getResorceData]);

  useEffect(() => {
    ClientList();
  }, [reducerdata.getClientData]);

  // console.log(' ResourceList ',  ResourceList() );

  const ClientList = () => {
    if (reducerdata.getClientData !== null) {
      let newArray1 = [];
      // console.log("jdhfuiiiiiiiii=????????",reducerdata.getClientData);
      for (var i of reducerdata.getClientData) {
        // console.log("i=>>>>>>>>>>>>>>>>>>cientssssssssss",i)
        let item;
        if (i.client_name) {
          if (i.client_name !== null) {
            // console.log("i.client_name",i.client_name)
            item = {id: i.id, label: `${i.client_name}`, value: i.id};
          }
          newArray1.push(item);
        }
      }
      setclientItems(newArray1);
    }
  };
  // console.log("open",open1)

  const convertDate = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      '/' +
      (tempDate.getMonth() + 1) +
      '/' +
      tempDate.getFullYear();
    console.log(fDate);
    return fDate;
  };
  const convertDateToSend = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    console.log('TEMPDATE :', tempDate);
    let month = '' + (tempDate.getMonth() + 1),
      day = '' + tempDate.getDate(),
      year = tempDate.getFullYear();

    console.log('DATE :_', month, day, year);

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    console.log([year, month, day].join('-'));
    return [year, month, day].join('-');
  };

  // console.log("convertsenddate=>>>>>>>>>>",convertDateToSend(value))
  function onStartDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, startDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, startDate: convertDate(value)};
    });

    dispatcher({
      type: 'startDate',
      payload: convertDateToSend(value),
    });
    dispatcher({
      type: 'startDateError',
      payload: null,
    });
  }

  function onEndDateSelected(event, value) {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: false};
    });
    setDate(prevDates => {
      return {...prevDates, endDate: value};
    });
    setDisplayDate(prevDates => {
      return {...prevDates, endDate: convertDate(value)};
    });

    dispatcher({
      type: 'EndDate',
      payload: convertDateToSend(value),
    });
    dispatcher({
      type: 'EndDateError',
      payload: null,
    });
  }

  //   const addPosts = (newData, body,) => {
  //     console.log(newData)
  //     client
  //        .post('/purchase', {

  //        })
  //        .then((response) => {
  //           setPosts([response.data, ...posts]);
  //        });
  //     setTitle('');
  //     setBody('');
  //  };

  //  addPosts()

  function showStartDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, startDatePicker: true};
    });
  }

  function showEndDatePicker() {
    setDatePicker(prevDatePickers => {
      return {...prevDatePickers, endDatePicker: true};
    });
  }

  // console.log("resourceValue", resourceValue,clientValue);
  // console.log("selectedddddddddd",Selected)

  // console.log("resourceitem=>>>>>>>>>>>>>",resourceItem)
  // console.log("resourceValue=>>>>>>>>>>>>>",resourcevalue)

  return (
    <SafeAreaView style={[GLOBALSTYLE.safeAreaViewStyle]}>
      <CustomNavigationBar
        back={true}
        headername="Add purchase order"></CustomNavigationBar>
      <View style={[GLOBALSTYLE.mainContainer, {margin: 10}]}>
        <View>
          <DropDownPicker
            style={[style.dropdownViewStyle, {marginTop: 25}]}
            placeholder="Client Name*"
            dropDownContainerStyle={style.dropDownContainerStyle}
            listMode="FLATLIST"
            renderListItem={({item}) => {
              // console.log('rendderCliennnt', item);
              return (
                <TouchableOpacity
                  onPress={() => {
                    // console.log("payload Client=>>>>",item)
                    console.log('item.value', item.label);
                    setclientValue(item.value);
                    setclientopen(false);
                    dispatcher({
                      type: 'client',
                      payload: {
                        client_name: item.label,
                        id: item.id,
                      },
                    });
                    dispatcher({
                      type: 'clientError',
                      payload: validation.validateField(item.value),
                    });
                  }}
                  style={style.cellStyle}>
                  <Text style={style.cellTextStyle}>{item.label}</Text>
                </TouchableOpacity>
              );
            }}
            open={clientopen}
            value={clientValue}
            items={clientItems}
            setOpen={setclientopen}
            setItems={setclientItems}
          />
          {formData.clientError !== null && (
            <Text style={style.errorText}>{formData.clientError}</Text>
          )}
        </View>
        <View style={{marginVertical: 25}}>
          <MultipleSelectList
            placeholder="Resources"
            data={resourceItem}
            setSelected={label => setSelected(label)}
            onSelect={() => {
              dispatcher({type: 'resource', payload: {id: Selected}}),
                dispatcher({type: 'resourceError', payload: {id: Selected}});
            }}
            dropdownItemStyles={{
              backgroundColor: 'white',
              fontSize: 16,
              borderColor: 'white',
              borderWidth: 0,
            }}
            label="selected Resources"
            inputStyles={{color: 'black'}}
            search={false}
            closeicon={
              <AntDesign name="AntDesign" size={22} color="black"></AntDesign>
            }
            dropdownTextStyles={{
              color: 'black',
              fontSize: 16,
              fontWeight: 'normal',
            }}
            dropdownStyles={[
              {
                backgroundColor: 'white',
                marginHorizontal: 10,
                borderColor: 'white',
                fontSize: 16,
              },
            ]}
            boxStyles={[
              {
                paddingHorizontal: 15,
                backgroundColor: 'white',
                paddingVertical: 15,
                marginHorizontal: 5,
                borderColor: 'white',
                borderWidth: 0,
              },
            ]}
          />
          <TextInput
            placeholder="Order Number*"
            value={formData.Order}
            style={[GLOBALSTYLE.TextInputStyle, {marginTop: 0}]}
            onChangeText={data =>
              dispatcher({type: 'Order', payload: {order_number: data}})
            }
            keyboardType="default"
            maxLength={12}
          />
          {formData.OrderError !== null && (
            <Text style={style.errorText}>{formData.OrderError}</Text>
          )}
        </View>
        <View></View>
        <View>
          <TouchableOpacity
            style={[style.btnStyle, {marginTop: 25}]}
            onPress={showStartDatePicker}>
            <Text style={{color: COLORS.black}}>{displayDate.startDate}</Text>
            <FontAwesome
              name="calendar-o"
              size={20}
              style={{alignSelf: 'center', right: 30}}
            />
          </TouchableOpacity>
          {datePicker.startDatePicker === true ? (
            <DateTimePicker
              value={date.startDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onStartDateSelected}
            />
          ) : null}
          {formData.startDateError !== null && (
            <Text style={style.errorText}>{formData.startDateError}</Text>
          )}

          <TouchableOpacity
            style={[style.btnStyle, {marginTop: 25}]}
            onPress={showEndDatePicker}>
            <Text style={{color: COLORS.black}}>{displayDate.endDate}</Text>
            <FontAwesome
              name="calendar-o"
              size={20}
              style={{alignSelf: 'center', right: 30}}
            />
          </TouchableOpacity>
          {datePicker.endDatePicker === true ? (
            <DateTimePicker
              value={date.endDate}
              mode={'date'}
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              is24Hour={true}
              onChange={onEndDateSelected}
            />
          ) : null}
          {formData.EndDateError !== null && (
            <Text style={style.errorText}>{formData.EndDateError}</Text>
          )}
        </View>
        {/* <TouchableOpacity style={style.btnStyle}>
          <Text style={{color: COLORS.black}} placeholder="choose-file">
            choose file
          </Text>
          <Entypo
            name="attachment"
            size={20}
            style={{alignSelf: 'center', right: 30}}
          />
        </TouchableOpacity> */}
        <View>
          <TouchableOpacity
            style={style.btnStyle}
            onPress={() => {
              console.log('resumepress');
              selectResume('resume', 'resumeError');
            }}>
            {formData.resume !== null ? (
              <Text style={style.uploadBtnTextStyle}>
                {formData?.resume?.name}
              </Text>
            ) : (
              <>
                <AntDesign name="upload" color={COLORS.blue} size={24} />
                <Text style={style.uploadBtnTextStyle}>Upload Resume</Text>
              </>
            )}
          </TouchableOpacity>
          {formData.resumeError !== null && (
            <Text style={style.errorText}>{formData.resumeError}</Text>
          )}
        </View>
        <TouchableOpacity
          style={style.btnStyles}
          onPress={() => {
            onSubmit();
          }}>
          <Text style={style.submitBtnTextStyle}>Submit</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 10,
    // alignSelf: 'center',
    borderColor: '#fff',
    zIndex: 100,
  },
  dropDownContainerStyle: {
    marginVertical: 10,
    marginHorizontal: 10,
    paddingVertical: 4,
    borderColor: '#fff',
  },

  btnStyle: {
    width: Dimensions.get('screen').width - 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    margin: 10,
    padding: 15,
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
    backgroundColor: '#fff',
  },
  uploadBtnTextStyle: {
    color: COLORS.blue,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
  btnStyles: {
    width: '100%',
    height: 48,
    backgroundColor: COLORS.lightBlue,
    borderRadius: 8,
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    marginHorizontal: 10,
    marginVertical: 2,
    paddingHorizontal: 2,
  },
  submitBtnTextStyle: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 4,
  },
});

// <DropDownPicker
//           style={[style.dropdownViewStyle,{marginTop:25}]}
//           placeholder="resources Name*"
//           dropDownContainerStyle={style. dropDownContainerStyle}
//         listMode="FLATLIST"

//           open={resourceopen}
//           value={resourcevalue}
//           items={resourceItem}
//           setOpen={setResourceOpen}
//           setItems={setResourceItem}
//         />

//           {formData.resourceError !== null && (
//               <Text style={style.errorText}>{formData.resourceError}</Text>
//             )}
