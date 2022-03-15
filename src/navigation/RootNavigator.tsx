import { NavigationContainer } from "@react-navigation/native";
import { createContext, useEffect } from "react";
import { deleteTable, deleteToken, getToken, saveToken, setupDB } from "../utils/databaseUtils";
import { AuthStack } from "./AuthStack";
import { DrawerNav } from "./DrawerNavigator";



// const Root = createStackNavigator();
export type ColorTheme = {
  theme: "dark" | "light";
};

export type UserToken = {
  token: string | null;
  setToken: Function;
};

export const ColorContext = createContext<ColorTheme>({ theme: "dark" });
export const UserTokenContext = createContext<UserToken>({ token: null, setToken: () => {} });

export const RootNavigator: React.FC = ({}) => {

  // const db = SQLite.openDatabase('db.db');
 
  useEffect(() => {
    try{
      setupDB();
      deleteTable();
      console.log('****')
      // deleteToken(1);
      saveToken('1224');
      getToken();
      
      } catch (e){
        console.log('1234567890')
        console.log(e)
      }
  }, []);
  
  return (
    <ColorContext.Provider value={{ theme: "dark" }}>
      <NavigationContainer>
        {/* <DrawerNav /> */}
        <AuthStack />
      </NavigationContainer>
    </ColorContext.Provider>
  );
};
