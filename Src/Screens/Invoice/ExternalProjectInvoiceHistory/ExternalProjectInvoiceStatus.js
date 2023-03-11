import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import SearchBox from '../../../Components/SearchBox';
// import InvoiceStatuCard from './InvoiceComponents/InvoiceStatuCard';
import InvoiceStatuCard from '../InvoiceStatus/InvoiceComponents/InvoiceStatuCard';
import {
  ExternalInvoiceStatus,
  SendExternalInvoicestatesData,
  ExternalInvoiceStausSearch,
} from '../../../Redux/Actions/ExternalProjectInvoiceStatusAction';
import {useDispatch, useSelector} from 'react-redux';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import dayjs from 'dayjs';
import Export from '../Export';

const ExternalProjectInvoiceStatus = ({navigation}) => {
  const [InvoiceData, setInvoiceData] = useState([]);
  const [FilterInvoiceData, setFilterInvoiceData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [FilterSearchInvoiceData, setFilterSearchInvoiceData] = useState([]);
  const [search, setSearch] = useState('');
  const [Loading, setLoading] = useState(true);
  const [MonthCount, setMonthCount] = useState([]);
  const [Year, setYear] = useState([]);
  const currentDate = dayjs();

  const dispatch = useDispatch();
  const reducerData = useSelector(
    state => state.ExternalInvoiceStatusReducer.ExternalInvoicestatesData,
  );
  const searchReducerData = useSelector(
    state => state.ExternalInvoiceStatusReducer.ExternalInvoiceStautsSearchData,
  );

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(ExternalInvoiceStatus());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    if (search !== null) {
      setLoading(true);
      dispatch(ExternalInvoiceStausSearch(search));
    }
  }, [search]);

  useEffect(() => {
    if (reducerData && reducerData.data) {
      setInvoiceData(reducerData.data);
      setFilterSearchInvoiceData(reducerData.data);
      setLoading(false);
    }
  }, [reducerData.data]);

  useEffect(() => {
    if (searchReducerData && searchReducerData.data) {
      setFilterSearchInvoiceData(searchReducerData.data);
      setLoading(false);
    }
  }, [searchReducerData.data]);

  const setSearchValue = value => {
    console.log(value);
    setSearch(value);
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
    console.log('data===========', data);
    dispatch(SendExternalInvoicestatesData(data, navigation));
  };

  return (
    <>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <Export Onpress={Handelcancel} ondatatSend={HandelSend} />
      </Modal>
      <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
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
                paddingVertical: 19,
                borderRadius: 10,
                flexDirection: 'column',
              }}>
              <AntDesign name="export" size={25} color="black" />
            </Text>
          </TouchableOpacity>
        </View>
        {Loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        )}

        {Loading &&
          search &&
          FilterInvoiceData &&
          FilterInvoiceData.length > 0 && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={COLORS.blue} />
            </View>
          )}

        {/* {
        !Loading && search.length >0 && FilterInvoiceData.length==0 && (
          <View style={{backgroundColor:"red"}}>
            <Text style={{fontSize:35,color:"white"}}>Cleint is not found</Text>
          </View>
        )
      }
       */}

        {!Loading && (
          <InvoiceStatuCard
            data={search == null ? InvoiceData : FilterSearchInvoiceData}
          />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ExternalProjectInvoiceStatus;

// const MonthYear =()=>{
//   const YearArray=[]
//   const MonthCounts=[]
//   for (let i =0; i <=4; i++) {
//     const prevMonth = currentDate.subtract(i, 'month'); // Subtract i months from the current date
//     const MonthCount= prevMonth.format('M')
//     const year = prevMonth.format('YYYY'); // Get the year in YYYY format
//     console.log("MonthCount",MonthCount)
//     YearArray.push(year)
//    MonthCounts.push(MonthCount)
//   }
//   setYear(YearArray)
//   setMonthCount(MonthCounts)
// }
// useEffect(()=>{
//   MonthYear()
// },[])

// console.log("MonthCount=>>>>>>>>>>>>>>>>>",Year)

// const getFilterInvoicedata=(data)=>{
// var NewFilterValue=[]
// if(data){
//   let filter = data.map((res)=>{
//  if ((res.month==MonthCount[0]||res.month==MonthCount[1]||res.month==MonthCount[2]||res.month==MonthCount[3])&&(res.year==Year[0]||res.year==Year[1]||res.year==Year[2]||res.year==Year[3])){
//           console.log("ressssssssssssss",res)
//           NewFilterValue.push(res)
//     }
//   })
// }
// setFilterInvoiceData(NewFilterValue)
// }

// useEffect(()=>{
//   getFilterInvoicedata(InvoiceData)
// },[InvoiceData])

// console.log("filterrrrrrrrrrrrrrrrrrrrrr=",FilterInvoiceData)
// console.log("secrggggggggggggggggggggggggg",search !==null ?FilterSearchInvoiceData:InvoiceData,">>>>>>>>>>>>>.",FilterSearchInvoiceData,InvoiceData)

// const getInvoiceData = () => {
//   if (Array.isArray(FilterInvoiceData)) {
//     const filterValue = FilterInvoiceData?.filter(data => {
//       console.log("dataa", data)
//       if (typeof search === "undefined" || search.length === 0) {
//         return data
//       }
//       else if (data.client.client_name.toLowerCase().includes(search.toLowerCase())) {
//         return data
//       }
//     })
//     console.log("filtervalue--------------", filterValue)
//     setFilterSearchInvoiceData(filterValue)
//   }
// }

// console.log(FilterSearchInvoiceData)
