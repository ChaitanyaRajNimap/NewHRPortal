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
  getNotes as getNotesAction,
  getTopClientDetails as getTopClientDetailsAction,
  getCurrentRes as getCurrentResAction,
  getDashUpcomingRes as getDashUpcomingResAction,
  getDashProjectTarget as getDashProjectTargetAction,
  getResContractEnd,
  getPurchaseOrderEnd,
  getClientAgreementEnd,
  deleteNotes,
  resetNotes,
} from '../../Redux/Actions/DashboardAction';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import DashBoardHead from './DashBoardHead';
import TopClients from './TopClients';
import Notes from './Notes/Notes';
import DashBoardRes from './DashBoardRes';
import ResContractEnd from './ResContractEnd';
import PurchaseOrderEnd from './PurchaseOrderEnd';
import ClientAgreementEnd from './ClientAgreementEnd';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const Home = ({navigation}) => {
  //For dispatching actions for dashboard reducer
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.DashboardReducer);
  // console.log('reducerData from dashboard : ', reducerData);
  const {
    getNotes,
    deleteNotesData,
    getCurrentRes,
    getDashUpcomingRes,
    getDashProjectTarget,
  } = reducerData;

  const [dashboardHeadData, setDashboardHeadData] = useState([]);
  const [topClients, setTopClients] = useState([]);
  const [notes, setNotes] = useState([]);
  const [currRes, setCurrRes] = useState([]);
  const [dashUpcomingRes, setDashUpcomingRes] = useState([]);
  const [dashProjectTarget, setDashProjectTarget] = useState([]);
  const [resContractEnd, setResContractEnd] = useState([]);
  const [purchaseOrderEnd, setPurchaseOrderEnd] = useState([]);
  const [clientAgreementEnd, setClientAgreementEnd] = useState([]);

  //For showing loading
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For making call for getNotes
  useEffect(() => {
    if (getNotes && getNotes.length > 0) {
      setNotes(getNotes);
    }
    dispatch(resetNotes());
  }, [getNotes]);

  //For calling getNotes data after deleting
  useEffect(() => {
    if (deleteNotesData) {
      dispatch(getNotesAction());
    }
  }, [deleteNotesData]);

  useEffect(() => {
    //To fetch data when user navigate on this screen
    const unSubscribe = navigation.addListener('focus', () => {
      setLoading(true);
      dispatch(getDashboardHead());
      dispatch(getTopClients());
      dispatch(getNotesAction());
      dispatch(getCurrentResAction());
      dispatch(getDashUpcomingResAction());
      dispatch(getDashProjectTargetAction());
      dispatch(getResContractEnd());
      dispatch(getPurchaseOrderEnd());
      dispatch(getClientAgreementEnd());
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
      setCurrRes(reducerData.getCurrentRes);
      setDashUpcomingRes(reducerData.getDashUpcomingRes);
      setDashProjectTarget(reducerData.getDashProjectTarget);
      setResContractEnd(reducerData.getResContractEnd);
      setPurchaseOrderEnd(reducerData.getPurchaseOrderEnd);
      setClientAgreementEnd(reducerData.getClientAgreementEnd);
    } else {
      setError('Data not found!');
    }
  }, [reducerData]);

  //For handling res press in top clients
  const handleResPress = clientId => {
    dispatch(getTopClientDetailsAction(clientId)).then(data => {
      navigation.navigate('ResourceDetails', {
        topClientDetails: data,
      });
    });
  };

  //For deleting client
  const deleteOk = id => {
    dispatch(deleteNotes(id));
  };

  //For handling note delete
  const handleNoteDelete = id => {
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

        {!loading &&
        dashboardHeadData &&
        dashboardHeadData.length !== 0 &&
        topClients &&
        topClients.length !== 0 &&
        notes &&
        notes.length !== 0 &&
        currRes &&
        currRes.length !== 0 &&
        dashUpcomingRes &&
        dashProjectTarget.length !== 0 &&
        dashProjectTarget &&
        dashProjectTarget.length !== 0 &&
        resContractEnd &&
        resContractEnd.length !== 0 &&
        purchaseOrderEnd &&
        purchaseOrderEnd.length !== 0 &&
        clientAgreementEnd &&
        clientAgreementEnd.length !== 0 ? (
          <ScrollView nestedScrollEnabled={true} style={styles.rootContainer}>
            {!loading && dashboardHeadData && dashboardHeadData.length !== 0 ? (
              <DashBoardHead data={dashboardHeadData} />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Dashboard information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading && topClients && topClients.length !== 0 ? (
              <TopClients
                navigation={navigation}
                data={topClients}
                onResPress={handleResPress}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Top clients information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading && notes && notes.length !== 0 ? (
              <Notes
                data={notes}
                navigation={navigation}
                deleteNote={handleNoteDelete}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Notes information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading &&
            currRes &&
            currRes.length !== 0 &&
            dashUpcomingRes &&
            dashProjectTarget.length !== 0 &&
            dashProjectTarget &&
            dashProjectTarget.length !== 0 ? (
              <DashBoardRes
                navigation={navigation}
                currRes={currRes}
                dashUpcomingRes={dashUpcomingRes}
                dashProjectTarget={dashProjectTarget}
              />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Dashboard resources information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading && resContractEnd && resContractEnd.length !== 0 ? (
              <ResContractEnd data={resContractEnd} />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Res contract end information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading && purchaseOrderEnd && purchaseOrderEnd.length !== 0 ? (
              <PurchaseOrderEnd data={purchaseOrderEnd} />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Purchase order end information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}

            {!loading &&
            clientAgreementEnd &&
            clientAgreementEnd.length !== 0 ? (
              <ClientAgreementEnd data={clientAgreementEnd} />
            ) : (
              <View style={styles.loadingContainer}>
                <Text>Client agreement end information is not found</Text>
                {/* <ActivityIndicator size="large" color={COLORS.blue} /> */}
              </View>
            )}
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={COLORS.blue} />
          </View>
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
