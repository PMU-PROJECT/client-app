import { StyleSheet, Text, View } from "react-native";

export const ScanQRScreen = () => {
  return (
    <View style={styles.container}>
      <Text>ScanQRScreen</Text>
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
