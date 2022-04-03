import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useContext } from "react";
import { ColorSchema } from "../constants/Colors";
import { QRCodeScreen } from "../screens/main/QRCodeScreen";
import { PlacesStack } from "./PlacesStack";
import { ColorContext } from "./RootNavigator";
import { MainTabParamList } from "./types";

interface TabsProps {}

const Tabs = createBottomTabNavigator<MainTabParamList>();

export const AppTabs: React.FC<TabsProps> = ({}) => {
  const { theme } = useContext(ColorContext);
  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor:
          theme === "dark"
            ? ColorSchema.dark.formButton
            : ColorSchema.light.formButton,
        tabBarInactiveTintColor:
          theme === "dark"
            ? ColorSchema.default.disabled
            : ColorSchema.default.disabled,
        tabBarStyle: {
          // border: theme === "dark" ? "none" : null,
          backgroundColor:
            theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background,
        },
      })}
    >
      <Tabs.Screen
        name="Main"
        component={PlacesStack}
        options={() => ({
          title: "Начало",
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
          headerTitle: "QR Код",
          title: "QR Код",
          headerTintColor:
            theme === "dark" ? ColorSchema.dark.text : ColorSchema.light.text,
          headerStyle: {
            backgroundColor:
              theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
            borderBottomWidth: theme === "dark" ? 1 : 1,
            borderBottomColor: theme === "dark" ? "grey" : "grey",
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" size={24} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={
                theme === "dark"
                  ? ColorSchema.dark.text
                  : ColorSchema.light.text
              }
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
