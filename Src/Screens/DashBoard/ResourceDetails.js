import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import CustomNavigationBar from '../../Components/CustomNavigationBar';

const ResourceDetails = ({route}) => {
  const {topClientDetails} = route.params;

  //For downloading CV pdf
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

  //For resource details flatlist item
  const renderItem = item => {
    return (
      <View style={GLOBALSTYLE.cardView}>
        {/*For name */}
        <View style={[GLOBALSTYLE.columnView, styles.columnViewAligner]}>
          <Text style={GLOBALSTYLE.label}>Name</Text>
          <Text style={GLOBALSTYLE.text}>{item.fname + ' ' + item.lname}</Text>
        </View>

        {/*For email id and mobile no */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Email ID</Text>
            <Text style={GLOBALSTYLE.text}>{item.personal_email}</Text>
          </View>

          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Mobile No.</Text>
            <Text style={GLOBALSTYLE.text}>{item.phone}</Text>
          </View>
        </View>

        {/*For address and cv */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Address</Text>
            <Text style={GLOBALSTYLE.text}>{item.resident_address}</Text>
          </View>

          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>CV</Text>
            <TouchableOpacity
              onPress={() => {
                let resume = item.resume ? item.resume : '--';
                onPressViewReport(resume);
              }}>
              <Text style={[GLOBALSTYLE.text, {color: COLORS.lightBlue}]}>
                View
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <View style={styles.rootContainer}>
        <CustomNavigationBar back={true} headername="Resource Details" />
        <FlatList
          data={topClientDetails}
          renderItem={({item}) => {
            return renderItem(item);
          }}
          keyExtractor={(item, index) => index.toString()}
          style={styles.flatlistStyle}
        />
      </View>
    </SafeAreaView>
  );
};

export default ResourceDetails;

const styles = StyleSheet.create({
  rootContainer: {flex: 1},
  flatlistStyle: {marginVertical: 10},
  columnViewAligner: {marginHorizontal: 20},
  rowViewAligner: {marginHorizontal: 10},
});
