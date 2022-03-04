import { Button, StyleSheet, Text, View, FlatList } from "react-native";
import { PlaceCard } from "../../components/home/placeCard";
import { PlacesNavProps } from "../../navigation/types";

export const HomeScreen = ({ navigation, route }: PlacesNavProps<"Home">) => {
  const imageUrl =
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";

  const renderGridItem = () => {
    return (
      <PlaceCard
        key={`${Math.random()}`}
        onPress={() => {
          navigation.navigate("PlaceDetails", { id: "1" });
        }}
        title={"Place 1"}
        imageUrl={imageUrl}
      />
    );
  };

  return (
    <FlatList
      data={[1, 2, 3, 3]}
      keyExtractor={(_item, idx) => idx}
      numColumns={2}
      renderItem={renderGridItem}
    />
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
