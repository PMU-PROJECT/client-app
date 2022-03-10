import { AntDesign, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useContext } from "react";
import { CustomDrawer } from "../components/drawer/CustomDrawer";
import { ColorSchema } from "../constants/Colors";
import { AchivementsScreen } from "../screens/drawer/Achievements";
import { ScanQRScreen } from "../screens/drawer/ScanQR";
import { AppTabs } from "./MainTabs";
import { ColorContext } from "./RootNavigator";
import { SettingsStack } from "./SettingsStack";
import { DrawerParamList } from "./types";

const DrawerNavigator = createDrawerNavigator<DrawerParamList>();

export const DrawerNav: React.FC = ({}) => {
  const { theme } = useContext(ColorContext);

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
            <FontAwesome5 name={"medal"} size={24} color={color} />
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
