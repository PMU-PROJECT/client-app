import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { AchivementsScreen } from "../screens/drawer/Achievements";
import { ScanQRScreen } from "../screens/drawer/ScanQR";
import { AppTabs } from "./MainTabs";
import { SettingsStack } from "./SettingsStack";
import { DrawwerParamList } from "./types";

const DrawerNavigator = createDrawerNavigator<DrawwerParamList>();

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

      <DrawerNavigator.Screen
        name="Settings"
        options={{
          drawerIcon: ({ color }) => (
            <FontAwesome5 name="cog" size={24} color={color} />
          ),
        }}
        component={SettingsStack}
      />
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
      {0 === 0 ? (
        <DrawerNavigator.Screen
          name="ScanQR"
          options={({ navigation }) => ({
            title: "Scan QR code",
            drawerIcon: ({ color }) => (
              <AntDesign name="scan1" size={24} color={color} />
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
          component={ScanQRScreen}
        />
      ) : null}
    </DrawerNavigator.Navigator>
  );
};
