import { Button, StyleSheet, Text, View } from "react-native";
import { AuthNavProps } from "../../navigation/params/AuthParamList";

export const RegisterScreen = ({
  navigation,
  route,
}: AuthNavProps<"Login">) => {
  return (
    <View style={styles.container}>
      <Text>Register!</Text>
      <Button
        title="go to login"
        onPress={() => {
          navigation.navigate("Login");
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
