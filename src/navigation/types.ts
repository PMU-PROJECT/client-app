import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  // NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { EligibleRewards, GivenRewards } from "../models/Rewards";

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
    id: number;
    title: string;
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

export type DrawerParamList = {
  Tabs: undefined;
  Settings: undefined;
  ScanQR: undefined;
  EligibleRewards: {
    rewards: EligibleRewards[] | GivenRewards[];
    token_id: string;
  };
  GivenRewards: undefined;
  EmployeeRewards: undefined;
};

export type DrawerNavProps<T extends keyof DrawerParamList> = {
  navigation: DrawerNavigationProp<DrawerParamList, T>;
  route: RouteProp<DrawerParamList, T>;
};
