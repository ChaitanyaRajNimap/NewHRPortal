import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  getClient,
  getExternalProduct,
  deleteClient,
} from '../../../Redux/Actions/ClientAction';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import SearchBox from '../../../Components/SearchBox';
import SmallButton from '../../../Components/SmallButton';

const Client = ({navigation}) => {
  //For dispatching actions for client reducer
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientReducer);
  console.log('reducerData from client : ', reducerData);

  const [clients, setClients] = useState([]);
  const [filterClients, setFilterClients] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  //for showing loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    //To fetch data when user navigate on this screen
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getClient());
      dispatch(getExternalProduct());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    //for setting state for clients
    if (reducerData.getClientData) {
      setError(null);
      setLoading(false);
      setClients(reducerData.getClientData);
      setFilterClients(reducerData.getClientData);
    } else {
      setError('Data not found!');
    }
  }, [reducerData.getClientData]);

  //for getting filter data on search
  useEffect(() => {
    getClientsFilterData();
  }, [search]);

  //for setting search input text
  const setSearchValue = value => {
    setSearch(value);
  };

  //for filtering search results
  const getClientsFilterData = () => {
    const filterValue = clients?.filter(data => {
      if (search.length === 0) {
        return data;
      } else if (data.account_name) {
        if (
          data.client_name.toLowerCase().includes(search.toLowerCase()) ||
          data.account_name.toLowerCase().includes(search.toLowerCase()) ||
          data.account_email.toLowerCase().includes(search.toLowerCase())
        ) {
          return data;
        }
      }
    });
    setFilterClients(filterValue);
  };

  //For editing client
  const editClient = data => {
    navigation.navigate('EditClient', {newData: data});
    // navigation.navigate('EditClient');
  };

  //For deleting client
  const deleteOk = id => {
    dispatch(deleteClient(id));
    setRefreshFlatList(!refreshFlatlist);
    setSearch('');
    const remaningData = clients.filter(t => t.id !== id);
    setFilterClients([...remaningData]);
  };

  const deleteClientItem = id => {
    Alert.alert(
      'Are you sure want to Delete?',
      'You wont be able to revert this.',
      [
        {
          text: 'Yes, Delete it',
          onPress: () => deleteOk(id),
        },
        {
          type: 'cancel',
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
        },
      ],
    );
  };

  //For render item of flatlist
  const renderItem = item => {
    return (
      <View style={GLOBALSTYLE.cardView}>
        {/* for client name */}
        <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
          <Text style={GLOBALSTYLE.label}>Client Name</Text>
          <Text style={GLOBALSTYLE.text}>
            {item.client_name === null
              ? '-'
              : item.client_name.toString().trim()}
          </Text>
        </View>

        {/*For Resource count and invoice date */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Resource Count</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.resourceCount === null
                ? '-'
                : item.resourceCount.toString().trim()}
            </Text>
          </View>

          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Invoice Date</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.invoice_date === null ? '-' : item.invoice_date}
            </Text>
          </View>
        </View>

        {/*For Credit Period and Account Name */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Credit Period</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.credit_period === null ? '-' : item.credit_period}
            </Text>
          </View>

          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Account Name</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.account_name === null ? '-' : item.account_name}
            </Text>
          </View>
        </View>

        {/* for account email */}
        <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
          <Text style={GLOBALSTYLE.label}>Account Email</Text>
          <TouchableOpacity>
            <Text style={GLOBALSTYLE.text}>
              {item.account_email === null
                ? '-'
                : item.account_email.toString().trim()}
            </Text>
          </TouchableOpacity>
        </View>

        {/*For Edit and Delete Buttons */}
        <View style={GLOBALSTYLE.rowView}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Edit'}
            onPressFunction={() => {
              editClient(item);
              {
                console.log('ITEM FROM CLIENT ====>', item);
              }
            }}
          />
          <SmallButton
            color={COLORS.red}
            title={'Delete'}
            onPressFunction={() => {
              deleteClientItem(item.id);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <SearchBox setSearchValue={setSearchValue} />

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={COLORS.blue} />
        </View>
      )}

      {!loading && error && (
        <View style={styles.loadingContainer}>
          <Text>Something Went Wrong</Text>
        </View>
      )}

      {!loading && clients && clients.length === 0 && (
        <View style={styles.loadingContainer}>
          <Text> Clients Information is not found </Text>
        </View>
      )}

      {!loading && clients && clients.length > 0 && (
        <FlatList
          data={filterClients}
          extraData={refreshFlatlist}
          renderItem={({item}) => {
            return renderItem(item);
          }}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  columnViewAligner: {
    marginHorizontal: 20,
  },
  rowViewAligner: {
    marginHorizontal: 10,
  },
  SmallButtonAligner: {
    marginHorizontal: 0,
  },
});

export default Client;
