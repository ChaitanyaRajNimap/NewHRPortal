import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';

const TopClients = ({data}) => {
  //For top clients flalist item
  const renderItem = item => {
    return (
      <View style={styles.topClientsContainer}>
        <Text style={styles.normaltext}>{item.client_name}</Text>
        <TouchableOpacity style={{width: '50%', alignItems: 'center'}}>
          <Text style={[styles.normaltext, {color: COLORS.lightBlue}]}>
            {item.resourcecount}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={[GLOBALSTYLE.cardView, {paddingHorizontal: 15}]}>
      <Text style={styles.dashHeadTitle}>Top Clients</Text>
      <View style={styles.topClientsContainer}>
        <Text style={styles.title}>Client Name</Text>
        <Text style={styles.title}>No. Of Resources</Text>
      </View>
      <FlatList
        data={data}
        renderItem={({item}) => {
          return renderItem(item);
        }}
      />
    </View>
  );
};

export default TopClients;

const styles = StyleSheet.create({
  dashHeadTitle: {
    marginBottom: 10,
    color: COLORS.black,
    fontSize: 20,
    fontWeight: 'bold',
  },
  topClientsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title: {
    marginBottom: 5,
    color: COLORS.lightBlue,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
