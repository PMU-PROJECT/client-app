import { StyleSheet, Text, View } from "react-native";

export const RewardsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Rewards</Text>
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
