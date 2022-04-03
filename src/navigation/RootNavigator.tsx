import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { UserActions } from "../store/actions/UserActions";
import { UserState } from "../store/reducers/UserReducer";
import { getToken, setupDB } from "../utils/databaseUtils";
import { getSelfInfo, refreshAuthToken } from "../utils/makeRequestToServer";
import { AuthStack } from "./AuthStack";
import { DrawerNav } from "./DrawerNavigator";
import { StatusBar } from "expo-status-bar";
import { store } from "../store/RootReducer";

// const Root = createStackNavigator();
export type ColorTheme = {
  theme: "dark" | "light";
};

// export const ColorContext = createContext<ColorTheme>({ theme: "dark" });

// export type UserToken = {
//   token: string | null;
//   setToken: React.Dispatch<React.SetStateAction<string | null>>;
// };

// export const UserTokenContext = createContext<UserToken>({
//   token: null,
//   setToken: () => {},
// });

export const RootNavigator: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean | null>(false);
  // const [image, setImage] = useState();
  const token = useSelector((state: { user: UserState }) => state.user.token);
  const dispatch = useDispatch();

  const getNewToken = async () => {
    const dbToken = await getToken();
    // console.log(dbToken);
    if (dbToken !== null) {
      const refreshedToken = await refreshAuthToken(dbToken);
      if (refreshedToken !== null) {
        const userInfo = await getSelfInfo(refreshedToken);
        // console.log(userInfo);
        if (userInfo !== null) {
          dispatch({
            type: UserActions.LOGIN,
            payload: {
              token: refreshedToken,
              userData: {
                ...userInfo,
              },
            },
          });

          // setValidToken(refreshedToken);
        }
      }
    }
  };

  useEffect(() => {
    setupDB();
    // deleteTable();
    setLoading(true);
    getNewToken();
    // console.log("****");
    // console.log(JSON.stringify(token));
    // console.log("****");
    // deleteToken(1);
    // saveToken("1224");
    // values@first_name.com
    () => setLoading(null);
  }, []);

  if (loading) {
    return (
      <AppLoading
        startAsync={getNewToken}
        onFinish={() => {
          setLoading(false);
        }}
        onError={(error) =>
          Alert.alert(`${error.name}`, `${error.message}`, [{ text: "Okay" }])
        }
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar hidden={true} />
        {token ? <DrawerNav /> : <AuthStack />}
        {/* <DrawerNav /> */}
        {/* <AuthStack /> */}
      </NavigationContainer>
    </Provider>
    // <ColorContext.Provider value={{ theme: "light" }}>
    // </ColorContext.Provider>
  );
};
