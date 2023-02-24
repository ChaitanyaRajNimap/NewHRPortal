import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../Constants/Styles';
import {COLORS} from '../../Constants/Theme';
import SmallButton from '../../Components/SmallButton';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Notes = ({data, navigation}) => {
  //For converting data to display
  const convertDate = value => {
    const currentDate = value || date;
    let tempDate = new Date(currentDate);
    let month = '' + (tempDate.getMonth() + 1),
      day = '' + tempDate.getDate(),
      year = tempDate.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }

    return [day, month, year].join('/');
  };

  //For notes flatlist item
  const renderItem = item => {
    let createdBy = item.created_by !== null ? item.created_by.name : 'null';
    return (
      <View style={styles.noteContainer}>
        <View style={styles.note}>
          <Text style={styles.noteMsg}>{item.notes}</Text>
          <Text style={styles.noteText}>Added By: {createdBy}</Text>
          <Text style={styles.noteText}>
            Last Modified: {convertDate(item.updated_at)}
          </Text>
        </View>
        {/*For Edit and Delete Buttons */}
        <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Edit'}
            onPressFunction={() => {
              // openModal(item);
              navigation.navigate('EditNote', {
                noteId: item.id,
                noteMsg: item.notes,
              });
            }}
          />
          <SmallButton
            color={COLORS.red}
            title={'Delete'}
            onPressFunction={() => {}}
          />
        </View>
      </View>
    );
  };

  return (
    <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
      <View style={styles.headrViewStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Notes</Text>
        </View>
        <TouchableOpacity onPress={() => {}}>
          <AntDesign name="plus" size={30} color={COLORS.white} />
        </TouchableOpacity>
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

export default Notes;

const styles = StyleSheet.create({
  cardViewAligner: {
    height: 230,
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
  noteContainer: {
    marginBottom: 5,
  },
  rowViewAligner: {
    margin: 0,
  },
  noteMsg: {
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 18,
  },
  noteText: {
    marginBottom: 5,
    color: COLORS.black,
    fontSize: 14,
  },
});
