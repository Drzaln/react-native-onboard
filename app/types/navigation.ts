import {ParamListBase, RouteProp} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Screens} from './screens';

export interface RouterParamList extends ParamListBase {
  Onboard: undefined;
  Login: undefined;
  Register: undefined;
  Otp: {
    username: string;
    password: string;
    email: string;
  };
  Home: undefined;
}

export type OnboardScreenNavigation = NativeStackNavigationProp<
  RouterParamList,
  Screens
>;

export type LoginScreenNavigation = NativeStackNavigationProp<
  RouterParamList,
  Screens
>;

export type RegisterScreenNavigation = NativeStackNavigationProp<
  RouterParamList,
  Screens
>;

export type OtpScreenNavigation = NativeStackNavigationProp<
  RouterParamList,
  Screens.Otp
>;

export type OtpRoute = RouteProp<RouterParamList, Screens.Otp>;

export type HomeScreenNavigation = NativeStackNavigationProp<
  RouterParamList,
  Screens
>;
