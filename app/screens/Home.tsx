import {StyleSheet} from 'react-native';
import React from 'react';
import {AuthContext} from '../context/auth';
import {Header, Scaffold, Text} from '../components';
import {Colors, Size} from '../styles';

const Home = () => {
  const {authData} = React.useContext(AuthContext);
  return (
    <Scaffold testId="home-screen">
      <Header />
      <Text style={styles.name}>
        Hi, <Text style={styles.blue}>{authData.username}</Text>
      </Text>
      <Text style={styles.greeting}>Welcome onboard!</Text>
    </Scaffold>
  );
};

export default Home;

const styles = StyleSheet.create({
  blue: {
    color: Colors.gray,
  },
  name: {
    fontSize: Size.xxl,
    fontWeight: 'bold',
    marginHorizontal: Size.lg,
  },
  greeting: {
    fontSize: Size.lg,
    marginHorizontal: Size.lg,
  },
});
