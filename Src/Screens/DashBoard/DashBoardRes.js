import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';

const DashBoardRes = ({
  navigation,
  currRes,
  dashUpcomingRes,
  dashProjectTarget,
}) => {
  const dataToRender = [
    {
      id: 0,
      data: 'Current',
      count: currRes.count,
    },
    {
      id: 1,
      data: 'Upcoming',
      count: dashUpcomingRes.count,
    },
    {
      id: 2,
      data: 'Project',
      count: dashProjectTarget.count,
    },
  ];

  //For handling press
  const handlePress = id => {
    let flag;
    if (id === 0) {
      flag = 'currentRes';
    } else if (id === 1) {
      flag = 'upcomingRes';
    } else {
      flag = 'projectTarget';
    }
    console.log('FLAG : ', flag);
    navigation.navigate('ShowRes', {
      flag: flag,
    });
  };

  //For dash board res item
  const renderItem = item => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.text}>{item.data}</Text>
        <TouchableOpacity
          onPress={() => {
            handlePress(item.id);
          }}>
          <Text style={[styles.text, {color: COLORS.lightBlue}]}>
            {item.count}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
      <View style={styles.headrViewStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Resources</Text>
        </View>
      </View>
      <FlatList
        data={dataToRender}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        style={styles.flatListStyle}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default DashBoardRes;

const styles = StyleSheet.create({
  cardViewAligner: {
    height: 150,
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
    fontSize: 18,
    fontWeight: '700',
    color: COLORS.white,
  },
  flatListStyle: {
    paddingVertical: 10,
    paddingHorizontal: 17,
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 15,
  },
});
