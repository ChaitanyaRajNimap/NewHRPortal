// import { useNavigation } from "@react-navigation/native";
import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {getRequetsClient} from '../../../Redux/Actions/RequestCllientAction';
import {getRequestClientsname} from '../../../Redux/Actions/RequestCllientAction';
import RequestClientList from './RequestClientList';
import SearchBox from '../../../Components/SearchBox';
import {ActivityIndicator} from 'react-native';
import {COLORS} from '../../../Constants/Theme';
import {deleteRequetsClient} from '../../../Redux/Actions/RequestCllientAction';
import {GLOBALSTYLE} from '../../../Constants/Styles';

const RequestClient = ({navigation}) => {
  const [requestClient, setrequestClient] = useState([]);
  const [fiterRequestclientData, setfiterRequestclientData] = useState(null);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const [filterData, setfilterData] = useState([]);
  const reducerData = useSelector(
    state => state.RequestClientReducer.RequestClientReducerData,
  );
  //.........................................FUNCTION FOR GETTING CLIENT DATA......................................//
  const ClientData = reducerData => {
    let newData = [];
    if (reducerData && reducerData.data.client_request) {
      newData = reducerData.data.client_request;
    }
    setfilterData(newData);
  };

  // dispatcher for getRequetsClient request
  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getRequetsClient());
      dispatch(getRequestClientsname());
    });
    return unSubscribe;
  }, [navigation]);

  // console.log("requestclient",requestClient)

  // useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //       setLoading(true);
  //       setfiterRequestclientData(null)
  //     });
  //     return unsubscribe;
  //   }, [navigation, dispatch]);

  // useEffect(()=>{
  //     clientRequest(filterData)
  //     setLoading(false)
  //   },[filterData])

  //.............................HOOK FOR SET REQUESTCLIENTDATA & FILTERCLIENTDATA ON FOCUS......................................//
  useEffect(() => {
    // console.log("-------------------",reducerData.purchaseorderData)
    if (reducerData && reducerData.data.client_request) {
      setrequestClient(reducerData.data.client_request);
      setfiterRequestclientData(reducerData.data.client_request);
      ClientData(reducerData);
      setLoading(false);
    }
  }, [reducerData]);

  //.........................................SEARCH BAR FUNCTION TO SET FILTERED DATA......................................//
  const getPurchaseOrderFilterData = () => {
    console.log('requestClient', filterData);
    const filterValue = filterData?.filter(data => {
      console.log('line60', data);
      console.log(
        data.tan.toLowerCase().includes(search),
        search,
        data.tan.toLowerCase(),
      );
      if (
        data.company_name.toLowerCase().includes(search.toLowerCase()) ||
        data.finance_email.includes(search.toLowerCase()) ||
        data.nationality.toLowerCase().includes(search.toLowerCase()) ||
        data.finance_contact_number.includes(search) ||
        data.finance_name.toLowerCase().includes(search.toLowerCase()) ||
        data.pan.toLowerCase().includes(search.toLowerCase()) ||
        data.tan.toLowerCase().includes(search.toLowerCase()) ||
        data.gst.toLowerCase().includes(search.toLowerCase())
      ) {
        return data;
      }
    });
    // console.log("filterValue=>>>>>>>>>>>",filterValue)
    setfiterRequestclientData(filterValue);
  };

  useEffect(() => {
    getPurchaseOrderFilterData();
  }, [search]);

  //.........................................FUNCTION FOR GET USER INPUT IN SEARCHBAR......................................//

  const setSearchValue = value => {
    setSearch(value);
  };

  //.........................................FUNCTION FOR DELETE REQUESTCLIENT DATA......................................//
  const deleteRequestClient = id => {
    console.log('deletpurchase=>>>>>>', id);
    dispatch(deleteRequetsClient(id));
    setSearch('');
    const remaningData = filterData.filter(t => t.id !== id);
    setfiterRequestclientData([...remaningData]);
  };

  return (
    <>
      <View style={styles.container}>
        <SearchBox setSearchValue={setSearchValue} />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        )}

        {!loading && search && (
          <View style={styles.loadingContainer}>
            <Text style={GLOBALSTYLE.text}>
              Request Client Information is not found{' '}
            </Text>
          </View>
        )}

        {!loading && requestClient && requestClient.length > 0 && (
          <RequestClientList
            data={fiterRequestclientData}
            deleteRequestClient={deleteRequestClient}
          />
        )}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default RequestClient;
