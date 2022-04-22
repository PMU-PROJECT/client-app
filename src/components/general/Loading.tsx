import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";

/**
 * @component
 * @description Component used for showing to the users during data loading process
 */
export const Loading = () => {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
        theme && theme === "dark"
          ? styles.containerDark
          : styles.containerLight,
      ]}
    >
      <Text
        style={[
          { fontSize: 25, fontWeight: "bold", textAlign: "center" },
          theme && theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        {language === "en" ? "Loading..." : "Зареждане..."}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  darkText: {
    color: ColorSchema.dark.text,
  },
  lightText: { color: ColorSchema.light.text },
  containerDark: { backgroundColor: ColorSchema.dark.background },
  containerLight: { backgroundColor: ColorSchema.light.background },
});
