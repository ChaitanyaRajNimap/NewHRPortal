import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import AntDesign from 'react-native-vector-icons/AntDesign';

const TopClients = ({navigation, data, onResPress}) => {
  //For passing client of res to Home page
  const handlePress = id => {
    onResPress(id);
  };

  //For top clients flalist item
  const renderItem = item => {
    return (
      <View style={styles.listContainer}>
        <Text style={styles.text}>{item.client_name}</Text>
        <TouchableOpacity
          onPress={() => {
            handlePress(item.client_id);
          }}>
          <Text style={[styles.text, {color: COLORS.lightBlue}]}>
            {item.resourcecount}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
      <View style={styles.headrViewStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Top Clients</Text>
        </View>
        {/* <TouchableOpacity onPress={() => {}}>
          <AntDesign name="arrowright" size={30} color={COLORS.white} />
        </TouchableOpacity> */}
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

export default TopClients;

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
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 14,
  },
});
