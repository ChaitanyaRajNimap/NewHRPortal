import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {fetchResurces, deleteResource} from '../resourceServices';
import {COLORS} from '../../../../Constants/Theme';
import ResourceList from './resourceList';
import SearchBox from '../../../../Components/SearchBox';

const Resources = () => {
  //For dispatching actions for resources reducer
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [resources, setResources] = useState(null);
  const [filterResources, setFilterResources] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {reducer} = useSelector(state => ({
    reducer: state.resource,
  }));

  //for getting filter data on search
  useEffect(() => {
    getResourceFilterData();
  }, [search]);

  //for setting search input text
  const setSearchValue = value => {
    setSearch(value);
  };

  //for filtering search results
  const getResourceFilterData = () => {
    const filterValue = resources?.filter(data => {
      let resFullName = data.fname
        ? data.fname.toLowerCase() + ' ' + data.lname.toLowerCase()
        : '';
      let currStatus = data.on_bench === 1 ? 'Bench' : data.client_name;
      console.log('RESFULL NAME & STATUS : ', resFullName, currStatus);
      if (search.length === 0) {
        return data;
      } else if (data.company_name) {
        if (
          data.fname.toLowerCase().includes(search.toLowerCase()) ||
          data.lname.toLowerCase().includes(search.toLowerCase()) ||
          data.company_name.toLowerCase().includes(search.toLowerCase()) ||
          data.l1.toLowerCase().includes(search.toLowerCase()) ||
          data.passing_year.toLowerCase().includes(search.toLowerCase()) ||
          // data.project.toLowerCase().includes(search.toLowerCase()) ||
          data.primary_skill.toLowerCase().includes(search.toLowerCase()) ||
          data.resident_address.toLowerCase().includes(search.toLowerCase()) ||
          // currStatus.includes(search.toLowerCase()) ||
          resFullName.includes(search.toLowerCase())
        ) {
          return data;
        }
      }
    });
    setFilterResources(filterValue);
  };

  const {
    resourceError,
    resourceRequest,
    resourceSuccess,
    deleteResourceRequest,
    deleteResourceSuccess,
    deleteResourceError,
  } = reducer;

  const DeleteResource = id => {
    dispatch(deleteResource(id));
  };

  const EditResource = id => {
    console.log(id);
  };

  useEffect(() => {
    if (deleteResourceSuccess) {
      setLoading(true);
      dispatch(fetchResurces());
    }
  }, [deleteResourceSuccess, dispatch]);

  useEffect(() => {
    if (resourceSuccess) {
      console.log('RESOURCE DATA ++>', resourceSuccess.data.resources);
      setResources(resourceSuccess.data.resources);
      setFilterResources(resourceSuccess.data.resources);
      setLoading(false);
    }
  }, [resourceSuccess]);

  useEffect(() => {
    if (resourceError) {
      setLoading(false);
      setError(resourceError);
      setResources([]);
    }
  }, [resourceError]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(fetchResurces());
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setLoading(true);
      setResources(null);
      setError(null);
    });
    return unsubscribe;
  }, [navigation, dispatch]);

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <SearchBox setSearchValue={setSearchValue} />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        )}

        {/* {!loading && error !== null && (
          <View style={styles.loadingContainer}>
            <Text> Something went wrong. </Text>
          </View>
        )} */}
        {!loading && resources && error === null && resources.length === 0 && (
          <View style={styles.loadingContainer}>
            <Text> Resource Information is not found </Text>
          </View>
        )}
        {!loading && resources && resources.length > 0 && (
          <View style={styles.listContainer}>
            <ResourceList
              data={filterResources}
              deleteResourcse={DeleteResource}
              editResourcse={EditResource}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
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

export default Resources;
