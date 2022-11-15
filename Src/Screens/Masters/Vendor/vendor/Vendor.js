import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { fetchVenders } from './vendorServices';
import { COLORS } from '../../../../Constants/Theme';
import SearchBox from '../../../../Components/SearchBox';
import VendorList from './vendorlist';
import { deleteVendor } from '../../../../Redux/Actions/VendorMasterAction';

const Vendor = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [vendors, setVendors] = useState(null);
  const [filterVendor, setFilterVendor] = useState(null);
  const [search, setSearch] = useState('');
  const [error, setError] = useState(null);

  const { reducer } = useSelector(state => ({
    reducer: state.vendor,
  }));

  const { vendorError, vendorSuccess } = reducer;

  useEffect(() => {
    if (vendorSuccess && vendorSuccess.data && vendorSuccess.data.vendors) {
      setVendors(vendorSuccess.data.vendors);
      setFilterVendor(vendorSuccess.data.vendors)
      setLoading(false);
    }
  }, [vendorSuccess]);

  useEffect(() => {
    if (vendorError) {
      setLoading(false);
      setError('Something Went Wrong.');
      setVendors([]);
    }
  }, [vendorError]);

  useEffect(() => {
    getVendorFilterData();
  }, [search])

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
      setError(null);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  const getVendorFilterData = () => {
    const filterValue = vendors?.filter(data => {
      if (search.length === 0) {
        return data;
      } else if (
        data.company_name.toLowerCase().includes(search.toLowerCase()) ||
        data.contact_person.toLowerCase().includes(search.toLowerCase()) ||
        data.contact_number.toLowerCase().includes(search.toLowerCase()) ||
        data.contact_email.toLowerCase().includes(search.toLowerCase()) ||
        data.pan.toLowerCase().includes(search.toLowerCase()) ||
        data.gst.toLowerCase().includes(search.toLowerCase())
      ) {
        console.log(data);
        return data;
      }
    });
    setFilterVendor(filterValue);

  }

  const setSearchValue = value => {
    setSearch(value);
  };
  const editVendor = (data) => {
    navigation.navigate('Editvendor', { newData: data })
  }
  const deletevendor = (id) => {
    dispatch(deleteVendor(id))
    setSearch('');
    const remaningData = vendors.filter(t => t.id !== id);
    setFilterVendor([...remaningData]);
  }
  return (
    <View style={styles.container}>
      <SearchBox
        setSearchValue={setSearchValue}
      />

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
      {!loading && vendors && vendors.length === 0 && (
        <View style={styles.loadingContainer}>
          <Text> Vender Information is not found </Text>
        </View>
      )}
      {!loading && vendors && vendors.length > 0 && (
        <View style={styles.listContainer}>
          <VendorList
            data={filterVendor}
            editVendor={editVendor}
            deleteVendor={deletevendor}

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

export default Vendor;
