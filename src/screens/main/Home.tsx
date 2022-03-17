import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { Categories } from "../../components/home/Categories";
import { PlaceCard } from "../../components/home/PlaceCard";
import { ColorSchema, new_green } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { PlacesNavProps } from "../../navigation/types";

const width = Dimensions.get("window").width / 2 - 30;

export const HomeScreen = ({ navigation, route }: PlacesNavProps<"Home">) => {
  const { theme } = useContext(ColorContext);
  const [categoryIndex, setCategoryIndex] = useState(0);
  // const [active, setActive] = useState<"all" | "visited" | "other">("all");

  // const [loading, setLoading] = useState<boolean>(false);
  // const [sites, setSites] = useState([]);

  const categories = ["ALL SITES", "VISITED", "OTHER"];
  const imgUri =
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";

  // useEffect(() => {
  //   // console.log("fetch new data");
  //   const fetchSites = async () => {
  //     setLoading(true);
  //     const sites = await fetchAllSites("123456789");
  //     setSites((currSites) => (sites ? sites : currSites));
  //     setLoading(false);
  //   };

  //   fetchSites();
  // }, []);

  return (
    <SafeAreaView
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              { fontSize: 25, fontWeight: "bold" },
              theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            Welcome to
          </Text>
          <Text
            style={[
              styles.title,
              theme === "dark" ? { color: new_green } : styles.lightText,
            ]}
          >
            APP NAME
          </Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <Categories
            key={index}
            index={index}
            onSelect={setCategoryIndex}
            item={item}
            selectedIdx={categoryIndex}
          />
        ))}
      </View>

      <FlatList
        // columnWrapperStyle={{ justifyContent: "space-between" }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
        numColumns={2}
        data={[
          { key: " 1" },
          { key: "2" },
          { key: "3" },
          { key: "4" },
          { key: "5" },
          { key: "6" },
          { key: "7" },
          { key: "8" },
          { key: "9" },
          { key: "10" },
        ]}
        renderItem={({ item }) => (
          <PlaceCard
            key={`${Math.random()}`}
            onPress={() => {
              navigation.navigate("PlaceDetails", { id: `${item.key}` });
            }}
            description={`Place ${item.key} location`}
            title={`Place ${item.key}`}
            imageUrl={imgUri}
          />
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  searchContainer: {
    height: 50,
    backgroundColor: "#f1f1f1",
    borderRadius: 10,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 18,
    fontWeight: "bold",
    flex: 1,
    color: "#000",
    marginRight: 20,
  },
  sortBtn: {
    height: 50,
    width: 50,
    backgroundColor: new_green,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginLeft: 10,
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 30,
    marginBottom: 20,
    justifyContent: "space-evenly",
  },

  card: {
    height: 225,
    backgroundColor: "#f1f1f1",
    width,
    marginHorizontal: 2,
    marginBottom: 20,
    padding: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    // marginVertical: 5,
    // padding: 5,
    fontSize: 38,
    color: new_green,
    fontWeight: "bold",
  },
  darkText: {
    color: ColorSchema.dark.text,
  },
  lightText: { color: ColorSchema.light.text },
  containerDark: { backgroundColor: ColorSchema.dark.background },
  containerLight: { backgroundColor: ColorSchema.light.background },
});
