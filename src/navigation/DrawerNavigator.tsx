import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { CustomDrawer } from "../components/drawer/CustomDrawer";
import { ColorSchema } from "../constants/Colors";
import { EmployeeRewardsScreen } from "../screens/drawer/EmployeeRewards";
import { RewardsScreen } from "../screens/drawer/Rewards";
import { ScanQRScreen } from "../screens/drawer/ScanQR";
import { SettingScreen } from "../screens/drawer/Settings";
import { UserState } from "../store/reducers/UserReducer";
import { AppTabs } from "./MainTabs";
import { ColorContext } from "./RootNavigator";
import { DrawerParamList } from "./types";

const DrawerNavigator = createDrawerNavigator<DrawerParamList>();

export const DrawerNav: React.FC = ({}) => {
  const { theme } = useContext(ColorContext);

  const user = useSelector((state: { user: UserState }) => state.user.user);

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // header: () => null,
        // drawerPosition: "right",
        headerShown: false,
        drawerActiveBackgroundColor:
          theme === "dark"
            ? ColorSchema.default.formButtonAlpha
            : ColorSchema.light.formButton, //new_green
        drawerActiveTintColor:
          theme === "dark" ? ColorSchema.dark.text : ColorSchema.light.text,
        drawerInactiveBackgroundColor:
          theme === "dark"
            ? ColorSchema.default.disabledButton
            : ColorSchema.light.background,
        drawerInactiveTintColor:
          theme === "dark"
            ? ColorSchema.default.disabled
            : ColorSchema.light.text,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor:
            theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background, // "rgb(141, 141, 168)",
        },
      }}
    >
      <DrawerNavigator.Screen
        name="Tabs"
        options={{
          title: "Home",
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="home" size={24} color={color} />
          ),
        }}
        component={AppTabs}
      ></DrawerNavigator.Screen>

      <DrawerNavigator.Screen
        name="Settings"
        options={({ navigation }) => ({
          headerShown: true,
          headerTitle: "Settings",
          drawerIcon: ({ color }) => (
            <FontAwesome name="cog" size={24} color={color} />
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
        component={SettingScreen}
      />
      <DrawerNavigator.Screen
        name="Rewards"
        options={({ navigation }) => ({
          title: "Rewards",
          headerShown: true,
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="gift" size={24} color={color} />
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
        component={RewardsScreen}
      />
      {user?.employeeInfo !== null ? (
        <>
          <DrawerNavigator.Screen
            name="ScanQR"
            options={({ navigation }) => ({
              headerShown: true,
              title: "Scan QR code",
              headerTintColor:
                theme === "dark"
                  ? ColorSchema.dark.text
                  : ColorSchema.light.text,
              headerStyle: {
                backgroundColor:
                  theme === "dark"
                    ? ColorSchema.dark.background
                    : ColorSchema.light.background,
                borderBottomWidth: theme === "dark" ? 1 : 1,
                borderBottomColor: theme === "dark" ? "grey" : "grey",
              },
              drawerIcon: ({ color }) => (
                <AntDesign name="scan1" size={24} color={color} />
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
            component={ScanQRScreen}
          />
          <DrawerNavigator.Screen
            name="EmployeeRewards"
            options={({ navigation }) => ({
              headerShown: true,
              title: "Give Rewards",
              headerTintColor:
                theme === "dark"
                  ? ColorSchema.dark.text
                  : ColorSchema.light.text,
              headerStyle: {
                backgroundColor:
                  theme === "dark"
                    ? ColorSchema.dark.background
                    : ColorSchema.light.background,
                borderBottomWidth: theme === "dark" ? 1 : 1,
                borderBottomColor: theme === "dark" ? "grey" : "grey",
              },
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="user-check" size={24} color={color} />
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
            component={EmployeeRewardsScreen}
          />
        </>
      ) : null}
    </DrawerNavigator.Navigator>
  );
};
