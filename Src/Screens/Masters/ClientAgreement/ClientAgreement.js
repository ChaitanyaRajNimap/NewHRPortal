import React, {useState, useEffect} from 'react';

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
import {getInitialClientAgreement} from '../../../Redux/Actions/ClientAgreementAction';
import {useSelector, useDispatch} from 'react-redux';
import SmallButton from '../../../Components/SmallButton';
import {COLORS} from '../../../Constants/Theme';
import ViewClientAgreementPDF from './viewClientAgreementPDF/ViewClientAgreementPDF';

const ClientAgreement = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ClientAgreementReducer);

  const [clientAgreements, setClientAgreements] = useState([]);
  const [filterClientAgreements, setFilterClientAgreements] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      dispatch(getInitialClientAgreement());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    // console.log("-------------------", reducerData.clientAgreementData)
    setClientAgreements(reducerData.clientAgreementData);
  }, [reducerData.clientAgreementData]);

  const setSearchValue = value => {
    setSearch(value);
  };

  //For making modal visible
  const startPdfViewer = () => {
    setModalIsVisible(true);
  };

  //For making modal invisible
  const endPdfViewer = () => {
    setModalIsVisible(false);
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <SearchBox setSearchValue={setSearchValue} />
      {/* <Text>{clientAgreements.map(item => console.log(item.id))}</Text> */}
      <FlatList
        data={clientAgreements}
        renderItem={({item}) => (
          <View style={GLOBALSTYLE.cardView}>
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

            <View style={GLOBALSTYLE.rowView}>
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Resource</Text>
                <Text style={GLOBALSTYLE.text}>
                  {item.resources === null
                    ? '-'
                    : item.resources.map(item => item.fname + ' ' + item.lname)}
                </Text>
              </View>

              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>PDF</Text>
                <TouchableOpacity
                  onPress={() => {
                    // Linking.openURL(item.resume === null ? '-' : item.resume);
                    item.pdf_file === null ? '-' : startPdfViewer();
                  }}>
                  <ViewClientAgreementPDF
                    pdfSrc={item.pdf_file}
                    visible={modalIsVisible}
                    onCancel={endPdfViewer}
                  />
                  <Text style={[GLOBALSTYLE.text, {color: COLORS.lightBlue}]}>
                    View
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

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

            <View style={[GLOBALSTYLE.columnView, styles.SmallButtonAligner]}>
              <SmallButton
                color={COLORS.lightBlue}
                title={'Edit'}
                onPressFunction={() => {
                  // editProject(item);
                }}
              />
            </View>
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
