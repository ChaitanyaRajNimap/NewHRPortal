import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import SearchBox from '../../../Components/SearchBox';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {getInitialClientAgreement} from '../../../Redux/Actions/ClientAgreementAction';
import {useSelector, useDispatch} from 'react-redux';
import SmallButton from '../../../Components/SmallButton';
import {COLORS} from '../../../Constants/Theme';
import CustomButton from '../../../Components/CustomButton';
import ViewClientAgreementPDF from './viewClientAgreementPDF/ViewClientAgreementPDF';

const ClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);

  const [clientAgreements, setClientAgreements] = useState([]);
  const [filterClientAgreements, setFilterClientAgreements] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pdfSrc, setPdfSrc] = useState([]);

  useEffect(() => {
    //To fetch data when user navigate on this screen
    const unSubscribe = navigation.addListener('focus', () => {
      dispatch(getInitialClientAgreement());
    });
    return unSubscribe;
  }, [navigation]);

  //for getting filter data on search
  useEffect(() => {
    getAccountFilterData();
  }, [search]);

  useEffect(() => {
    // console.log("-------------------", reducerData.clientAgreementData)
    setClientAgreements(reducerData.clientAgreementData);
    setFilterClientAgreements(reducerData.clientAgreementData);
  }, [reducerData.clientAgreementData]);

  //for setting search input text
  const setSearchValue = value => {
    setSearch(value);
  };

  //for filtering search results
  const getAccountFilterData = () => {
    const filterValue = clientAgreements?.filter(data => {
      const resourceFirstName = data.resources.map(item =>
        item.fname.toLowerCase(),
      );
      const resourceLastName = data.resources.map(item =>
        item.lname.toLowerCase(),
      );
      const resourceFullNames = data.resources.map(
        item => item.fname.toLowerCase() + ' ' + item.lname.toLowerCase(),
      );
      if (search.length === 0) {
        return data;
      } else if (data.client !== null) {
        if (
          data.client.client_name
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          resourceFirstName.includes(search.toLowerCase()) ||
          resourceLastName.includes(search.toLowerCase()) ||
          resourceFullNames.includes(search.toLowerCase())
        ) {
          // console.log('SERACH RESULTS : ' + data);
          return data;
        }
      }
    });
    setFilterClientAgreements(filterValue);
  };

  //For closing model
  const closeModalHandler = () => setModalVisible(!modalVisible);

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <ViewClientAgreementPDF pdfSrc={pdfSrc} onCancel={closeModalHandler} />
      </Modal>
      <SearchBox setSearchValue={setSearchValue} />
      {/* <Text>{clientAgreements.map(item => console.log(item.id))}</Text> */}
      <FlatList
        data={filterClientAgreements}
        renderItem={({item}) => (
          <View style={GLOBALSTYLE.cardView}>
            {/* for client name */}
            <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <TouchableOpacity>
                <Text style={GLOBALSTYLE.text}>
                  {item.client.client_name === null
                    ? '-'
                    : item.client.client_name}
                </Text>
              </TouchableOpacity>
            </View>

            {/* for resources */}
            <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
              <Text style={GLOBALSTYLE.label}>Resource</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.resources === null
                  ? '-'
                  : item.resources.map(item => item.fname + ' ' + item.lname)}
              </Text>
            </View>

            {/* for start and end dates */}
            <View style={GLOBALSTYLE.rowView}>
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Start Date</Text>
                <Text style={GLOBALSTYLE.text}>
                  {item.start_date === null
                    ? '-'
                    : new Date(item.start_date)
                        .toDateString('en-US', {})
                        .split(' ')
                        .slice(1)
                        .join(' ')}
                </Text>
              </View>

              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>End Date</Text>
                <Text style={GLOBALSTYLE.text}>
                  {item.start_date === null
                    ? '-'
                    : new Date(item.end_date)
                        .toDateString('en-US', {})
                        .split(' ')
                        .slice(1)
                        .join(' ')}
                </Text>
              </View>
            </View>

            {/* for pdf viewer */}
            <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
              <Text style={GLOBALSTYLE.label}>PDF</Text>
              <TouchableOpacity
                onPress={() => {
                  setModalVisible(true);
                  setPdfSrc(item.pdf_file);
                  // Linking.openURL(item.resume === null ? '-' : item.resume);
                }}>
                <Text style={[GLOBALSTYLE.text, {color: COLORS.lightBlue}]}>
                  View
                </Text>
              </TouchableOpacity>
            </View>

            {/* for edit button */}
            <CustomButton
              title="Edit"
              onPressFunction={() => {}}
              style={styles.customBtnAligner}
            />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ClientAgreement;

const styles = StyleSheet.create({
  columnViewAligner: {
    marginHorizontal: 15,
  },
  SmallButtonAligner: {
    marginHorizontal: 0,
  },
});
