import { StyleSheet, Text, View } from "react-native";

export const AchivementsScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Achivements</Text>
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
