import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  FlatList,
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import dayjs from 'dayjs';
// import CheckBox from '@react-native-community/checkbox';
import {ActivityIndicator} from 'react-native';

function InvoiceStatuCard({data}) {
  console.log('dattttttttttttttt', data);
  const [getstatus, setgetStatus] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [MonthWords, setMonthWords] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [Month, setMonth] = useState([]);
  const [Year, setYear] = useState([]);

  // const getDestructuredData = () => {
  //   const newdata1 = [];
  //   for (const key in data) {
  //     for (let i = 0; i < key.length; i++) {
  //       // for (let j = 0 ;j<key.length ;j++){
  //         // console.log("data=====",data[key][i].client_name == data[key][j].client_name ? 0:data[key][j].count)
  //         if (data[key][i]) {
  //           // console.log("data=====",data[key][i].client_name !==data[key][i].client_name ? 0:data[key][i].count)
  //           let newdata = {
  //             client_id: data[key][i].client_id,
  //             client_name: data[key][i].client_name,
  //             payment: data[key][i].payment,
  //             invoice: data[key][i].invoice,
  //             count: data[key][i].count
  //           };
  //           newdata1.push(newdata);
  //         // }
  //       }

  //     }
  //   }
  //   console.log("newdata1.count=============",newdata1)
  //   setgetStatus(newdata1);
  // };

  const getDestructuredData = () => {
    //  for (const key in data){
    //   let flag =false;
    //   let newdata =[]
    //   //  console.log("iiiiiiiiiiiiiiiii",key,"check",data[key].client_id == data[key].client_id)
    //    for( let i of data[key]){
    //     console.log("iiiiiiiiiiiiiiiii",key,"check",i.client_id ,"==",i.client_id)

    //    }

    //  }
    data;
    let clientObj = {};

    let valueObj = {
      march: {payment: 0, count: 0, invoice: 0},
      feb: {payment: 0, count: 0, invoice: 0},
      jan: {payment: 0, count: 0, invoice: 0},
      dec: {payment: 0, count: 0, invoice: 0},
    };

    for (let ele in data) {
      // console.log(data[ele])
      for (let i of data[ele]) {
        clientObj[i.client_id] = valueObj;

        console.log(data[ele], 'Prinitng only values from all array');
        let mapEle = data[ele].map(ele => ele.client_id && ele.payment);
        // console.log(mapEle,"Mapped Elelment")

        if (mapEle.includes(i.client_id)) {
          // console.log(true);

          for (let j in clientObj) {
            // console.log(clientObj[j],"Printing My payment")
          }
        }
      }
    }
    // console.log(clientObj,'Printing My Obj')

    // for(let ele in clientObj){
    //   for(let i of data[ele])
    // }
  };

  useEffect(() => {
    setLoading(true);
    getDestructuredData();
    getMonth(MonthWords);
    // MonthYear(MonthWords)
    setLoading(false);
  }, [data]);

  // console.log('getstatus=>>>>>>>>>>>>>>>>>>>>>>>>>>>>', getstatus);

  // const MonthYear = (month) => {
  //   // console.log("month=??????????????????",month)
  //   let Montharray=[]
  //   for (let i = 0; i <month.length; i++) {
  //     // console.log("mmmmmmmmmmmmmmmmmmmmmm",month[i].month-1)
  //     const prevMonth = currentDate.month(month[i].month-1);
  //     // console.log("prevMonth===============",prevMonth)
  //     const monthName = prevMonth.format('MMMM');
  //     // console.log("monthName=>>>>>>>>>>>>>>>>>>>>>>>>",monthName)
  //     Montharray.push(monthName)
  //   }
  //   setMonth(Montharray);
  // };

  // console.log("montharrrrrrrrrrrrrr",Month)
  const currentDate = dayjs();
  const getMonth = () => {
    const Montharray = [];
    for (const key in data) {
      let year = key.toString().split('').splice(0, 4).join('');
      let month = key.toString().split('').splice(5, 7).join('');
      let item = [{month: month, year: year}];
      console.log('ITEMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMuhyhgggggggggggg', item);
      for (let i = 0; i < item.length; i++) {
        console.log('item.month=============');
        const prevMonth = currentDate.month(item[i].month - 1);
        console.log('prevMonth>', prevMonth);
        const monthName = prevMonth.format('MMMM');
        let Year = item[i].year;
        let CurrentMonth = {month: monthName, Year: Year};
        Montharray.push(CurrentMonth);
      }
    }
    setMonthWords(Montharray);
  };
  // console.log("MonthWoooooooooooooooooooooooooooooo",MonthWords[0].Year)

  const handelModal = () => {
    setShowModal(true);
  };

  const _renderItem = ({item}) => {
    console.log(
      'item=>>>>>>>>>>>>>>>>>>>>>..........................',
      item.client_name,
      '==',
      item.count,
      item.year,
    );
    return (
      <>
        <View style={[GLOBALSTYLE.cardView]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text
              style={[
                GLOBALSTYLE.rowView,
                GLOBALSTYLE.text,
                {textAlign: 'center', fontWeight: 'bold', color: COLORS.blue},
              ]}>
              Client Name :- {item.client_name}
            </Text>
            <View
              style={{
                marginTop: 20,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderBottomColor: '#ccccb3',
                borderTopColor: '#ccccb3',
                paddingHorizontal: 5,
                paddingVertical: 10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 2,
              }}>
              <Text
                style={[
                  GLOBALSTYLE.text,
                  {textAlign: 'center', fontWeight: '400'},
                ]}>
                {/* {MonthWords[0].month}{MonthWords[0].Year} */} {item.year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                  <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text, {textAlign: 'center'}]}>
                    {item.count}
                  </Text>
                  <Modal
                    visible={showModal}
                    animationType="slide"
                    transparent={true}>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View style={styles.modal}>
                        <Text
                          onPress={() => handleOptionSelect('white')}
                          style={styles.modaltext}>
                          Not Done
                        </Text>
                        <Text
                          onPress={() => handleOptionSelect('gold')}
                          style={styles.modaltext}>
                          Partially done
                        </Text>
                        <Text
                          onPress={() => handleOptionSelect('teal')}
                          style={styles.modaltext}>
                          Full done
                        </Text>
                      </View>
                    </View>
                  </Modal>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>pay</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.payment == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>Inv</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.invoice == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <View
               style={{
                marginTop: 20,
               borderBottomWidth:1,
               borderTopWidth:1,
               borderBottomColor:"#ccccb3",
               borderTopColor:"#ccccb3",
                borderRadius:10,
                paddingHorizontal: 5,
                paddingVertical:10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation:2,
              }}>
            <Text style={[GLOBALSTYLE.text, {textAlign: 'center',fontWeight:"400"}]}>
            {MonthWords[1].month}{MonthWords[1].Year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                  <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text,{textAlign:"center"}]}>{item.count}</Text>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>pay</Text>
                  <TouchableOpacity style={[styles.CheckBox1,{backgroundColor:item.payment==1 ?"yellow":"teal"}]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={[GLOBALSTYLE.text]}>Inv</Text>
                  <TouchableOpacity style={[styles.CheckBox1,{backgroundColor:item.invoice==1 ?"yellow":"teal"}]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View> */}
            <View
              style={{
                marginTop: 20,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderBottomColor: '#ccccb3',
                borderTopColor: '#ccccb3',
                paddingHorizontal: 5,
                paddingVertical: 10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 2,
              }}>
              <Text
                style={[
                  GLOBALSTYLE.text,
                  {textAlign: 'center', fontWeight: '400'},
                ]}>
                {/* {MonthWords[2].month}{MonthWords[2].Year} */} {item.year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                  <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text, {textAlign: 'center'}]}>
                    {item.count}
                  </Text>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>pay</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.payment == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>Inv</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.invoice == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <View
              style={{
                marginTop: 20,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderBottomColor: '#ccccb3',
                borderTopColor: '#ccccb3',
                paddingHorizontal: 5,
                paddingVertical: 10,
                shadowColor: '#ebebe0',
                shadowOffset: {
                  width: 4,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 1,
                elevation: 2,
              }}>
              <Text
                style={[
                  GLOBALSTYLE.text,
                  {textAlign: 'center', fontWeight: '400'},
                ]}>
                {MonthWords[3].month}
                {MonthWords[3].Year}
              </Text>
              <View style={[GLOBALSTYLE.rowView, {marginHorizontal: 20}]}>
                <View style={{marginTop: 10}}>
                  <Text style={[GLOBALSTYLE.text]}>Count</Text>
                  <Text style={[GLOBALSTYLE.text, {textAlign: 'center'}]}>
                    {item.count}
                  </Text>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>pay</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.payment == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <Text style={GLOBALSTYLE.text}>Inv</Text>
                  <TouchableOpacity
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.invoice == 1 ? 'yellow' : 'teal'},
                    ]}>
                    <Image
                      source={require('../../../../Components/tick.png')}
                      style={{width: 20}}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={getstatus}
        renderItem={_renderItem}
        // keyExtractor={item => item.id}
        edit
      />
    </View>
  );
}

export default InvoiceStatuCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  nameViewStyle: {
    width: '100%',
  },
  personViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  innerViewStyle: {
    flex: 1,
  },
  upperViewStyle: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  indicatorTextStyle: {
    color: COLORS.grey,
    fontSize: 14,
  },
  contentTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  modaltext: {
    color: 'black',
    textAlign: 'center',
  },
  CheckBox1: {
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    width: 30,
    height: 30,
    // paddingVertical:3,
    paddingBottom: 4,
    paddingHorizontal: 2,
    borderRadius: 5,
    borderRightWidth: 3,
    borderColor: '#ccccb3',
    backgroundColor: 'yellow',
  },
});
