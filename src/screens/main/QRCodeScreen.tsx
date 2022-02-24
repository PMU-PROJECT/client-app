import { Button, StyleSheet, Text, View } from "react-native";
import { PlacesNavProps } from "../../navigation/params/PlacesParamList";

export const QRCodeScreen = ({ navigation, route }: PlacesNavProps<"Home">) => {
  return (
    <View style={styles.container}>
      <Text>QR Code goes here!</Text>
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
