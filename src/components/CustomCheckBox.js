import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {CheckBox} from '@ui-kitten/components';
import {ACCENT} from '../utils/theme';

const CustomCheckBox = ({item, markComplete}) => {
  return (
    <CheckBox
      checked={item.isCompleted}
      style={{
        // backgroundColor: 'red',
        borderColor: 'red',
      }}
      status="control"
      // indeterminate
      onChange={(nextChecked) => markComplete(item.uuid)}></CheckBox>
  );
};

export default CustomCheckBox;

const styles = StyleSheet.create({});
