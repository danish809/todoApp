import React, {useRef} from 'react';
import {Dimensions, Image, ScrollView, StyleSheet, View} from 'react-native';
import {
  Layout,
  Button,
  Text,
  List,
  ListItem,
  Card,
  Icon,
  Input,
} from '@ui-kitten/components';
import * as Progress from 'react-native-progress';
import {ACCENT, LIGHT_DARK, PRIMARY, SECONDARY, WHITE} from '../utils/theme';
import CustomListItem from '../components/CustomListItem';
import RBSheet from 'react-native-raw-bottom-sheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EmptyImage from '../assets/empty.png';
import moment from 'moment';
import Snackbar from 'react-native-snackbar';

// AsyncStorage.removeItem('@tasks');

const Home = () => {
  const refRBSheet = useRef();
  const [value, setValue] = React.useState('');
  const [tasks, setTasks] = React.useState([]);
  const [progress, setProgress] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const getTasks = async () => {
    try {
      const localValues = await AsyncStorage.getItem('@tasks');
      const tasks = JSON.parse(localValues);
      if (tasks) {
        setTasks(tasks);
        const length = tasks.length;
        let completed = 0;

        tasks.map((task) => {
          if (task.isCompleted) completed++;
        });

        console.log({
          length,
          completed,
        });
        setProgress(completed / length);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  const deleteTask = async (uuid) => {
    try {
      console.log('deleting....');
      const newTasks = await tasks.filter((task) => task.uuid !== uuid);
      console.log(newTasks);
      await AsyncStorage.setItem('@tasks', JSON.stringify(newTasks));
      getTasks();
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  const markComplete = async (uuid) => {
    try {
      console.log('updating....');
      var foundIndex = tasks.findIndex((task) => task.uuid == uuid);
      console.log(foundIndex);
      const task = tasks[foundIndex];
      console.log(task);
      tasks[foundIndex] = {
        ...task,
        isCompleted: !task.isCompleted,
      };

      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
      getTasks();
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  React.useEffect(() => {
    getTasks();
  }, []);
  const addTask = async () => {
    try {
      if (!value)
        return Snackbar.show({
          text: 'Add Some Task First',
          textColor: 'white',
          backgroundColor: 'red',
        });
      const localValues = await AsyncStorage.getItem('@tasks');
      const previousTasks = JSON.parse(localValues);
      console.log(previousTasks);
      if (!previousTasks) {
        await AsyncStorage.setItem(
          '@tasks',
          JSON.stringify([
            {
              title: value,
              date: Date.now(),
              uuid: Date.now(),
              isCompleted: false,
            },
          ]),
        );
        setValue('');
        await getTasks();
        return refRBSheet.current.close();
      } else {
        await AsyncStorage.setItem(
          '@tasks',
          JSON.stringify([
            ...previousTasks,
            {
              title: value,
              date: Date.now(),
              uuid: Date.now(),
              isCompleted: false,
            },
          ]),
        );

        setValue('');
        await getTasks();

        return refRBSheet.current.close();
      }
    } catch (error) {
      console.error(error);
      Snackbar.show({
        text: 'Something went wrong',
        textColor: 'white',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <>
      <Layout style={styles.container}>
        <View style={styles.top}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'flex-end',
            }}>
            <Text style={styles.text} category="h6">
              Good Morning,{' '}
            </Text>
            <Text style={styles.text} category="h5">
              Ashad
            </Text>
          </View> */}
          <View
            style={{
              width: '100%',
              // flex: 1,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text} category="h4">
                Your Progress
              </Text>
              <Text
                style={[
                  styles.text,
                  {
                    fontWeight: 'bold',
                    color: SECONDARY,
                  },
                ]}
                category="h4">
                {(progress.toFixed(2) * 100).toFixed(2)} %
              </Text>
            </View>
            <Progress.Bar
              progress={progress}
              showsText={true}
              indeterminate={isLoading}
              // unfilledColor={ACCENT}
              color={SECONDARY}
              width={Dimensions.get('screen').width - 20}
              height={12}
            />
          </View>
        </View>
        <View style={styles.layout}>
          {isLoading ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Progress.CircleSnail size={70} color={SECONDARY} />
            </View>
          ) : (
            <>
              {tasks.length ? (
                <List
                  contentContainerStyle={{
                    backgroundColor: PRIMARY,
                  }}
                  style={{
                    backgroundColor: PRIMARY,
                  }}
                  data={tasks}
                  deleteTask={deleteTask}
                  markComplete={markComplete}
                  renderItem={(props) => (
                    <CustomListItem
                      {...props}
                      deleteTask={deleteTask}
                      markComplete={markComplete}
                    />
                  )}
                />
              ) : (
                <>
                  <Image
                    source={EmptyImage}
                    style={{
                      resizeMode: 'contain',
                      width: '100%',
                      height: 500,
                    }}
                  />
                </>
              )}
            </>
          )}
        </View>
        <View style={styles.bottom}>
          <Text category="h6">{moment(Date.now()).format('DD MMM')}</Text>

          <Text category="h5">
            {tasks.length ? `${tasks.length} Tasks Today` : 'No Task Today'}
          </Text>

          <Icon
            style={styles.icon}
            fill={ACCENT}
            name="plus-square"
            onPress={() => refRBSheet.current.open()}
          />
        </View>
      </Layout>

      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={250}
        minClosingHeight={50}
        animationType="slide"
        customStyles={{
          wrapper: {
            backgroundColor: 'transparent',
          },
          draggableIcon: {
            backgroundColor: '#333',
          },
          container: {
            backgroundColor: PRIMARY,
            padding: 10,
          },
        }}>
        <View
          style={{
            height: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <Input
            textStyle={{minHeight: '60%'}}
            value={value}
            autoFocus
            onChangeText={(nextValue) => setValue(nextValue)}
          />
          <Button
            style={{
              width: '100%',
            }}
            onPress={addTask}>
            ADD Your Task
          </Button>
        </View>
      </RBSheet>
    </>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'flex-start',
    // alignItems: 'center',
    backgroundColor: PRIMARY,
  },
  layout: {
    width: '100%',
    flex: 8.5,
    paddingHorizontal: 10,
  },
  top: {
    flexDirection: 'column',
    // flexGrow: 1,
    flex: 1.5,
    width: '100%',
    paddingHorizontal: 10,
  },
  bottom: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    // paddingTop: 5,
    backgroundColor: '#393e46',
    paddingVertical: 10,
  },
  text: {
    paddingTop: 5,
    paddingBottom: 10,
    color: ACCENT,
  },
  icon: {
    width: 32,
    height: 32,
    color: SECONDARY,
  },
});
