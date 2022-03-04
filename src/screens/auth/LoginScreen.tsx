import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../../components/form/LoginForm";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { AuthNavProps } from "../../navigation/types";

export const LoginScreen = ({ navigation, route }: AuthNavProps<"Login">) => {
  const { theme } = useContext(ColorContext);

  return (
    <View
      style={[styles.container, theme === "dark" ? styles.dark : styles.light]}
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
