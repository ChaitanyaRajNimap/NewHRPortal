import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  LogBox,
} from 'react-native';
import {
  getNotes as getNotesAction,
  deleteNotes,
  resetNotes,
} from '../../../Redux/Actions/DashboardAction';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import SmallButton from '../../../Components/SmallButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const ShowNote = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.DashboardReducer);
  const {getNotes, deleteNotesData} = reducerData;

  //   const [notesData, setNotesData] = useState(data);
  const [notesData, setNotesData] = useState([]);
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  //For making call for getNotes
  useEffect(() => {
    if (getNotes && getNotes.length > 0) {
      setNotesData(getNotes);
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
      //   setLoading(true);
      dispatch(getNotesAction());
    });
    return unSubscribe;
  }, [navigation]);

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

  //For notes flatlist item
  const renderItem = item => {
    let createdBy = item.created_by !== null ? item.created_by.name : 'null';
    return (
      <View style={GLOBALSTYLE.cardView}>
        {/*For Message */}
        <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
          <Text style={GLOBALSTYLE.label}>Message</Text>
          <Text style={GLOBALSTYLE.text}>{item.notes}</Text>
        </View>

        {/*For Added By and Last Modified */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Added By</Text>
            <Text style={GLOBALSTYLE.text}>{createdBy}</Text>
          </View>

          <View style={[GLOBALSTYLE.columnView, {marginLeft: 25}]}>
            <Text style={GLOBALSTYLE.label}>Last Modified</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.updated_at === null
                ? '-'
                : new Date(item.updated_at).toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric',
                  })}
            </Text>
          </View>
        </View>

        {/*For Edit and Delete Buttons */}
        <View style={GLOBALSTYLE.rowView}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Edit'}
            onPressFunction={() => {
              navigation.navigate('EditNote', {
                noteId: item.id,
                noteMsg: item.notes,
              });
            }}
          />
          <SmallButton
            color={COLORS.red}
            title={'Delete'}
            onPressFunction={() => {
              handleNoteDelete(item.id);
            }}
          />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.rootContainer}>
        <View style={styles.headrViewStyle}>
          <TouchableOpacity
            style={styles.leftBtnStyle}
            onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={30} color="#000" />
          </TouchableOpacity>
          <View style={styles.headerContentStyle}>
            <Text style={styles.headerTextStyle}>Notes</Text>
          </View>
          <TouchableOpacity
            style={styles.rightBtnStyle}
            onPress={() => {
              navigation.navigate('AddNote');
            }}>
            <AntDesign name="plus" size={30} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={notesData}
          extraData={refreshFlatlist}
          renderItem={({item}) => {
            return renderItem(item);
          }}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShowNote;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  columnViewAligner: {marginHorizontal: 20},
  rowViewAligner: {marginHorizontal: 10},
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headrViewStyle: {
    height: 60,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
    justifyContent: 'space-between',
  },
  headerContentStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  leftBtnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
  },
  rightBtnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
  },
});
