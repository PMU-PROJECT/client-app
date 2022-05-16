import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { UserActions } from "../store/actions/UserActions";
import { UserState } from "../store/reducers/UserReducer";
import {
  getLanguageSetting,
  getThemeSetting,
  getToken,
  setupDB,
} from "../utils/databaseUtils";
import { getSelfInfo, refreshAuthToken } from "../utils/makeRequestToServer";
import { AuthStack } from "./AuthStack";
import { DrawerNav } from "./DrawerNavigator";
import { Loading } from "../components/general/Loading";
import { store } from "../store/RootReducer";

/**
 * @compenent
 * @description Component used for controlling navigation's logic,
 * containing the Auth navigator and Drawer Navigator, and conditionaly rendering one of them
 * if an user authentiction token is present
 */
export const RootNavigator: React.FC = ({}) => {
  const [loading, setLoading] = useState<boolean>(false);
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

  /**
   * @async
   * @function
   * @description Function used for checking the sqlite database on the devise,
   * to see if any settings are present and get and set them
   */
  const getSettings = async () => {
    const dbLang = await getLanguageSetting();
    const dbTheme = await getThemeSetting();

    if (dbLang !== null && dbLang !== undefined) {
      dispatch({
        type: UserActions.LANGUAGE_CHANGE,
        payload: {
          language: dbLang,
        },
      });
    }

    if (dbTheme !== null && dbTheme !== undefined) {
      dispatch({
        type: UserActions.THEME_CHANGE,
        payload: {
          theme: dbTheme,
        },
      });
    }
  };

  async function prepare() {
    try {
      setLoading(true);
      // Keep the splash screen visible while we fetch resources
      await SplashScreen.preventAutoHideAsync();
      // Pre-load fonts, make any API calls you need to do here
      await getNewToken();
      await getSettings();
    } catch (error: any) {
      console.warn(error);
      Alert.alert(`${error.name}`, `${error.message}`, [{ text: "Okay" }]);
    } finally {
      // Tell the application to render
      setLoading(false);
      await SplashScreen.hideAsync();
    }
  }

  useEffect(() => {
    setupDB();
    prepare();
  }, []);

  if (loading) {
    return null; //<Loading />;
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
