import React from 'react';
import {View, Text, StyleSheet, FlatList} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';

const DashBoardHead = ({data}) => {
  //For rendering item of flatlist
  const renderItem = item => {
    return (
      <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
        <Text style={[styles.dashHeadValue, {color: item.color}]}>
          {item.value}
        </Text>
        <Text style={[styles.dashHeadTitle, {marginBottom: 0}]}>
          {item.name}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.dashHeadsContainer}>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        keyExtractor={item => item.id}
        horizontal
      />
    </View>
  );
};

export default DashBoardHead;

const styles = StyleSheet.create({
  dashHeadsContainer: {
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  cardViewAligner: {
    height: 100,
    width: 230,
    marginHorizontal: 5,
    marginBottom: 0,
    paddingHorizontal: 15,
  },
  dashHeadValue: {
    marginBottom: 10,
    color: '#000',
    fontSize: 30,
    fontWeight: 'bold',
  },
  dashHeadTitle: {
    marginBottom: 10,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
