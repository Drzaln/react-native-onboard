import {StyleSheet, View} from 'react-native';
import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Animated, {SlideInUp, SlideOutUp} from 'react-native-reanimated';
import {BorderRadius, Colors, Size} from '../styles';
import Text from './Text';

type ToastProps = {
  message: string;
};

const Toast = ({message}: ToastProps) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  return (
    <Animated.View
      entering={SlideInUp}
      exiting={SlideOutUp}
      style={[styles.container, {top: statusBarHeight}]}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{message}</Text>
      </View>
    </Animated.View>
  );
};

export default Toast;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    marginTop: Size.lg,
    backgroundColor: 'transparent',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    height: 50,
    backgroundColor: Colors.red,
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    borderRadius: BorderRadius.xxl,
  },
  text: {color: 'white'},
});
