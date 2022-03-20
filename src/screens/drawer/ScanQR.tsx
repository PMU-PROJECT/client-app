import { StyleSheet, Text, View } from "react-native";
import Scanner from "../../components/scanner";
import { ColorSchema } from "../../constants/Colors";

export const ScanQRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Scan the QR code</Text>
      <Scanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    backgroundColor: ColorSchema.light.background,
  },
  containerLight: {
    backgroundColor: ColorSchema.dark.background,
  },
});
