import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Button, Scaffold, Text} from '../components';
import {Colors, Size} from '../styles';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import {OnboardScreenNavigation, Screens} from '../types';

type Props = {
  navigation: OnboardScreenNavigation;
};

const Onboard = ({navigation}: Props) => {
  const width = useSharedValue(60);
  const animateWidth = useAnimatedStyle(() => {
    return {
      width: width.value,
    };
  });

  React.useEffect(() => {
    width.value = withRepeat(withTiming(180, {duration: 1000}), -1, true);
  }, [width]);

  return (
    <Scaffold testId="onboard-screen">
      <View style={styles.titleContainer}>
        <Text style={styles.onboard}>ONBOARD</Text>
        <Animated.View style={[styles.blueLine, animateWidth]} />
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Login"
          offsetColor={Colors.seablue}
          onPress={() => navigation.navigate(Screens.Login)}
        />
        <Button
          onPress={() => navigation.navigate(Screens.Register)}
          title="Register"
          offsetColor={Colors.white}
          style={styles.mT}
        />
      </View>
    </Scaffold>
  );
};

export default Onboard;

const styles = StyleSheet.create({
  titleContainer: {
    marginHorizontal: Size.lg,
    marginTop: Size.xl,
  },
  onboard: {
    fontSize: Size.xxl,
    fontWeight: 'bold',
  },
  blueLine: {
    height: 20,
    borderRadius: 100,
    backgroundColor: Colors.seablue,
    position: 'absolute',
    bottom: -3,
    left: -5,
    zIndex: -1,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mT: {
    marginTop: Size.xxl,
  },
});
