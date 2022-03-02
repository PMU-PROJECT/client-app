import { StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../../components/form/LoginForm";
import { AuthNavProps } from "../../navigation/types";

export const LoginScreen = ({ navigation, route }: AuthNavProps<"Login">) => {
  return (
    <View style={styles.container}>
      <LoginForm />
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
