import { FontAwesome, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { Text, View } from "react-native";
import { AchivementsScreen } from "../screens/drawer/Achievements";
import { SettingScreen } from "../screens/drawer/Settings";
import { AppTabs } from "./MainTabs";
import { SettingsStack } from "./SettingsStack";

const DrawerNavigator = createDrawerNavigator();

export const DrawerNav: React.FC = ({}) => {
  return (
    <DrawerNavigator.Navigator
      screenOptions={{
        header: () => null,
        // drawerPosition: "right",
        drawerActiveTintColor: "tomato",
      }}
    >
      <DrawerNavigator.Screen
        name="Tabs"
        options={{
          title: "Home",
        }}
        component={AppTabs}
      ></DrawerNavigator.Screen>

      <DrawerNavigator.Screen name="Settings" component={SettingsStack} />
      <DrawerNavigator.Screen
        name="Achievements"
        options={({ navigation }) => ({
          title: "Achievements",
          drawerIcon: ({ color }) => (
            <Ionicons name={"medal"} size={23} color={color} />
          ),
          headerRight: () => (
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
        component={AchivementsScreen}
      />
    </DrawerNavigator.Navigator>
  );
};
