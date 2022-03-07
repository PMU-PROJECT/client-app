import { useContext } from "react";
import { StyleSheet, View, FlatList } from "react-native";
import { PlaceCard } from "../../components/home/placeCard";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { PlacesNavProps } from "../../navigation/types";

export const HomeScreen = ({ navigation, route }: PlacesNavProps<"Home">) => {
  const { theme } = useContext(ColorContext);
  const imageUrl =
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";

  const renderGridItem = () => {
    return (
      <PlaceCard
        key={`${Math.random()}`}
        onPress={() => {
          navigation.navigate("PlaceDetails", { id: "1" });
        }}
        description="Place 1 location"
        title={"Place 1"}
        imageUrl={imageUrl}
      />
    );
  };

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <FlatList
        data={[{ key: " 1" }, { key: "2" }, { key: "3" }, { key: "4" }]}
        keyExtractor={(item, _idx) => item.key}
        numColumns={2}
        renderItem={renderGridItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: { backgroundColor: ColorSchema.dark.background },
  containerLight: { backgroundColor: ColorSchema.light.background },
});
