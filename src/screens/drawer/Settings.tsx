import { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FilterSwitch } from "../../components/settings/FilterSwitch";
import { useDispatch, useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
import { ColorSchema } from "../../constants/Colors";
import { UserActions } from "../../store/actions/UserActions";

export const SettingScreen = () => {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(
    theme === "dark" ? true : false
  );
  const [isEnglish, setIsEnglish] = useState<boolean>(
    language === "en" ? true : false
  );

  const dispatch = useDispatch();

  const changeLanguage = useCallback(() => {
    dispatch({
      type: UserActions.LANGUAGE_CHANGE,
      payload: {
        language: language === "en" ? "bg" : "en",
      },
    });
  }, [dispatch, isEnglish]);

  const changeTheme = useCallback(() => {
    dispatch({
      type: UserActions.THEME_CHANGE,
      payload: {
        theme: theme === "dark" ? "light" : "dark",
      },
    });
  }, [dispatch, isDarkTheme]);

  useEffect(() => {
    changeTheme();
  }, [isDarkTheme]);

  useEffect(() => {
    changeLanguage();
  }, [isEnglish]);

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={[
          styles.title,
          theme === "dark" ? styles.textDark : styles.textLight,
        ]}
      >
        {language === "en" ? "Set Settings" : "Настройки"}
      </Text>
      <FilterSwitch
        label={language === "en" ? "Light Theme" : "Светла тема"}
        state={isDarkTheme}
        onChange={(newValue) => setIsDarkTheme(newValue)}
      />
      <FilterSwitch
        label={language === "en" ? "English" : "Български"}
        state={isEnglish}
        onChange={(newValue) => setIsEnglish(newValue)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  containerDark: {
    backgroundColor: ColorSchema.dark.background,
  },
  containerLight: {
    backgroundColor: ColorSchema.light.background,
  },
  title: {
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  textDark: {
    color: ColorSchema.dark.text,
  },
  textLight: {
    color: ColorSchema.light.text,
  },
});
