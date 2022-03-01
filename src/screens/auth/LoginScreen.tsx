import { Button, StyleSheet, Text, View } from "react-native";
import { LoginForm } from "../../components/form/LoginForm";
import { AuthNavProps } from "../../navigation/types";

export const LoginScreen = ({ navigation, route }: AuthNavProps<"Login">) => {
  return (
    <View style={styles.container}>
      <Text>Login!</Text>
      <LoginForm />
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
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
