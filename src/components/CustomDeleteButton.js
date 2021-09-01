import {Button, Icon} from '@ui-kitten/components';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ACCENT, WHITE} from '../utils/theme';

const CustomDeleteButton = ({deleteTask, item}) => {
  console.log({deleteTask, item});
  return (
    <Button
      onPress={() => deleteTask(item.uuid)}
      style={{
        backgroundColor: ACCENT,
        borderColor: ACCENT,
      }}
      size="tiny"
      accessoryLeft={() => (
        <Icon style={styles.deleteicon} fill={WHITE} name="trash-outline" />
      )}
    />
  );
};

export default CustomDeleteButton;

const styles = StyleSheet.create({
  deleteicon: {
    width: 18,
    height: 18,
  },
});
