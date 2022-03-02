import { StyleSheet, View } from "react-native";
import { RegisterForm } from "../../components/form/RegisterForm";
import { AuthNavProps } from "../../navigation/types";

export const RegisterScreen = ({
  navigation,
  route,
}: AuthNavProps<"Login">) => {
  return (
    <View style={styles.container}>
      <RegisterForm />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
