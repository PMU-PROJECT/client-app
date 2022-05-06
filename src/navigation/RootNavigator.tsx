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

/**
 * @compenent
 * @description Component used for controlling navigation's logic,
 * containing the Auth navigator and Drawer Navigator, and conditionaly rendering one of them
 * if an user authentiction token is present
 */
export const RootNavigator: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean | null>(false);
  // const [image, setImage] = useState();
  const token = useSelector((state: { user: UserState }) => state.user.token);
  const dispatch = useDispatch();

  /**
   * @async
   * @function
   * @description Function used for checking the sqlite database on the devise,
   * to see if a token is present and get it to used it for requesting new one from server
   */
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
      </NavigationContainer>
    </Provider>
  );
};
