import {ListItem, Text} from '@ui-kitten/components';
import moment from 'moment';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ACCENT, PRIMARY, WHITE} from '../utils/theme';
import CustomCheckBox from './CustomCheckBox';
import CustomDeleteButton from './CustomDeleteButton';

const CustomListItem = ({item, index, deleteTask, markComplete}) => {
  console.log({item, index, deleteTask, markComplete});
  return (
    <ListItem
      style={{
        backgroundColor: PRIMARY,
      }}
      title={() => (
        <Text
          category="h5"
          style={{
            paddingLeft: 10,
            color: ACCENT,
            textDecorationLine: item.isCompleted ? 'line-through' : 'none',
          }}>
          {item.title}
        </Text>
      )}
      description={() => (
        <Text
          style={{
            paddingLeft: 10,
            color: WHITE,
            fontSize: 12,
          }}
          category="p1"
          appearance="hint">
          {moment(item.date).format('dddd, Do MMM')}
        </Text>
      )}
      accessoryLeft={(props) => (
        <CustomCheckBox {...props} item={item} markComplete={markComplete} />
      )}
      accessoryRight={(props) => (
        <CustomDeleteButton {...props} item={item} deleteTask={deleteTask} />
      )}
    />
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
