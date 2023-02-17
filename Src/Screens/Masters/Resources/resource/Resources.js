import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Text,
  Alert,
  Modal,
} from 'react-native';
import {
  getResource,
  deleteResource,
} from '../../../../Redux/Actions/resourceActions';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {fetchResurces} from '../resourceServices';
import {COLORS} from '../../../../Constants/Theme';
import ResourceList from './resourceList';
import SearchBox from '../../../../Components/SearchBox';
import SmallButton from '../../../../Components/SmallButton';
import DeleteResourceView from '../deleteResource/DeleteResourceView';

const Resources = ({navigation}) => {
  //For dispatching actions for resources reducer
  const dispatch = useDispatch();
  // const navigation = useNavigation();
  const reducerData = useSelector(state => state.resource);
  // console.log('reducerData from resources : ', reducerData);

  const [resources, setResources] = useState(null);
  const [filterResources, setFilterResources] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatlist] = useState(false);

  //For modal
  const [modalVisible, setModalVisible] = useState(false);

  //for showing loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For passind id to delete
  const [idToDelete, setIdToDelete] = useState(null);

  // const {reducer} = useSelector(state => ({
  //   reducer: state.resource,
  // }));

  useEffect(() => {
    //To fetch data when user navigate on this screen
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getResource());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    //for setting state for resources
    if (reducerData.getResourceData) {
      setError(null);
      setLoading(false);
      setResources(reducerData.getResourceData);
      setFilterResources(reducerData.getResourceData);
    } else {
      setError('Data not found!');
    }
  }, [reducerData.getResourceData]);

  //for getting filter data on search
  useEffect(() => {
    getResourceFilterData();
  }, [search]);

  //For closing modal
  const closeModalHandler = () => {
    setModalVisible(!modalVisible);
  };

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
      // console.log('RESFULL NAME & STATUS : ', resFullName, currStatus);
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

  //For deleting resource
  const deleteResourceFun = id => {
    console.log('RESOURCE TO DELTE : ', id);
    setIdToDelete(id);
    setModalVisible(true);
  };

  // const {
  //   resourceError,
  //   resourceRequest,
  //   resourceSuccess,
  //   deleteResourceRequest,
  //   deleteResourceSuccess,
  //   deleteResourceError,
  // } = reducer;

  // const DeleteResource = id => {
  //   dispatch(deleteResource(id));
  // };

  // const EditResource = id => {
  //   console.log(id);
  // };

  // useEffect(() => {
  //   if (deleteResourceSuccess) {
  //     setLoading(true);
  //     dispatch(fetchResurces());
  //   }
  // }, [deleteResourceSuccess, dispatch]);

  // useEffect(() => {
  //   if (resourceSuccess) {
  //     // console.log('RESOURCE DATA ++>', resourceSuccess.data.resources);
  //     setResources(resourceSuccess.data.resources);
  //     setFilterResources(resourceSuccess.data.resources);
  //     setLoading(false);
  //   }
  // }, [resourceSuccess]);

  // useEffect(() => {
  //   if (resourceError) {
  //     setLoading(false);
  //     setError(resourceError);
  //     setResources([]);
  //   }
  // }, [resourceError]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     dispatch(fetchResurces());
  //   });
  //   return unsubscribe;
  // }, [navigation, dispatch]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('blur', () => {
  //     setLoading(true);
  //     setResources(null);
  //     setError(null);
  //   });
  //   return unsubscribe;
  // }, [navigation, dispatch]);

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.container}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <DeleteResourceView
            onCancel={closeModalHandler}
            idToDel={idToDelete}
          />
        </Modal>
        <SearchBox setSearchValue={setSearchValue} />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
        )}

        {!loading && error !== null && (
          <View style={styles.loadingContainer}>
            <Text> Something went wrong. </Text>
          </View>
        )}

        {!loading && resources && error === null && resources.length === 0 && (
          <View style={styles.loadingContainer}>
            <Text> Resource Information is not found </Text>
          </View>
        )}

        {!loading && resources && resources.length > 0 && (
          <View style={styles.listContainer}>
            <ResourceList
              data={filterResources}
              deleteResourcse={deleteResourceFun}
              // editResourcse={EditResource}
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
