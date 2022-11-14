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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [resources, setResources] = useState(null);
  const [error, setError] = useState(null);

  const {reducer} = useSelector(state => ({
    reducer: state.resource,
  }));

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
      setResources(resourceSuccess.data.resources);
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
        <SearchBox />
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
              data={resources}
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
