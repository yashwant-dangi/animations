import React, {useCallback} from 'react';
import {StyleSheet, Text, View, Dimensions} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedProps,
  useDerivedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
} from 'react-native-reanimated';

import Svg, {Circle} from 'react-native-svg';
const {width, height} = Dimensions.get('window');

const BACKGROUND_COLOR = '#FAFBFF';

const TASKS = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];

export function SwipeToDelete() {
  const [tasks, settasks] = React.useState(TASKS);
  const translationX = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler({
    onActive: event => {
      translationX.value = event.translationX;
    },
    onEnd: ({translationX}) => {},
  });

  const iStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translationX.value}],
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{'Tasks'}</Text>
      {tasks.map(task => (
        <View style={styles.taskContainer} key={task}>
          <PanGestureHandler onGestureEvent={panGesture}>
            <Animated.View style={[styles.task, iStyle]}>
              <Text style={styles.taskTitle}>{task}</Text>
            </Animated.View>
          </PanGestureHandler>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 30,
    fontSize: 70,
  },
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  task: {
    width: '90%',
    height: 70,
    marginVertical: 10,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
  taskTitle: {
    fontSize: 16,
  },
  taskContainer: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'red',
  },
});

export default SwipeToDelete;
