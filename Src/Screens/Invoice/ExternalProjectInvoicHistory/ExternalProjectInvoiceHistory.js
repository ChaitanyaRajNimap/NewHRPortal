import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import Export from '../Export';
import SearchBox from '../../../Components/SearchBox';
import {COLORS} from '../../../Constants/Theme';
import InvoiceHistoryCard from '../InvoiceHistory/InvoiceHistoryCard';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import dayjs from 'dayjs';
import DropDownPicker from 'react-native-dropdown-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {
  GetExternalInvoiceHistory,
  getExternalInvoiceMonthlyData,
  SendExternalInvoiceHistoryData,
} from '../../../Redux/Actions/ExternalProjectInvoiceHistory';
import {ActivityIndicator} from 'react-native';

const ExternalProjectInvoiceHistory = ({navigation}) => {
  const [Externalinvoicehistorydata, setExternalinvoicehistorydata] =
    useState(null);
  const [ExternalinvoicehistoryMonthdata, setExternalinvoicehistoryMonthdata] =
    useState(null);
  const dispatch = useDispatch();
  const reducerdata = useSelector(
    state => state.Externalinvicehistoryreducer.getExternalinvicehistorydata,
  );
  const reducerdata1 = useSelector(
    state => state.Externalinvicehistoryreducer.GetMonthData,
  );
  console.log('reducerExternalInvoicedataMonthly Data=>>>>>>', reducerdata1);
  const [modalVisible, setModalVisible] = useState(false);
  const [openYear, setOpenyear] = useState(false);
  const [getyearvalue, setGetYearvalue] = useState(null);
  const [getyearitem, setgetyearitem] = useState([]);
  const [openMonth, setopenMonth] = useState(false);
  const [getMonthvalue, setGetMonthvalue] = useState(null);
  const [getMonthitem, setgetMonthitem] = useState([]);
  const [search, setSearch] = useState('');
  const [ExternalFilterInvoiceData, setExternalFilterInvoiceData] =
    useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect(()=>{
  //   GetExternalInvoiceHistory()
  // },[])
  const GetYears = () => {
    const years = new Date().getFullYear();
    const year = [];
    for (let i = years; i >= 2000; i--) {
      // console.log("iiiiiiiiiiiiiiiiii",i)
      let item = {value: i};
      year.push(item);
    }
    setgetyearitem(year);
  };

  // console.log("mmmmmmmmmmmmmmmmmmmmmmmmmmm",getMonthvalue,getyearvalue)

  const Getmonth = () => {
    let Month = [];
    const Months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    for (let i = 0; i < Months.length; i++) {
      let item = {value: Months[i]};
      Month.push(item);
    }
    setgetMonthitem(Month);
  };
  useEffect(() => {
    GetYears();
    Getmonth();
  }, []);

  //  console.log("currentMonth",currentMonth,getMonthValue)

  const SendMonthData = (getyearvalue, getMonthvalue) => {
    console.log('getyearvalue=>>>>>>>>>>', getyearvalue);
    // console.log("getMonthvalue=>>>>>>>>>>",getMonthvalue.length)

    const MonthData = {
      month: getMonthvalue,
      year: getyearvalue,
    };
    console.log('monthdatttttttttttttttttttttttt', MonthData);
    dispatch(getExternalInvoiceMonthlyData(MonthData));
  };

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(GetExternalInvoiceHistory());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    setLoading(true);
    dispatch(getExternalInvoiceMonthlyData());
  }, [getMonthvalue]);

  useEffect(() => {
    if (reducerdata && reducerdata.data) {
      setExternalinvoicehistorydata(reducerdata.data);
      setExternalFilterInvoiceData(reducerdata.data);
      setLoading(false);
    }
  }, [reducerdata.data]);

  useEffect(() => {
    if (reducerdata1 && reducerdata1) {
      setExternalinvoicehistoryMonthdata(reducerdata1);
      setLoading(false);
    }
  }, [reducerdata1]);

  console.log(
    'tExternalinvoicehistoryMonthdata',
    ExternalinvoicehistoryMonthdata,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true);
      setExternalFilterInvoiceData(null);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    getFliternvoicedata();
  }, [search]);

  const setSearchValue = value => {
    setSearch(value);
  };
  // console.log("searchhhhhhhhhhhhhhhhhhhhhhhhhhh",Externalinvoicehistorydata)

  const getFliternvoicedata = () => {
    // console.log("getFliternvoicedata=>>>>>>>>>>>>>>>>>>>>>>>")
    const filterValue = Externalinvoicehistorydata?.filter(data => {
      console.log("''''''''''''''", data);
      if (search.length === 0) {
        return data;
      } else if (
        data.client_name.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    });
    // console.log("''''''''''''''",filterValue)
    setExternalFilterInvoiceData(filterValue);
  };

  const ModalOpen = () => {
    setModalVisible(true);
  };

  const Handelcancel = data => {
    console.log('onpresssssssssssssssssss', 'closeModal');
    setModalVisible(false);
    console.log(data);
  };

  const HandelSend = data => {
    dispatch(SendExternalInvoiceHistoryData(data, navigation));
  };

  // console.log(" getMonthvalue!==null?Externalinvoicehistorydata :ExternalinvoicehistoryMonthdata",
  //  getMonthvalue.length!==null?ExternalinvoicehistoryMonthdata:Externalinvoicehistorydata)
  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Export Onpress={Handelcancel} ondatatSend={HandelSend} />
      </Modal>
      <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
        {/* <View style={styles.container}> */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginHorizontal: 20,
          }}>
          <SearchBox setSearchValue={setSearchValue} />
          <TouchableOpacity
            onPress={() => ModalOpen()}
            style={{
              flexDirection: 'column',
              shadowColor: '#000',
              borderRadius: 10,
              backgroundColor: COLORS.white,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 1.84,
              elevation: 20,
            }}>
            <Text
              style={{
                paddingHorizontal: 19,
                paddingVertical: 30,
                borderRadius: 19,
                flexDirection: 'column',
              }}>
              <AntDesign name="export" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>

        {!loading && search && (
          <View style={style.loadingContainer}>
            <Text> purchase order Information is not found </Text>
          </View>
        )}

        <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
          <View style={{width: '45%', marginHorizontal: 10}}>
            <DropDownPicker
              style={[style.dropdownViewStyle]}
              placeholder="select Year*"
              placeholderStyle={{color: COLORS.black, textAlign: 'center'}}
              dropDownContainerStyle={style.dropDownContainerStyle}
              listMode="FLATLIST"
              renderListItem={({item}) => {
                // console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=>>>>>>>', item.value)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      // console.log("itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm",item.value)
                      setGetYearvalue(item.value);
                      setOpenyear(false);
                    }}
                    style={style.cellStyle}>
                    <Text style={style.cellTextStyle}>{item.value}</Text>
                  </TouchableOpacity>
                );
              }}
              open={openYear}
              value={getyearvalue}
              items={getyearitem}
              setOpen={setOpenyear}
              setItems={setgetyearitem}
            />
          </View>
          <View style={{width: '45%', marginHorizontal: 10}}>
            <DropDownPicker
              style={[style.dropdownViewStyle]}
              dropDownContainerStyle={style.dropDownContainerStyle}
              listMode="FLATLIST"
              placeholder="select month*"
              renderListItem={({item}) => {
                // console.log('itemmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmm=>>>>>>>', item.value)
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setGetMonthvalue(item.value);
                      setopenMonth(false);
                      SendMonthData(getyearvalue, getMonthvalue);
                    }}
                    style={style.cellStyle}>
                    <Text style={style.cellTextStyle}>{item.value}</Text>
                  </TouchableOpacity>
                );
              }}
              open={openMonth}
              value={getMonthvalue}
              items={getMonthitem}
              setOpen={setopenMonth}
              setItems={setgetMonthitem}
            />
          </View>
        </View>
        {loading && (
          <View style={style.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        )}
        {!loading &&
          Externalinvoicehistorydata &&
          Externalinvoicehistorydata.length > 0 && (
            <View style={style.listContainer}>
              <InvoiceHistoryCard
                data={
                  getMonthvalue !== null
                    ? ExternalinvoicehistoryMonthdata
                    : Externalinvoicehistorydata
                }
              />
            </View>
          )}

        {/* </View>  */}
      </SafeAreaView>
    </>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  dropdownViewStyle: {
    backgroundColor: '#fff',
    marginTop: 10,
    marginHorizontal: 50,
    alignSelf: 'center',
    borderColor: '#fff',
    zIndex: 100,
    // width:"100%",
    // padding:50
  },
  dropDownContainerStyle: {
    // width:"100%",
    marginVertical: 19,
    // marginHorizontal:85,
    paddingVertical: 4,
    borderColor: '#fff',
    color: 'red',
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
    color: 'black',
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
    backgroundColor: '#fff',
  },

  listContainer: {
    flex: 1,
    marginVertical: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExternalProjectInvoiceHistory;

// ExternalProjectInvoiceHistory
