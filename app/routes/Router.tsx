import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouterParamList, Screens} from '../types';
import {Home, Login, Onboard, Otp, Register} from '../screens';
import {AuthContext} from '../context/auth';

const {Navigator, Screen} = createNativeStackNavigator<RouterParamList>();

const Router = () => {
  const {authData} = React.useContext(AuthContext);
  return (
    <Navigator
      screenOptions={{headerShown: false, fullScreenGestureEnabled: true}}>
      {authData.isLogin === 'yes' ? (
        <Screen name={Screens.Home} component={Home} />
      ) : (
        <>
          <Screen name={Screens.Onboard} component={Onboard} />
          <Screen name={Screens.Login} component={Login} />
          <Screen name={Screens.Register} component={Register} />
          <Screen name={Screens.Otp} component={Otp} />
        </>
      )}
    </Navigator>
  );
};

export default Router;
