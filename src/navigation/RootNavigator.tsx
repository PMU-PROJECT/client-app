import { NavigationContainer } from "@react-navigation/native";
import { createContext, useEffect } from "react";
import { setupDB } from "../utils/databaseUtils";
import { AuthStack } from "./AuthStack";
import { DrawerNav } from "./DrawerNavigator";
import { useSelector } from "react-redux";
import { UserState } from "../store/reducers/UserReducer";

// const Root = createStackNavigator();
export type ColorTheme = {
  theme: "dark" | "light";
};

export const ColorContext = createContext<ColorTheme>({ theme: "dark" });

// export type UserToken = {
//   token: string | null;
//   setToken: React.Dispatch<React.SetStateAction<string | null>>;
// };

// export const UserTokenContext = createContext<UserToken>({
//   token: null,
//   setToken: () => {},
// });

export const RootNavigator: React.FC = ({}) => {
  // const [token, setToken] = useState<string | null>(null);
  const token = useSelector((state: { user: UserState }) => state.user.token);

  useEffect(() => {
    setupDB();
    // deleteTable();
    // console.log("****");
    // console.log(JSON.stringify(token));
    // console.log("****");
    // deleteToken(1);
    // saveToken("1224");

    // const fetchedToken = await getToken();
    // console.log(fetchedToken);
    // setToken(fetchedToken);
    // console.log(JSON.stringify(token));;
  }, []);

  return (
    <ColorContext.Provider value={{ theme: "dark" }}>
      <NavigationContainer>
        {token ? <DrawerNav /> : <AuthStack />}
        {/* <DrawerNav /> */}
        {/* <AuthStack /> */}
      </NavigationContainer>
    </ColorContext.Provider>
  );
};
