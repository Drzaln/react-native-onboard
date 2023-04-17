import {StatusBar, StyleSheet, TextProps, PressableProps} from 'react-native';
import React from 'react';
import {SafeAreaView, SafeAreaViewProps} from 'react-native-safe-area-context';
import {Colors, Size} from '../styles';
import Pressable from './Pressable';
import {useNavigationState} from '@react-navigation/native';
import Text from './Text';
import Icon from 'react-native-vector-icons/Ionicons';

interface ScaffoldProps {
  children: React.ReactNode;
  title?: string;
  onBackPress?: () => void;
  titleTestID?: TextProps['testID'];
  backButtonTestID?: PressableProps['testID'];
  testId: SafeAreaViewProps['testID'];
  style?: SafeAreaViewProps['style'];
}

const Scaffold = ({
  title,
  children,
  onBackPress,
  titleTestID,
  backButtonTestID,
  testId,
  style,
}: ScaffoldProps) => {
  const prevScreen = useNavigationState(state =>
    state.routes[state.index - 1]?.name
      ? state.routes[state.index - 1].name
      : 'None',
  );

  return (
    <SafeAreaView
      edges={['left', 'right', 'top']}
      style={[styles.container, style]}
      testID={testId}>
      <StatusBar barStyle={'dark-content'} />
      {onBackPress ? (
        <Pressable
          testID={backButtonTestID}
          style={styles.backButton}
          onPress={onBackPress}>
          <Icon name="ios-caret-back-outline" size={24} color={Colors.gray} />
          <Text style={styles.prevScreen}>{prevScreen}</Text>
        </Pressable>
      ) : null}
      {title ? (
        <Text testID={titleTestID} style={styles.title}>
          {title}
        </Text>
      ) : null}
      {children}
    </SafeAreaView>
  );
};

export default Scaffold;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.paperwhite},
  title: {
    fontSize: Size.xxl,
    fontWeight: '600',
    marginHorizontal: Size.lg,
    marginBottom: Size.md,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: Size.lg,
    marginVertical: Size.lg,
  },
  prevScreen: {
    color: Colors.gray,
    marginStart: Size.lg,
  },
});
