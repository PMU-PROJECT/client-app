import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DrawerNav } from "./DrawerNavigator";
import { AppTabs } from "./MainTabs";

const Root = createStackNavigator();

export const RootNavigator: React.FC = ({}) => {
  return (
    <NavigationContainer>
      <DrawerNav />
    </NavigationContainer>
  );
};
