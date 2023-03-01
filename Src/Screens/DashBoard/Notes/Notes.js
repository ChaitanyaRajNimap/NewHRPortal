import React from 'react';
import {View, Text, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import SmallButton from '../../../Components/SmallButton';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Notes = ({data, navigation, deleteNote}) => {
  //For deleting note
  const handleDelte = id => {
    deleteNote(id);
  };

  const notesData = data.filter((item, idx) => idx < 2);

  //For notes flatlist item
  const renderItem = item => {
    let createdBy = item.created_by !== null ? item.created_by.name : 'null';
    return (
      <View style={styles.noteContainer}>
        <View style={styles.note}>
          <Text style={styles.noteMsg}>{item.notes}</Text>
          <Text style={styles.noteText}>Added By: {createdBy}</Text>
          <Text style={styles.noteText}>
            Last Modified:{' '}
            {item.updated_at === null
              ? '-'
              : new Date(item.updated_at).toLocaleDateString('en-GB', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                })}
          </Text>
        </View>
        <View style={styles.iconContainer}>
          <TouchableOpacity
            style={styles.iconBtnStyle}
            onPress={() => {
              navigation.navigate('EditNote', {
                noteId: item.id,
                noteMsg: item.notes,
              });
            }}>
            <EvilIcons name="pencil" size={30} color={COLORS.orange} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconBtnStyle}
            onPress={() => {
              handleDelte(item.id);
            }}>
            <MaterialCommunityIcons
              name="delete"
              size={25}
              color={COLORS.red}
            />
          </TouchableOpacity>
        </View>
        {/*For Edit and Delete Buttons */}
        {/* <View style={[GLOBALSTYLE.rowView, styles.rowViewAligner]}>
          <SmallButton
            color={COLORS.lightBlue}
            title={'Edit'}
            onPressFunction={() => {
              navigation.navigate('EditNote', {
                noteId: item.id,
                noteMsg: item.notes,
              });
            }}
          />
          <SmallButton
            color={COLORS.red}
            title={'Delete'}
            onPressFunction={() => {
              handleDelte(item.id);
            }}
          />
        </View> */}
      </View>
    );
  };

  return (
    <View style={[GLOBALSTYLE.cardView, styles.cardViewAligner]}>
      <View style={styles.headrViewStyle}>
        <View style={styles.headerContentStyle}>
          <Text style={styles.headerTextStyle}>Notes</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShowNote');
          }}>
          <AntDesign name="arrowright" size={30} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notesData}
        renderItem={({item}) => {
          return renderItem(item);
        }}
        ItemSeparatorComponent={<Text></Text>}
        style={styles.flatListStyle}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

export default Notes;

const styles = StyleSheet.create({
  cardViewAligner: {
    // height: 230,
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  rowViewAligner: {
    margin: 0,
  },
  note: {
    width: '70%',
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
  iconContainer: {
    width: '30%',
    flexDirection: 'row',
  },
  iconBtnStyle: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    width: 60,
  },
});
