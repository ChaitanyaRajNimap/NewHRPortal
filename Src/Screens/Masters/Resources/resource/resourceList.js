import React from 'react';
import {FlatList, View, Text, StyleSheet, Alert, Linking} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import dayjs from 'dayjs';

function ResourceList({data, deleteResourcse, editResourcse}) {
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
            console.log(supported);
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

  const _renderItem = ({item}) => {
    return (
      <View style={[GLOBALSTYLE.cardView]}>
        {(item.fname || item.lname) && (
          <View style={styles.nameViewStyle}>
            <Text style={styles.indicatorTextStyle}>Name</Text>
            <Text style={styles.contentTextStyle}>
              {item.fname} {item.lname}
            </Text>
          </View>
        )}
        {item.resident_address && (
          <View style={styles.personViewStyle}>
            <Text style={styles.indicatorTextStyle}>Address</Text>
            <Text style={styles.contentTextStyle}>{item.resident_address}</Text>
          </View>
        )}
        <View style={styles.upperViewStyle}>
          {item.email && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>Email Id:</Text>
              <Text style={styles.contentTextStyle}>{item.email}</Text>
            </View>
          )}
          {item.phone && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>Mobile</Text>
              <Text style={styles.contentTextStyle}>{item.phone}</Text>
            </View>
          )}
        </View>
        <View style={styles.upperViewStyle}>
          {item.language && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>Language</Text>
              <Text style={styles.contentTextStyle}>{item.language}</Text>
            </View>
          )}
          {item.resume && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>CV</Text>
              <TouchableOpacity
                onPress={() => {
                  onPressViewReport(item.resume);
                }}>
                <Text style={styles.btnTextStyle}>View</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        {item.on_bench === 1 && (
          <View style={styles.personViewStyle}>
            <Text style={styles.indicatorTextStyle}>Status</Text>
            <Text style={styles.benchStatusTextStyle}>
              Bench(
              {item.contract_start_date
                ? dayjs(item.contract_start_date).format('D MMM, YYYY')
                : null}
              {item.contract_start_date ? ' - ' : null}
              {item.contract_end_date
                ? dayjs(item.contract_end_date).format('D MMM, YYYY')
                : null}
              )
            </Text>
          </View>
        )}
        {item.on_bench === 0 && (
          <View style={styles.personViewStyle}>
            <Text style={styles.indicatorTextStyle}>Status</Text>
            <Text style={styles.clientStatusTextStyle}>Client Side</Text>
          </View>
        )}
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.blue}
              title={'Edit'}
              onPressFunction={() => {
                editResourcse(item.id);
              }}
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.red}
              title={'Delete'}
              onPressFunction={() => {
                deleteResourcse(item.id);
              }}
            />
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={_renderItem}
        keyExtractor={item => `resources${item.id}`}
      />
    </View>
  );
}

export default ResourceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
    borderRadius: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  nameViewStyle: {
    width: '100%',
  },
  personViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  innerViewStyle: {
    flex: 1,
  },
  upperViewStyle: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  indicatorTextStyle: {
    color: COLORS.grey,
    fontSize: 12,
  },
  contentTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  btnTextStyle: {
    color: COLORS.blue,
    fontSize: 14,
  },
  benchStatusTextStyle: {
    color: COLORS.tomatto,
    fontSize: 14,
  },
  clientStatusTextStyle: {
    color: COLORS.lightgreen,
    fontSize: 14,
  },
});
