import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { ColorSchema } from "../constants/Colors";
import { QRCodeScreen } from "../screens/main/QRCodeScreen";
import { PlacesStack } from "./PlacesStack";
import { ColorContext } from "./RootNavigator";
import { MainTabParamList, PlacesParamList } from "./types";

interface TabsProps {}

const Tabs = createBottomTabNavigator<MainTabParamList>();

export const AppTabs: React.FC<TabsProps> = ({}) => {
  const { theme } = useContext(ColorContext);
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor:
          theme === "dark"
            ? ColorSchema.dark.headerButton
            : ColorSchema.light.formButton,
        tabBarInactiveTintColor: ColorSchema.default.disabled,
        tabBarStyle: {
          // backgroundColor:
          //   theme === "dark"
          //     ? ColorSchema.dark.headerButton
          //     : ColorSchema.light.formButton,
        },
      })}
    >
      <Tabs.Screen
        name="Main"
        component={PlacesStack}
        options={({ navigation }) => ({
          header: () => null,
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        })}
      />

      <Tabs.Screen
        name="QRCode"
        component={QRCodeScreen}
        options={({ navigation }) => ({
          headerTitle: "QR Code",
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" size={24} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        })}
      />
    </Tabs.Navigator>
  );
};
