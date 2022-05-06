import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { LoginForm } from "../../components/form/LoginForm";
import { ColorSchema } from "../../constants/Colors";
import { AuthNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";

/**
 * @compenent
 * @description Returns the Login screens
 */
export const LoginScreen = ({}: AuthNavProps<"Login">) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <View
      style={[
        styles.container,
        theme && theme === "dark" ? styles.dark : styles.light,
      ]}
    >
      <LoginForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  dark: { backgroundColor: ColorSchema.dark.background },
  light: { backgroundColor: ColorSchema.light.background },
});
