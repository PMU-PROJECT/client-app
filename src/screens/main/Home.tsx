import { Button, StyleSheet, Text, View } from "react-native";
import { PlacesNavProps } from "../../navigation/params/PlacesParamList";

export const HomeScreen = ({ navigation, route }: PlacesNavProps<"Home">) => {
  return (
    <View style={styles.container}>
      <Text>Home</Text>
      <Button
        title="View Details"
        onPress={() => {
          navigation.navigate("PlaceDetails", {
            id: "Place 1",
          });
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
