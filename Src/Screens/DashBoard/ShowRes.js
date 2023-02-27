import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  LogBox,
} from 'react-native';
import SearchBox from '../../Components/SearchBox';
import CustomNavigationBar from '../../Components/CustomNavigationBar';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import SmallButton from '../../Components/SmallButton';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const ShowRes = ({navigation, route}) => {
  const {flag} = route.params;
  console.log('FLAG FROM SHOW RESSS', flag);

  const [dataToDisplay, setDataToDisplay] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [search, setSearch] = useState('');
  const [refreshFlatlist, setRefreshFlatList] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  //For getting filter data on search
  useEffect(() => {
    getFilterData();
  }, [search]);

  //For setting search input text
  const setSearchValue = value => {
    setSearch(value);
  };

  const getFilterData = () => {
    const filterValue = dataToDisplay?.filter(data => {
      if (search.length === 0) {
        return data;
      }
      setFilterData(filterValue);
    });
  };

  //For render item of flatlist
  const renderItem = item => {
    return (
      <View style={GLOBALSTYLE.cardView}>
        {/* for name */}
        <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
          <Text style={GLOBALSTYLE.label}>Full Name</Text>
          <Text style={GLOBALSTYLE.text}>Jhon Doe</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.rootContainer}>
        <CustomNavigationBar back={true} headername="Show Resource" />
        <SearchBox setSearchValue={setSearchValue} />
        {/*For Filter and Export Buttons */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Filter'}
            onPressFunction={() => {}}
          />
          <SmallButton
            color={COLORS.lightBlue}
            title={'Export'}
            onPressFunction={() => {}}
          />
        </View>
        {!loading && dataToDisplay && dataToDisplay > 0 && (
          <FlatList
            data={dataToDisplay}
            extraData={refreshFlatlist}
            renderItem={({item}) => {
              return renderItem(item);
            }}
            keyExtractor={item => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ShowRes;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  rowViewAligner: {
    margin: 0,
    flex: 0,
  },
  columnViewAligner: {marginHorizontal: 20},
});
