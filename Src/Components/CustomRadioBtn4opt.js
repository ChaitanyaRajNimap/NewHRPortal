import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {GLOBALSTYLE} from '../Constants/Styles';
import {COLORS} from '../Constants/Theme';

const CustomRadioBtn4opt = props => {
  const onPressFun = value => {
    props.onPressFunction(value);
  };

  const items = [
    {label: '0-1 year', value: 0},
    {label: '1-2 year', value: 1},
    {label: '2-3 year', value: 2},
    {label: '3+ year', value: 3},
  ];
  return (
    <View style={[GLOBALSTYLE.TextInputStyle, styles.container]}>
      {/* <Text style={styles.title}>{props.title}</Text> */}
      <RadioForm style={styles.radioForm}>
        {items.map((obj, index) => (
          <RadioButton style={styles.radioButton} key={index}>
            <RadioButtonInput
              obj={obj}
              index={index}
              isSelected={index === props.value}
              onPress={value => {
                onPressFun(value);
              }}
              borderWidth={2}
              buttonInnerColor={COLORS.lightBlue}
              buttonOuterColor={
                index === props.value ? COLORS.lightBlue : COLORS.grey
              }
              buttonSize={12}
              buttonWrapStyle={{marginRight: 16}}
            />
            <RadioButtonLabel
              obj={obj}
              index={index}
              labelStyle={styles.labelStyle}
              onPress={() => {}}
            />
          </RadioButton>
        ))}
      </RadioForm>
    </View>
  );
};

export default CustomRadioBtn4opt;

const styles = StyleSheet.create({
  container: {
    width: 290,
    marginBottom: 5,
  },
  //   title: {
  //     marginTop: 10,
  //     marginHorizontal: 10,
  //   },
  radioForm: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  radioButton: {margin: 10, marginLeft: 35},
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
