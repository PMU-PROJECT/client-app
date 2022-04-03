import {
  AntDesign,
  FontAwesome,
  FontAwesome5,
  Ionicons,
} from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSelector } from "react-redux";
import { CustomDrawer } from "../components/drawer/CustomDrawer";
import { ColorSchema } from "../constants/Colors";
import { EmployeeRewardsScreen } from "../screens/drawer/EmployeeRewards";
import { RewardsScreen } from "../screens/drawer/Rewards";
import { ScanQRScreen } from "../screens/drawer/ScanQR";
import { SettingScreen } from "../screens/drawer/Settings";
import { UserState } from "../store/reducers/UserReducer";
import { AppTabs } from "./MainTabs";
import { DrawerParamList } from "./types";

const DrawerNavigator = createDrawerNavigator<DrawerParamList>();

export const DrawerNav: React.FC = ({}) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );
  const user = useSelector((state: { user: UserState }) => state.user.user);

  return (
    <DrawerNavigator.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        // header: () => null,
        // drawerPosition: "right",
        headerShown: false,
        drawerActiveBackgroundColor:
          theme && theme === "dark"
            ? ColorSchema.default.formButtonAlpha
            : ColorSchema.light.formButton, //new_green
        drawerActiveTintColor:
          theme && theme === "dark"
            ? ColorSchema.dark.text
            : ColorSchema.light.text,
        drawerInactiveBackgroundColor:
          theme && theme === "dark"
            ? ColorSchema.default.disabledButton
            : ColorSchema.light.background,
        drawerInactiveTintColor:
          theme && theme === "dark"
            ? ColorSchema.default.disabled
            : ColorSchema.light.text,
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
        drawerStyle: {
          backgroundColor:
            theme && theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background, // "rgb(141, 141, 168)",
        },
      }}
    >
      <DrawerNavigator.Screen
        name="Tabs"
        options={{
          title: language === "en" ? "Home" : "Начало",
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
          title: language === "en" ? "Settings" : "Настройки",
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
          title: language === "en" ? "Rewards" : "Награди",
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
              title: language === "en" ? "Scan QR Code" : "Сканирай QR код",
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
              drawerIcon: ({ color }) => (
                <AntDesign name="scan1" size={24} color={color} />
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
            component={ScanQRScreen}
          />
          <DrawerNavigator.Screen
            name="EmployeeRewards"
            options={({ navigation }) => ({
              headerShown: true,
              title: language === "en" ? "Give Rewards" : "Дай Награди",
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
              drawerIcon: ({ color }) => (
                <FontAwesome5 name="user-check" size={24} color={color} />
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
            component={EmployeeRewardsScreen}
          />
        </>
      ) : null}
    </DrawerNavigator.Navigator>
  );
};
