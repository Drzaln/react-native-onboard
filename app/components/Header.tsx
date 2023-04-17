import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Colors, Size} from '../styles';
import {AuthContext} from '../context/auth';
import Pressable from './Pressable';
import Icon from 'react-native-vector-icons/AntDesign';

const Header = () => {
  const {authData, setAuthData} = React.useContext(AuthContext);
  return (
    <View style={styles.header}>
      <Pressable onPress={() => setAuthData({...authData, isLogin: 'no'})}>
        <Icon name="logout" size={24} color={Colors.black} />
      </Pressable>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginHorizontal: Size.lg,
  },
});
