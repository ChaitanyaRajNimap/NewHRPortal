import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  LogBox,
  Alert,
  Modal,
} from 'react-native';
import {
  getDashboardHead,
  getTopClients,
  getNotes,
  getTopClientDetails,
  deleteNotes,
} from '../../Redux/Actions/DashboardAction';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import DashBoardHead from './DashBoardHead';
import TopClients from './TopClients';
import Notes from './Notes/Notes';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const Home = ({navigation}) => {
  //For dispatching actions for dashboard reducer
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.DashboardReducer);
  console.log('reducerData from dashboard : ', reducerData);

  const [dashboardHeadData, setDashboardHeadData] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [topClientDetails, setTopClientDetails] = useState([]);
  const [notes, setNotes] = useState([]);
  const [filterNotes, setFilterNotes] = useState([]);
  const [refreshNotes, setRefreshNotes] = useState(false);

  //For showing loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For modal
  // const [modalVisible, setModalVisible] = useState(false);
  const [editMsgToPass, setEditMsgToPass] = useState(null);

  //For notes
  // const [refreshOnNoteUpdate, setRefreshOnNoteUpdate] = useState(false);

  // //For openning modal
  // const openModalHandler = noteMsg => {
  //   setModalVisible(true);
  //   setEditMsgToPass(noteMsg);
  // };

  //For closing model
  // const closeModalHandler = () => setModalVisible(!modalVisible);

  useEffect(() => {
    //To fetch data when user navigate on this screen
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getDashboardHead());
      dispatch(getTopClients());
      dispatch(getNotes());
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    //For setting state for dashboard
    if (reducerData.getDashboardHeadData) {
      setError(null);
      setLoading(false);
      const dashHeadData = [
        {
          id: 1,
          name: 'Total Resources',
          value:
            reducerData.getDashboardHeadData.resourceCount[0]
              .total_resource_count,
          color: COLORS.orange,
        },
        {
          id: 2,
          name: 'In-House Resources',
          value: reducerData.getDashboardHeadData.in_house_resource,
          color: COLORS.lightBlue,
        },
        {
          id: 3,
          name: 'Client Side Resources',
          value: reducerData.getDashboardHeadData.clientResource[0].client_side,
          color: COLORS.purple,
        },
        {
          id: 4,
          name: 'Total Clients',
          value: reducerData.getDashboardHeadData.totalClients[0].total_client,
          color: COLORS.lightgreen,
        },
        {
          id: 5,
          name: 'Active Clients',
          value:
            reducerData.getDashboardHeadData.clientResource[0].active_client,
          color: COLORS.pink,
        },
      ];
      setDashboardHeadData(dashHeadData);
      setTopClients(reducerData.getTopClients);
      setTopClientDetails(reducerData.getTopClientDetails);
      setNotes(reducerData.getNotes);
      setFilterNotes(reducerData.getNotes);
    } else {
      setError('Data not found!');
    }
  }, [reducerData]);

  //For handling res press in top clients
  const handleResPress = clientId => {
    console.log('ClientId ', clientId);
    dispatch(getTopClientDetails(clientId));
  };

  //For deleting client
  const deleteOk = id => {
    dispatch(deleteNotes(id));
    setRefreshNotes(!refreshNotes);
    const remaningData = notes.filter(t => t.id !== id);
    setFilterNotes([...remaningData]);
  };

  //For handling note delete
  const handleNoteDelete = id => {
    console.log('Note id to delete: ', id);
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
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(!modalVisible)}>
        <EditNote
          onCancel={closeModalHandler}
          editMsg={editMsgToPass}
          navigation={navigation}
        />
      </Modal> */}
      <View style={styles.rootContainer}>
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

        {!loading && dashboardHeadData && dashboardHeadData.length === 0 && (
          <View style={styles.loadingContainer}>
            <Text>Dashboard information is not found</Text>
          </View>
        )}

        {!loading && dashboardHeadData && dashboardHeadData.length > 0 && (
          <ScrollView style={styles.rootContainer}>
            <DashBoardHead data={dashboardHeadData} />
            <TopClients
              navigation={navigation}
              data={topClients}
              topClientDetails={topClientDetails}
              onResPress={handleResPress}
            />
            {/* <Notes data={notes} openModal={openModalHandler} /> */}
            {console.log('filterNotes', filterNotes)}
            <Notes
              data={filterNotes}
              extraData={refreshNotes}
              navigation={navigation}
              deleteNote={handleNoteDelete}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rootContainer: {flex: 1},
  // dashHeadsContainer: {
  //   padding: 5,
  //   borderRadius: 10,
  //   marginHorizontal: 10,
  // },
  // cardViewAligner: {
  //   height: 100,
  //   width: 230,
  //   marginHorizontal: 5,
  //   marginBottom: 0,
  //   paddingHorizontal: 15,
  // },
  // dashHeadValue: {
  //   marginBottom: 10,
  //   color: '#000',
  //   fontSize: 30,
  //   fontWeight: 'bold',
  // },
  // dashHeadTitle: {
  //   marginBottom: 10,
  //   color: COLORS.black,
  //   fontSize: 20,
  //   fontWeight: 'bold',
  // },
  // topClientsContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // title: {
  //   marginBottom: 5,
  //   color: COLORS.lightBlue,
  //   fontSize: 18,
  //   fontWeight: 'bold',
  // },
  // normaltext: {
  //   color: COLORS.black,
  //   fontSize: 15,
  // },
});
