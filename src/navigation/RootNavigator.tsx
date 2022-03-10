import { NavigationContainer } from "@react-navigation/native";
import { createContext } from "react";
import { AuthStack } from "./AuthStack";
import { DrawerNav } from "./DrawerNavigator";

// const Root = createStackNavigator();
export type ColorTheme = {
  theme: "dark" | "light";
};

export const ColorContext = createContext<ColorTheme>({ theme: "dark" });

export const RootNavigator: React.FC = ({}) => {
  return (
    <ColorContext.Provider value={{ theme: "light" }}>
      <NavigationContainer>
        <DrawerNav />
        {/* <AuthStack /> */}
      </NavigationContainer>
    </ColorContext.Provider>
  );
};
