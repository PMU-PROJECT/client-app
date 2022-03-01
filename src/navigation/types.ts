import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

export type AuthParamList = {
  Login: undefined;
  Register: undefined;
};

export type AuthNavProps<T extends keyof AuthParamList> = {
  navigation: StackNavigationProp<AuthParamList, T>;
  route: RouteProp<AuthParamList, T>;
};

export type PlacesParamList = {
  Home: undefined;
  PlaceDetails: {
    id: string;
  };
};

export type PlacesNavProps<T extends keyof PlacesParamList> = {
  navigation: StackNavigationProp<PlacesParamList, T>;
  route: RouteProp<PlacesParamList, T>;
};

export type MainTabParamList = {
  Main: undefined;
  QRCode: undefined;
};

export type RootTabScreenProps<Screen extends keyof MainTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<MainTabParamList, Screen>,
    NativeStackScreenProps<PlacesParamList>
  >;