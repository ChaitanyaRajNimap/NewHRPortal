import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';

const ClientAgreementEnd = ({data}) => {
  //For res contract end flalist item
  const renderItem = item => {
    // console.log(item);
    return (
      <View style={styles.listContainer}>
        <Text style={styles.text}>{item.client.client_name}</Text>
        <Text style={[styles.text, {width: '35%', textAlign: 'center'}]}>
          {item.end_date === null
            ? '-'
            : new Date(item.end_date).toLocaleDateString('en-GB', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
              })}
        </Text>
      </View>
    );
  };

  //   console.log('DTA FRM Client agreement  ', data);

  return (
    <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
      <View style={styles.headrViewStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Resource Contract End</Text>
        </View>
      </View>
      <View style={[styles.listContainer, styles.listHeaderContainer]}>
        <Text style={[styles.text, styles.listHeader]}>Client Name</Text>
        <Text
          style={[
            styles.text,
            styles.listHeader,
            {width: '30%', textAlign: 'center'},
          ]}>
          End Date
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        style={styles.flatListStyle}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default ClientAgreementEnd;

const styles = StyleSheet.create({
  cardViewAligner: {
    // height: 225,
    padding: 0,
    borderRadius: 20,
    margin: 0,
  },
  headrViewStyle: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'center',
    backgroundColor: COLORS.lightBlue,
    justifyContent: 'space-between',
  },
  headerContentStyle: {
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerTextStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.white,
  },
  flatListStyle: {
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  listHeaderContainer: {
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 17,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  listHeader: {
    color: COLORS.lightBlue,
    fontSize: 14,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 14,
  },
});
