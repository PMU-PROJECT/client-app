import { AntDesign, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { useSelector } from "react-redux";
import { ColorSchema } from "../constants/Colors";
import { QRCodeScreen } from "../screens/main/QRCodeScreen";
import { UserState } from "../store/reducers/UserReducer";
import { PlacesStack } from "./PlacesStack";
import { MainTabParamList } from "./types";

interface TabsProps {}

const Tabs = createBottomTabNavigator<MainTabParamList>();

export const AppTabs: React.FC<TabsProps> = ({}) => {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <Tabs.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor:
          theme && theme === "dark"
            ? ColorSchema.dark.formButton
            : ColorSchema.light.formButton,
        tabBarInactiveTintColor:
          theme && theme === "dark"
            ? ColorSchema.default.disabled
            : ColorSchema.default.disabled,
        tabBarStyle: {
          // border: theme && theme === "dark" ? "none" : null,
          backgroundColor:
            theme && theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background,
        },
      })}
    >
      <Tabs.Screen
        name="Main"
        component={PlacesStack}
        options={() => ({
          title: language && language === "en" ? "Home" : "Начало",
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
          headerTitle: language && language === "en" ? "QR Code" : "QR Код",
          title: language && language === "en" ? "QR Code" : "QR Код",
          headerTintColor:
            theme && theme === "dark"
              ? ColorSchema.dark.text
              : ColorSchema.light.text,
          headerStyle: {
            backgroundColor:
              theme && theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
            borderBottomWidth: theme && theme === "dark" ? 1 : 1,
            borderBottomColor: theme && theme === "dark" ? "grey" : "grey",
          },
          tabBarIcon: ({ color }) => (
            <AntDesign name="qrcode" size={24} color={color} />
          ),
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={
                theme && theme === "dark"
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
