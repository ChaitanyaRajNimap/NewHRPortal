import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { GLOBALSTYLE } from '../../../../Constants/Styles';
import { COLORS } from '../../../../Constants/Theme';
import SmallButton from '../../../../Components/SmallButton';

function VendorList({ data, editVendor, deleteVendor }) {
  const _renderItem = ({ item }) => {
    return (
      <View style={[GLOBALSTYLE.cardView]}>
        <View style={GLOBALSTYLE.rowView}>
          {item.company_name && (
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Company Name</Text>
              <Text style={GLOBALSTYLE.text}>{item.company_name}</Text>
            </View>
          )}
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>CP</Text>
            <Text style={GLOBALSTYLE.text}>{item.credit_period}</Text>
          </View>
        </View>
        <View style={GLOBALSTYLE.rowView}>
          {item.nick_name && (
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Nick Name</Text>
              <Text style={GLOBALSTYLE.text}>{item.nick_name}</Text>
            </View>
          )}

          {item.contact_person && (
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Contact Person</Text>
              <Text style={GLOBALSTYLE.text}>{item.contact_person}</Text>
            </View>
          )}
        </View>
        {item.contact_email && (
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Email Id</Text>
            <Text style={GLOBALSTYLE.text}>{item.contact_email}</Text>
          </View>
        )}
        <View style={GLOBALSTYLE.rowView}>
          {item.contact_number && (
            <View style={GLOBALSTYLE.columnView}>
              <Text style={GLOBALSTYLE.label}>Mobile</Text>
              <Text style={GLOBALSTYLE.text}>{item.contact_number}</Text>
            </View>
          )}
          <View style={GLOBALSTYLE.columnView}>
            <Text style={GLOBALSTYLE.label}>Resource Count</Text>
            <Text style={GLOBALSTYLE.text}>{item.resourceCount}</Text>
          </View>
        </View>
        <View style={styles.upperViewStyle}>
          <View style={[styles.innerViewStyle]}>
            <SmallButton
              color={COLORS.lightBlue}
              title={'Edit'}
              onPressFunction={() => {
                editVendor(item)
              }}
            />
          </View>
          <View style={[styles.innerViewStyle]}>
            <SmallButton color={COLORS.red}
              title={'Delete'}
              onPressFunction={() => {
                deleteVendor(item.id)
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
