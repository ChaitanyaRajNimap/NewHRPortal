import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import RadioForm, {
  RadioButton,
  RadioButtonInput,
  RadioButtonLabel,
} from 'react-native-simple-radio-button';
import {GLOBALSTYLE} from '../Constants/Styles';
import {COLORS} from '../Constants/Theme';

const CustomRadioButtons = props => {
  const onPressFun = value => {
    props.onPressFunction(value);
    console.log('Radio Value : ', value);
  };

  const items = [
    {label: 'No', value: 0},
    {label: 'Yes', value: 1},
  ];

  return (
    <View style={[GLOBALSTYLE.TextInputStyle, styles.container]}>
      <Text style={styles.title}>{props.title}</Text>
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

export default CustomRadioButtons;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
  },
  title: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  radioForm: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButton: {marginTop: 10, marginBottom: 10},
  labelStyle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});
