import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet, Alert, Linking} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import dayjs from 'dayjs';
import CheckBox from '../../../../Components/CheckBox';

function ResourceList({data, deleteResourcse, editResourcse}) {
  const [checkbox, setCheckbox] = useState(false);

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

  const _renderItem = ({item}) => {
    return (
      <View style={[GLOBALSTYLE.cardView]}>
        {/* <CheckBox
          onPress={() => setCheckbox(!checkbox)}
          title=""
          isChecked={checkbox}
        /> */}
        <TouchableOpacity style={styles.archiveIconContainer}>
          <MaterialIcons name={'archive'} size={26} color={COLORS.purple} />
        </TouchableOpacity>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Name</Text>
            <Text style={styles.contentTextStyle}>
              {item.fname} {item.lname}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Vender</Text>
            <Text style={styles.contentTextStyle}>
              {item.company_name ? item.company_name : '--'}
            </Text>
          </View>
        </View>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Phone No</Text>
            <Text style={styles.contentTextStyle}>
              {item.phone ? item.phone : '--'}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Alternate No</Text>
            <Text style={styles.contentTextStyle}>
              {item.alternate_no ? item.alternate_no : '--'}
            </Text>
          </View>
        </View>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Email Id</Text>
            <Text style={styles.contentTextStyle}>
              {item.personal_email
                ? item.email + '\n' + item.personal_email
                : '--'}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Intr Level</Text>
            <Text style={styles.contentTextStyle}>
              {item.l1 ? item.l1 : '--'}
            </Text>
          </View>
        </View>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Cost</Text>
            <Text style={styles.contentTextStyle}>
              {item.cost ? item.cost : '--'}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Pass Year</Text>
            <Text style={styles.contentTextStyle}>
              {item.passing_year ? item.passing_year : '--'}
            </Text>
          </View>
        </View>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Project</Text>
            <Text style={styles.contentTextStyle}>
              {item.project ? item.project : '--'}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Skills</Text>
            <Text style={styles.contentTextStyle}>
              {item.primary_skill ? item.primary_skill : '--'}
            </Text>
          </View>
        </View>
        <View style={[styles.upperViewStyle, styles.upperViewStyleAligner]}>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>Locality</Text>
            <Text style={styles.contentTextStyle}>
              {item.resident_address ? item.resident_address : '--'}
            </Text>
          </View>
          <View style={styles.innerViewStyle}>
            <Text style={styles.indicatorTextStyle}>CV</Text>
            <TouchableOpacity
              onPress={() => {
                let resume = item.resume ? item.resume : '--';
                onPressViewReport(resume);
              }}>
              <Text style={styles.btnTextStyle}>View</Text>
            </TouchableOpacity>
          </View>
        </View>
        {item.on_bench === 1 && (
          <View style={[styles.personViewStyle, styles.personViewStyleAligner]}>
            <Text style={styles.indicatorTextStyle}>Status</Text>
            <Text style={styles.benchStatusTextStyle}>Bench</Text>
          </View>
        )}
        {item.on_bench === 0 && (
          <View style={[styles.personViewStyle, styles.personViewStyleAligner]}>
            <Text style={styles.indicatorTextStyle}>Status</Text>
            <Text style={styles.clientStatusTextStyle}>
              <Text>{item.client_name ? item.client_name : ' -- '}</Text> (
              <Text style={styles.clientStatusStartTextStyle}>
                {item.contract_start_date
                  ? dayjs(item.contract_start_date).format(' D MMM YYYY ')
                  : null}
              </Text>
              {item.contract_start_date ? ' - ' : null}
              <Text style={styles.clientStatusEndTextStyle}>
                {item.contract_end_date
                  ? dayjs(item.contract_end_date).format(' D MMM YYYY ')
                  : null}
              </Text>
              )
            </Text>
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
  archiveIconContainer: {
    marginHorizontal: 20,
    flex: 1,
    alignItems: 'flex-end',
  },
  nameViewStyle: {
    width: '100%',
  },
  personViewStyle: {
    width: '100%',
    marginTop: 10,
  },
  personViewStyleAligner: {paddingHorizontal: 21},
  innerViewStyle: {
    marginHorizontal: 5,
    flex: 1,
  },
  upperViewStyle: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginTop: 10,
  },
  upperViewStyleAligner: {
    marginHorizontal: 17,
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
    color: COLORS.black,
    fontSize: 14,
  },
  clientStatusTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
  clientStatusStartTextStyle: {color: COLORS.lightgreen},
  clientStatusEndTextStyle: {color: COLORS.tomatto},
});
