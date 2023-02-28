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
  Alert,
} from 'react-native';
import SearchBox from '../../Components/SearchBox';
import CustomNavigationBar from '../../Components/CustomNavigationBar';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import SmallButton from '../../Components/SmallButton';
import CustomTab from '../../Components/CustomTab';

LogBox.ignoreLogs([
  'VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality - use another VirtualizedList-backed container instead.',
]);

const ShowRes = ({navigation, route}) => {
  const {flag, currRes, dashUpcomingRes, dashProjectTarget} = route.params;
  const currResData = currRes.data.data;
  const dashUpcomingResData = dashUpcomingRes.data;
  const dashProjectTargetData = dashProjectTarget.data;
  // let dispalyData;

  // console.log('FLAG FROM SHOW RESSS', flag);

  const [displayFlag, setDisplayFlag] = useState(flag);
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

  //For setting data to display
  useEffect(() => {
    if (displayFlag === 'currentRes') {
      // dispalyData = currResData;
      setDataToDisplay(currResData);
    } else if (displayFlag === 'upcomingRes') {
      // dispalyData = dashUpcomingResData;
      setDataToDisplay(dashUpcomingResData);
    } else {
      // dispalyData = dashProjectTargetData;
      setDataToDisplay(dashProjectTargetData);
    }
  }, [navigation]);

  const getFilterData = () => {
    const filterValue = dataToDisplay?.filter(data => {
      if (search.length === 0) {
        return data;
      }
      setFilterData(filterValue);
    });
  };

  //For downloading resume
  const onPressViewReport = url => {
    if (url === null || url === undefined) {
      Alert.alert(' ', 'Unable to download the document', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ]);
      return;
    }
    Alert.alert('Download', 'Please download document here', [
      {
        text: 'Yes, Download',
        onPress: () => {
          Linking.canOpenURL(url).then(supported => {
            console.log('Download supported : ', supported);
            if (supported) {
              Linking.openURL(url);
            } else {
              // console.log("Don't know how to open URI: " + getDownloadLinkSuccess.downloadLink);
            }
          });
        },
      },
      {
        style: 'cancel',
        text: 'No',
      },
    ]);
  };

  //For render item of flatlist
  const renderItem = item => {
    if (displayFlag === 'currentRes') {
      return (
        <View style={GLOBALSTYLE.cardView}>
          {/* for name */}
          {/* <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
            <Text style={GLOBALSTYLE.label}>Name</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.fname + ' ' + item.lname}
            </Text>
          </View> */}

          {/*For Name and Email */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.fname === null && item.lname === null
                  ? '-'
                  : item.fname + ' ' + item.lname}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Email</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.email === null ? '-' : item.email}
              </Text>
            </View>
          </View>

          {/*For Name and Email */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Mobile No.</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.phone === null ? '-' : item.phone}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Address</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.resident_address === null ? '-' : item.resident_address}
              </Text>
            </View>
          </View>

          {/*For Technology and Vendor Name */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Technology</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.Technology === null ? '-' : item.Technology}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Vendor Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.company_name === null ? '-' : item.company_name}
              </Text>
            </View>
          </View>

          {/*For Experience and SR */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Experience</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.exp_date === null ? '-' : item.exp_date}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>SR</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.successRatio === null ? '-' : item.successRatio}
              </Text>
            </View>
          </View>

          {/*For CV and Idle */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>CV</Text>
              <TouchableOpacity
                onPress={() => {
                  let resume = item.resume ? item.resume : '--';
                  onPressViewReport(resume);
                }}>
                <Text style={styles.btnTextStyle}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Idle</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.idleDays === null ? '-' : item.idleDays}
              </Text>
            </View>
          </View>
        </View>
      );
    } else if (displayFlag === 'upcomingRes') {
      return (
        <View style={GLOBALSTYLE.cardView}>
          {/*For Name and Address */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.fname === null && item.lname === null
                  ? '-'
                  : item.fname + ' ' + item.lname}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Address</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.resident_address === null ? '-' : item.resident_address}
              </Text>
            </View>
          </View>

          {/*For Technology and Experience */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Technology</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.Technology === null ? '-' : item.Technology}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Experience</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.exp_date === null ? '-' : item.exp_date}
              </Text>
            </View>
          </View>

          {/*For CV and Client Name */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>CV</Text>
              <TouchableOpacity
                onPress={() => {
                  let resume = item.resume ? item.resume : '--';
                  onPressViewReport(resume);
                }}>
                <Text style={styles.btnTextStyle}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.client_name === null ? '-' : item.client_name}
              </Text>
            </View>
          </View>

          {/* End Date */}
          <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
            <Text style={GLOBALSTYLE.label}>End Date</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.end_date === null
                ? '-'
                : new Date(item.end_date)
                    .toDateString('en-US', {})
                    .split(' ')
                    .slice(1)
                    .join(' ')}
            </Text>
          </View>
        </View>
      );
    } else {
      return (
        <View style={GLOBALSTYLE.cardView}>
          {/*For Name and Address */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.fname === null && item.lname === null
                  ? '-'
                  : item.fname + ' ' + item.lname}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Address</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.resident_address === null ? '-' : item.resident_address}
              </Text>
            </View>
          </View>

          {/*For Technology and Experience */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Technology</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.Technology === null ? '-' : item.Technology}
              </Text>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Experience</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.exp_date === null ? '-' : item.exp_date}
              </Text>
            </View>
          </View>

          {/*For CV and Client Name */}
          <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>CV</Text>
              <TouchableOpacity
                onPress={() => {
                  let resume = item.resume ? item.resume : '--';
                  onPressViewReport(resume);
                }}>
                <Text style={styles.btnTextStyle}>View</Text>
              </TouchableOpacity>
            </View>

            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Client Name</Text>
              <Text style={GLOBALSTYLE.text}>
                {item.client_name === null ? '-' : item.client_name}
              </Text>
            </View>
          </View>

          {/* On Project */}
          <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
            <Text style={GLOBALSTYLE.label}>On Project</Text>
            <Text style={GLOBALSTYLE.text}>
              {item.on_project === null ? '-' : item.on_project}
            </Text>
          </View>
        </View>
      );
    }
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
            customStyle={{marginHorizontal: 0}}
          />
          <SmallButton
            color={COLORS.lightBlue}
            title={'Export'}
            onPressFunction={() => {}}
          />
        </View>
        {/*For current, upcoming and project Buttons */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <CustomTab
            color={COLORS.lightBlue}
            title="Current"
            count={currRes.count}
            onPressFunction={() => {
              setDataToDisplay(currResData);
              setDisplayFlag('currentRes');
              setRefreshFlatList(!refreshFlatlist);
            }}
          />
          <CustomTab
            color={COLORS.lightBlue}
            title="Upcoming"
            count={dashUpcomingRes.count}
            onPressFunction={() => {
              setDataToDisplay(dashUpcomingResData);
              setDisplayFlag('upcomingRes');
              setRefreshFlatList(!refreshFlatlist);
            }}
          />
          <CustomTab
            color={COLORS.lightBlue}
            title="Project"
            count={dashProjectTarget.count}
            onPressFunction={() => {
              setDataToDisplay(dashProjectTargetData);
              setDisplayFlag('projectTarget');
              setRefreshFlatList(!refreshFlatlist);
            }}
          />
        </View>
        <FlatList
          data={dataToDisplay}
          extraData={refreshFlatlist}
          renderItem={({item}) => {
            return renderItem(item);
          }}
          keyExtractor={item => item.id}
          style={styles.flatList}
        />
      </View>
    </SafeAreaView>
  );
};

export default ShowRes;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  flatList: {marginVertical: 20},
  heading: {
    color: '#000',
    fontSize: 25,
    fontWeight: 'bold',
  },
  rowViewAligner: {
    margin: 0,
    marginHorizontal: 20,
    flex: 0,
  },
  columnViewAligner: {marginHorizontal: 30},
  customBtn: {
    width: 100,
    paddingHorizontal: 0,
    marginHorizontal: 0,
  },
  btnTextStyle: {
    color: COLORS.blue,
    fontSize: 14,
  },
});
