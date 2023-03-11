import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Text, Alert} from 'react-native';
import {
  getPurchaseOrder,
  getResources,
  getClients,
  deletePurchaseOrders,
} from '../../../Redux/Actions/PurchaseOrderAction';
import {useSelector, useDispatch} from 'react-redux';
import {COLORS} from '../../../Constants/Theme';
import {ActivityIndicator} from 'react-native';
import PurchaseOrderList from './PurchaseorderList';
import SearchBox from '../../../Components/SearchBox';

const PurchaseOrder = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.PurchaseOrderReducer);
  // console.log("reducerdatap----",reducerData.purchaseorderData)

  const [purchaseOrder, setpurchaseOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState('');
  const [filterPurchaseData, setFilterPurchaseData] = useState(null);

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getPurchaseOrder());
      dispatch(getResources());
      dispatch(getClients());
    });
    return unSubscribe;
  }, [navigation]);

  //   useEffect(() => {
  //     const unsubscribe = navigation.addListener('blur', () => {
  //       setLoading(true);
  //       setpurchaseOrder(null);
  //       setError(null);
  //     });
  //     return unsubscribe;
  //   }, [navigation]);

  useEffect(() => {
    // console.log("-------------------",reducerData.purchaseorderData)
    if (reducerData && reducerData.purchaseorderData) {
      setpurchaseOrder(reducerData.purchaseorderData),
        setFilterPurchaseData(reducerData.purchaseorderData);
      setLoading(false);
    }
  }, [reducerData.purchaseorderData]);

  useEffect(() => {
    getPurchaseOrderFilterData();
  }, [search]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true);
      setFilterPurchaseData(null);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  console.log('loading', loading);

  const getPurchaseOrderFilterData = () => {
    const filterValue = purchaseOrder?.filter(data => {
      if (search.length === 0) {
        return data;
      } else if (data.clients !== null && data.resources[0] !== undefined) {
        if (
          data.clients.client_name.includes(search) ||
          data.resources[0].fname
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.resources[0].lname
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          data.order_number.includes(search)
        )
          return data;
      }
    });
    setFilterPurchaseData(filterValue);
  };

  const deletePurchaseOrder = id => {
    console.log('deletpurchase=>>>>>>', id);
    dispatch(deletePurchaseOrders(id));
    setSearch('');
    const remaningData = purchaseOrder.filter(t => t.id !== id);
    setFilterPurchaseData([...remaningData]);
  };

  const setSearchValue = value => {
    setSearch(value);
  };
  // console.log("gdgddfdfdffdf", !loading && purchaseOrder && purchaseOrder.length < 0)
  const editPurchaseOrder = data => {
    console.log('EditPurchaseOrder');
    navigation.navigate('EditPurchaseOrder', {newData: data});
  };

  console.log('purchase----', purchaseOrder);
  return (
    <View style={styles.container}>
      <SearchBox setSearchValue={setSearchValue} />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}

      {!loading && error && (
        <View style={styles.loadingContainer}>
          <Text> Something Went Wrong</Text>
        </View>
      )}

      {!loading && search && (
        <View style={styles.loadingContainer}>
          <Text> purchase order Information is not found </Text>
        </View>
      )}
      {!loading && purchaseOrder && purchaseOrder.length > 0 && (
        <View style={styles.listContainer}>
          <PurchaseOrderList
            data={filterPurchaseData}
            editPurchaseOrder={editPurchaseOrder}
            deletePurchaseOrder={deletePurchaseOrder}
          />
        </View>
      )}
    </View>
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

export default PurchaseOrder;
