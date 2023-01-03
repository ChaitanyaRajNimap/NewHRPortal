import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import SearchBox from '../../../Components/SearchBox';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {
  getClientAgreement,
  addClientAgreement,
  updateClientAgreement,
  deleteClientAgreement,
} from '../../../Redux/Actions/ClientAgreementAction';
import SmallButton from '../../../Components/SmallButton';
import {COLORS} from '../../../Constants/Theme';

const ClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);

  const [clientAgreement, setClientAgreement] = useState([]);
  const [filterClientAgreement, setFilterClientAgreement] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      dispatch(getClientAgreement());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    getAccountFilterData();
  }, [search]);

  useEffect(() => {
    console.log('-------------------', reducerData.getClientAgreementData);
    setClientAgreement(reducerData.getClientAgreementData);
    setFilterClientAgreement(reducerData.getClientAgreementData);
  }, [reducerData.getClientAgreementData]);

  const setSearchValue = value => {
    setSearch(value);
  };

  const getAccountFilterData = () => {
    const filterValue = clientAgreement?.filter(data => {
      if (search.length === 0) {
        return data;
      } else if (
        data.fname.toLowerCase().includes(search.toLowerCase()) ||
        data.lname.toLowerCase().includes(search.toLowerCase()) ||
        data.resident_address.includes(search.toLowerCase())
      ) {
        console.log(data);
        return data;
      }
    });
    setFilterClientAgreement(filterValue);
  };

  const editClienAgreement = data => {
    navigation.navigate('EditClientAgreement', {newData: data});
  };

  const deleteOk = id => {
    dispatch(deleteClientAgreement(id));
    setRefreshFlatList(!refreshFlatlist);
    setSearch('');
    const remaningData = clientAgreement.filter(t => t.id !== id);
    setFilterClientAgreement([...remaningData]);
  };

  const deleteClientAg = id => {
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

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <SearchBox setSearchValue={setSearchValue} />
      <View>
        <FlatList
          data={filterClientAgreement}
          extraData={refreshFlatlist}
          renderItem={({item}) => (
            <View style={GLOBALSTYLE.cardView}>
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Name</Text>
                <TouchableOpacity>
                  <Text style={GLOBALSTYLE.text}>
                    {item.fname === null ? '-' : `${item.fname} ${item.lname}`}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Locality</Text>
                <Text style={GLOBALSTYLE.text}>
                  {item.resident_address === null
                    ? '-'
                    : item?.resident_address}
                </Text>
              </View>
              <View style={GLOBALSTYLE.rowView}>
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Skill</Text>
                  <Text style={GLOBALSTYLE.text}>
                    {item?.primary_skill === null ? '-' : item?.primary_skill}
                  </Text>
                </View>
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Target Date</Text>

                  <Text style={GLOBALSTYLE.text}>
                    {item.date === null
                      ? '-'
                      : new Date(item.date)
                          .toDateString('en-US', {})
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLE.rowView}>
                <SmallButton
                  color={COLORS.lightBlue}
                  title={'Edit'}
                  onPressFunction={() => {
                    editClienAgreement(item);
                  }}
                />
                <SmallButton
                  color={COLORS.red}
                  title={'Delete'}
                  onPressFunction={() => {
                    deleteClientAg(item.id);
                  }}
                />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ClientAgreement;
