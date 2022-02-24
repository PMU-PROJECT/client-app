import { Button, StyleSheet, Text, View } from "react-native";
import { AuthNavProps } from "../../navigation/params/AuthParamList";

export const LoginScreen = ({ navigation, route }: AuthNavProps<"Login">) => {
  return (
    <View style={styles.container}>
      <Text>Login!</Text>
      <Button
        title="go to register"
        onPress={() => {
          navigation.navigate("Register");
        }}
      />
      <Button title="Login" onPress={() => {}} />
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
