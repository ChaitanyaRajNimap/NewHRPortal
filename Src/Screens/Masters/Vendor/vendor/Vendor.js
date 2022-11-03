import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchVenders} from './vendorServices';
import {COLORS} from '../../../../Constants/Theme';
import SearchBox from '../../../../Components/SearchBox';
import VendorList from './vendorlist';

const Vendor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState(null);
  const [error, setError] = useState(null);

  const {reducer} = useSelector(state => ({
    reducer: state.vendor,
  }));

  const {vendorError, vendorSuccess} = reducer;

  useEffect(() => {
    if (vendorSuccess) {
      setVendors(vendorSuccess.data.vendors);
      setLoading(false);
    }
  }, [vendorSuccess]);

  useEffect(() => {
    if (vendorError) {
      setError('Something Went Wrong.');
      setVendors([]);
    }
  }, [vendorError]);

  // useEffect(() => {
  //   if (vendorRequest) {
  //     setLoading(true);
  //   } else {
  //     setLoading(false);
  //   }
  // }, [vendorRequest]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchVenders());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true);
      setVendors(null);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <View style={styles.container}>
      <SearchBox />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}

      {!loading && error && 0 && (
        <View style={styles.loadingContainer}>
          <Text> Something Went Wrong</Text>
        </View>
      )}
      {!loading && vendors && vendors.length === 0 && (
        <View style={styles.loadingContainer}>
          <Text> Vender Information is not found </Text>
        </View>
      )}
      {!loading && vendors && vendors.length > 0 && (
        <View style={styles.listContainer}>
          <VendorList data={vendors} />
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

export default Vendor;
