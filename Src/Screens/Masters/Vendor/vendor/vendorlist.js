import React from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';
import {GLOBALSTYLE} from '../../../../Constants/Styles';
import {COLORS} from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';

function VendorList({data}) {
  const _renderItem = ({item}) => {
    return (
      <View style={[GLOBALSTYLE.cardView]}>
        {item.company_name && (
          <View style={styles.nameViewStyle}>
            <Text style={styles.indicatorTextStyle}>Company Name</Text>
            <Text style={styles.contentTextStyle}>{item.company_name}</Text>
          </View>
        )}
        {item.contact_person && (
          <View style={styles.personViewStyle}>
            <Text style={styles.indicatorTextStyle}>Contact Person</Text>
            <Text style={styles.contentTextStyle}>{item.contact_person}</Text>
          </View>
        )}
        <View style={styles.upperViewStyle}>
          {item.contact_email && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>Email Id</Text>
              <Text style={styles.contentTextStyle}>{item.contact_email}</Text>
            </View>
          )}
          {item.contact_number && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>Mobile</Text>
              <Text style={styles.contentTextStyle}>{item.contact_number}</Text>
            </View>
          )}
        </View>
        <View style={styles.upperViewStyle}>
          {item.gst && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>GST Number</Text>
              <Text style={styles.contentTextStyle}>{item.gst}</Text>
            </View>
          )}
          {item.pan && (
            <View style={styles.innerViewStyle}>
              <Text style={styles.indicatorTextStyle}>PAN Number</Text>
              <Text style={styles.contentTextStyle}>{item.pan}</Text>
            </View>
          )}
        </View>
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.blue} title={'Edit'} />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red} title={'Delete'} />
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
        keyExtractor={item => `vendors${item.id}`}
      />
    </View>
  );
}

export default VendorList;

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
    fontSize: 14,
  },
  contentTextStyle: {
    color: COLORS.black,
    fontSize: 14,
  },
});
