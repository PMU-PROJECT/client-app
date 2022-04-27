import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../screens/auth/LoginScreen";
import { RegisterScreen } from "../screens/auth/RegisterScreen";
import { AuthParamList } from "./types";

const AuthNavigator = createStackNavigator<AuthParamList>();

interface AuthStackProps {}

/**
 * @compenent
 * @description Stack Navigator for the Login and Register screens
 */
export const AuthStack: React.FC<AuthStackProps> = () => {
  return (
    <AuthNavigator.Navigator
      initialRouteName="Login"
      screenOptions={{
        header: () => null,
      }}
    >
      <AuthNavigator.Screen
        name="Register"
        component={RegisterScreen}
      ></AuthNavigator.Screen>
      <AuthNavigator.Screen
        name="Login"
        component={LoginScreen}
      ></AuthNavigator.Screen>
    </AuthNavigator.Navigator>
  );
};
