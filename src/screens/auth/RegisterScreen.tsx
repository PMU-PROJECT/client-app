import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { RegisterForm } from "../../components/form/RegisterForm";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { AuthNavProps } from "../../navigation/types";

export const RegisterScreen = ({
  navigation,
  route,
}: AuthNavProps<"Register">) => {
  const { theme } = useContext(ColorContext);

  return (
    <View
      style={[styles.container, theme === "dark" ? styles.dark : styles.light]}
    >
      <RegisterForm />
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
