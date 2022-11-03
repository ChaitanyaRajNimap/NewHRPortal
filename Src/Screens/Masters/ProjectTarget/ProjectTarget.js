import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from 'react-native';
import SearchBox from '../../../Components/SearchBox';
import {GLOBALSTYLE} from '../../../Constants/Styles';
import {getResources} from '../../../Redux/Actions/ProjectTargetAction';
import {useSelector, useDispatch} from 'react-redux';
import SmallButton from '../../../Components/SmallButton';
import {COLORS} from '../../../Constants/Theme';

const ProjectTarget = ({navigation}) => {
  const dispatch = useDispatch();
  const reducerData = useSelector(state => state.ProjectTargetReducer);

  const [resources, setResources] = useState([]);
  const [filterResource, setFilterResources] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const unSubscribe = navigation.addListener('focus', () => {
      dispatch(getResources());
      console.log('Project Target');
    });
    return unSubscribe;
  }, [navigation]);

  useEffect(() => {
    getAccountFilterData();
  }, [search]);

  useEffect(() => {
    // console.log("-------------------", reducerData.resourceData)
    setResources(reducerData.resourceData);
    setFilterResources(reducerData.resourceData);
  }, [reducerData.resourceData]);

  const setSearchValue = value => {
    setSearch(value);
  };
  const getAccountFilterData = () => {
    const filterValue = resources?.filter(data => {
      if (search.length === 0) {
        return data;
      } else if (
        data.fname.toLowerCase().includes(search.toLowerCase()) ||
        data.lname.toLowerCase().includes(search.toLowerCase()) ||
        data.resident_address.includes(search.toLowerCase())
      ) {
        console.log(data);
        return data;
      }
    });
    setFilterResources(filterValue);
  };
  const editProject = data => {
    navigation.navigate('EditProjectTarget', {newData: data});
  };
  return (
    <SafeAreaView style={GLOBALSTYLE.safeAreaViewStyle}>
      <SearchBox setSearchValue={setSearchValue} />
      <View>
        <FlatList
          data={filterResource}
          renderItem={({item}) => (
            <View style={GLOBALSTYLE.cardView}>
              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Name</Text>
                <TouchableOpacity>
                  <Text style={GLOBALSTYLE.text}>
                    {item.fname === null ? '-' : `${item.fname} ${item.lname}`}
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={GLOBALSTYLE.columnView}>
                <Text style={GLOBALSTYLE.label}>Locality</Text>
                <Text style={GLOBALSTYLE.text}>
                  {item.resident_address === null
                    ? '-'
                    : item?.resident_address}
                </Text>
              </View>
              <View style={GLOBALSTYLE.rowView}>
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Skill</Text>
                  <Text style={GLOBALSTYLE.text}>
                    {item?.primary_skill === null ? '-' : item?.primary_skill}
                  </Text>
                </View>
                <View style={GLOBALSTYLE.columnView}>
                  <Text style={GLOBALSTYLE.label}>Target Date</Text>

                  <Text style={GLOBALSTYLE.text}>
                    {item.date === null
                      ? '-'
                      : new Date(item.date)
                          .toDateString('en-US', {})
                          .split(' ')
                          .slice(1)
                          .join(' ')}
                  </Text>
                </View>
              </View>
              <View style={GLOBALSTYLE.rowView}>
                <SmallButton
                  color={COLORS.blue}
                  title={'Edit'}
                  onPressFunction={() => {
                    editProject(item);
                  }}
                />
                <SmallButton color={COLORS.red} title={'Delete'} />
              </View>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default ProjectTarget;
