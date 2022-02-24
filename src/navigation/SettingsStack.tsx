import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { SettingScreen } from "../screens/drawer/Settings";

const StackNavigator = createStackNavigator();

export const SettingsStack: React.FC = () => (
  <StackNavigator.Navigator
    screenOptions={({ navigation }) => ({
      headerTitle: "Settings",
      drawerIcon: (props: any) => (
        <FontAwesome name="cog" size={24} color={props.color} />
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
  >
    <StackNavigator.Screen
      name="Main"
      component={SettingScreen}
    ></StackNavigator.Screen>
  </StackNavigator.Navigator>
);
