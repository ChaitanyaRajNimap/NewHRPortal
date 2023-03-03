import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import {getTechnology as getTechnologyAction} from '../../../Redux/Actions/DashboardAction';
import {useSelector, useDispatch} from 'react-redux';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {COLORS} from '../../../Constants/Theme';
import DropDownPicker from 'react-native-dropdown-picker';
import CustomRadioBtn4opt from '../../../Components/CustomRadioBtn4opt';
import validation from '../../../Util/helper';
import SmallButton from '../../../Components/SmallButton';
import Entypo from 'react-native-vector-icons/Entypo';

const FilterModal = ({onCancel, applyFilter}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.DashboardReducer);
  // console.log('REDUCER DATA FROM FILETR MODALLLLLL', reducerData);

  const [technology, setTechnology] = useState([]);
  const [location, setLocation] = useState(null);
  const [techOpen, setTechOpen] = useState(false);
  const [techValue, setTechValue] = useState(null);
  const [techItems, setTechItems] = useState([]);
  const [radioValue, setRadioValue] = useState(null);

  const [inputs, setInputs] = useState({
    location: null,
    technology: null,
    experience: null,
  });
  const [error, setError] = useState({
    locationError: null,
    technologyError: null,
    experienceError: null,
  });

  useEffect(() => {
    dispatch(getTechnologyAction());
  }, []);

  useEffect(() => {
    if (reducerData.getTechnology !== null) {
      setTechnology(reducerData.getTechnology.technologies);
    }
  }, [reducerData.getTechnology]);

  useEffect(() => {
    if (reducerData.getTechnology !== null) {
      if (reducerData.getTechnology.technologies) {
        let newArray = [];
        for (let i of reducerData.getTechnology.technologies) {
          let item;
          if (i.technology) {
            item = {id: i.id, label: i.technology, value: i.technology};
          }
          newArray.push(item);
        }
        // console.log('NEWARR :>>', newArray);
        setTechItems(newArray);
      }
    }
  }, [reducerData.getTechnology]);

  //For hadling reset
  const handleReset = () => {
    setLocation(null);
    setTechValue(null);
    setRadioValue(null);
    setInputs(prevIp => {
      return {
        ...prevIp,
        location: null,
        technology: null,
        experience: null,
      };
    });
  };

  //For handling apply
  const handleApply = () => {
    let locErr = validation.validateField(inputs.location);
    let techErr = validation.validateField(inputs.technology);
    let expErr = validation.validateField(inputs.experience);

    if (!locErr && !techErr && !expErr) {
      console.log(
        'INPUTS :_ ',
        inputs.location,
        ', ',
        inputs.technology,
        ', ',
        inputs.experience,
      );
      applyFilter(inputs);
      onCancel();
      setInputs(prevIp => {
        return {
          ...prevIp,
          location: null,
          technology: null,
          experience: null,
        };
      });
      setError(prevErr => {
        return {
          ...prevErr,
          locationError: null,
          technologyError: null,
          experienceError: null,
        };
      });
    } else {
      setError(prevErr => {
        return {
          ...prevErr,
          locationError: locErr,
          technologyError: techErr,
          experienceError: expErr,
        };
      });
    }
  };

  return (
    <View style={styles.rootContainer}>
      <View style={styles.modalView}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerText}>Filter By</Text>
          <TouchableOpacity
            onPress={() => {
              onCancel();
            }}>
            <Entypo name="cross" size={25} color={COLORS.black} />
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView enabled>
          {/*For Location */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Location<Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <TextInput
              placeholder=""
              style={[GLOBALSTYLE.TextInputStyle, styles.inputAligner]}
              value={location}
              onChangeText={value => {
                setLocation(value);
                let err = validation.validateField(value);
                setInputs(prevIp => {
                  return {
                    ...prevIp,
                    location: value,
                  };
                });
                setError(prevErr => {
                  return {
                    ...prevErr,
                    locationError: err,
                  };
                });
              }}
              keyboardType="default"
            />
            <Text style={styles.errorText}>{error.locationError}</Text>
          </View>
          {/*For Technology */}
          <View style={[styles.inputContainer, {marginBottom: 10}]}>
            <Text style={styles.label}>
              Technology<Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <DropDownPicker
              style={styles.dropdownViewStyle}
              placeholder=""
              placeholderStyle={{color: COLORS.black}}
              listMode="FLATLIST"
              dropDownContainerStyle={styles.dropDownContainerStyle}
              renderListItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      setTechValue(item.value);
                      setTechOpen(false);
                      let err = validation.validateField(item.value);
                      setInputs(prevIp => {
                        return {
                          ...prevIp,
                          technology: item.value,
                        };
                      });
                      setError(prevErr => {
                        return {
                          ...prevErr,
                          technologyError: err,
                        };
                      });
                    }}
                    style={styles.cellStyle}>
                    <Text style={styles.cellTextStyle}>{item.label}</Text>
                  </TouchableOpacity>
                );
              }}
              open={techOpen}
              value={techValue}
              items={techItems}
              setOpen={setTechOpen}
              setItems={setTechItems}
            />
            <Text style={styles.errorText}>{error.technologyError}</Text>
          </View>
          {/*For Experience */}
          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Experience<Text style={{color: COLORS.red}}>*</Text>
            </Text>
            <CustomRadioBtn4opt
              value={radioValue}
              title=""
              onPressFunction={value => {
                let expLevel;
                if (value === 0) {
                  expLevel = '0-1';
                } else if (value === 1) {
                  expLevel = '1-2';
                } else if (value === 2) {
                  expLevel = '2-3';
                } else {
                  expLevel = '3-4';
                }
                setRadioValue(value);
                let err = validation.validateField(expLevel);
                setInputs(prevIp => {
                  return {
                    ...prevIp,
                    experience: expLevel,
                  };
                });
                setError(prevErr => {
                  return {
                    ...prevErr,
                    experienceError: err,
                  };
                });
              }}
            />
            <Text style={styles.errorText}>{error.experienceError}</Text>
          </View>
          <View style={styles.upperViewStyle}>
            <SmallButton
              color={COLORS.grey}
              title={'Reset'}
              onPressFunction={handleReset}
              customStyles={{marginHorizontal: 5}}
            />
            <SmallButton
              color={COLORS.lightBlue}
              title={'Apply'}
              onPressFunction={handleApply}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalView: {
    // margin: 20,
    // height: 250,
    width: 350,
    backgroundColor: COLORS.white,
    borderRadius: 20,
    // paddingVertical: 35,
    // paddingHorizontal: 30,
    padding: 30,
    // alignItems: 'center',
    // justifyContent: 'center',
    shadowColor: COLORS.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerText: {
    marginBottom: 20,
    color: COLORS.black,
    fontSize: 18,
  },
  inputContainer: {marginBottom: 0},
  label: {
    color: COLORS.black,
    fontSize: 15,
  },
  inputAligner: {
    width: 290,
    // backgroundColor: '#f00',
    borderRadius: 1,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.grey,
    paddingHorizontal: 15,
  },
  dropdownViewStyle: {
    height: 48,
    paddingHorizontal: 8,
    borderRadius: 8,
    borderColor: COLORS.grey,
    marginTop: 5,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
    zIndex: 1,
  },
  dropDownContainerStyle: {
    height: 100,
    marginVertical: 10,
    paddingVertical: 4,
    borderColor: COLORS.grey,
  },
  dropDownPlaceholderStyle: {
    color: COLORS.grey,
    fontSize: 14,
  },
  cellStyle: {
    padding: 8,
    marginVertical: 4,
  },
  cellTextStyle: {
    color: COLORS.grey,
    fontSize: 14,
    textTransform: 'capitalize',
    fontWeight: '600',
  },
  upperViewStyle: {flexDirection: 'row'},
  errorText: {
    color: COLORS.red,
    fontSize: 12,
    // marginVertical: 2,
    marginHorizontal: 5,
    // paddingHorizontal: 2,
  },
});
