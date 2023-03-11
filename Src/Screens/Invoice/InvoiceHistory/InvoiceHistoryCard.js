import React, {useEffect, useMemo, useState} from 'react';
import {FlatList, View, Text, StyleSheet, Image} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';

function InvoiceHistoryCard({data, navigation}) {
  const [checked, setChecked] = useState(false);

  console.log('datattttttttttttttogettttttttttttttttt', data);

  const _renderItem = ({item}) => {
    console.log('item=>>>>>>>>>>>>>>>>>>>>>0000000000000000000000000', item);

    let month = item.month;

    // console.log("xxxxxxxxxxxxxxx",x)
    const CheckMonth = res => {
      // console.log('res==============', res);
      let monthstring;
      switch (res) {
        case 1:
          monthstring = 'January';
          break;
        case 2:
          monthstring = 'February';
          break;
        case 3:
          monthstring = 'March';
          break;
        case 4:
          monthstring = 'April';
          break;
        case 5:
          monthstring = 'May';
          break;
        case 6:
          monthstring = 'June';
          break;
        case 7:
          monthstring = 'July';
          break;
        case 8:
          monthstring = 'August';
          break;
        case 9:
          monthstring = 'September';
          break;
        case 10:
          monthstring = 'October';
          break;
        case 11:
          monthstring = 'November';
          break;
        case 12:
          monthstring = 'December';
          break;

        default:
          monthstring = 'No Month found';
      }
      return monthstring;
    };

    let Convertmonth = CheckMonth(month);
    console.log(Convertmonth);

    return (
      <>
        <View style={[GLOBALSTYLE.cardView, {marginTop: 10}]}>
          <View style={[GLOBALSTYLE.columnView]}>
            <View style={[GLOBALSTYLE.rowView]}>
              <View>
                <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                  Month:
                </Text>
                <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                  Client Name:
                </Text>
                <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                  Total Count :
                </Text>
              </View>
              <View>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                    {Convertmonth}
                  </Text>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {marginBottom: 20, marginLeft: 2},
                    ]}>
                    {item.year}
                  </Text>
                </View>
                <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                  {item.client_name}
                </Text>
                <Text style={[GLOBALSTYLE.text, {marginBottom: 20}]}>
                  {item.count}
                </Text>
              </View>
            </View>
            <View style={[GLOBALSTYLE.columnView]}>
              <View
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {fontSize: 20, textAlign: 'center', marginBottom: 5},
                    ]}>
                    Pay
                  </Text>
                  <View
                    style={[
                      styles.CheckBox1,
                      {
                        backgroundColor:
                          item.payment === 1 ? '#ffff00' : 'white',
                      },
                    ]}>
                    <Image
                      source={require('../../../Components/tick.png')}
                      style={{width: 30}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {fontSize: 20, textAlign: 'center', marginBottom: 5},
                    ]}>
                    Inv
                  </Text>
                  <View
                    style={[
                      styles.CheckBox1,
                      {
                        backgroundColor:
                          item.invoice === 1 ? '#ffff00' : 'white',
                      },
                    ]}>
                    <Image
                      source={require('../../../Components/tick.png')}
                      style={{width: 30}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {fontSize: 20, textAlign: 'center', marginBottom: 5},
                    ]}>
                    Hc
                  </Text>
                  <View
                    style={[
                      styles.CheckBox1,
                      {
                        backgroundColor:
                          item.hard_copy === 1 ? '#ffff00' : 'white',
                      },
                    ]}>
                    <Image
                      source={require('../../../Components/tick.png')}
                      style={{width: 30}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {fontSize: 20, textAlign: 'center', marginBottom: 5},
                    ]}>
                    P.F
                  </Text>
                  <View
                    style={[
                      styles.CheckBox1,
                      {backgroundColor: item.pf === 1 ? '#ffff00' : 'white'},
                    ]}>
                    <Image
                      source={require('../../../Components/tick.png')}
                      style={{width: 30}}
                    />
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: 10,
                    marginHorizontal: 8,
                  }}>
                  <Text
                    style={[
                      GLOBALSTYLE.text,
                      {fontSize: 20, textAlign: 'center', marginBottom: 5},
                    ]}>
                    Ts
                  </Text>
                  <View
                    style={[
                      styles.CheckBox1,
                      {
                        backgroundColor:
                          item.timesheet === 1 ? '#ffff00' : 'white',
                      },
                    ]}>
                    <Image
                      source={require('../../../Components/tick.png')}
                      style={{width: 30}}
                    />
                  </View>
                </View>
              </View>
              <View></View>
            </View>
          </View>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        // keyExtractor={item => item.client_id}
        edit
      />
    </View>
  );
}

export default InvoiceHistoryCard;

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
    width: 40,
    height: 40,
    paddingVertical: 2,
    paddingHorizontal: 2,
    borderRadius: 5,
    borderRightWidth: 3,
    borderColor: '#ccccb3',
  },
});
