import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Categories } from "../../components/home/Categories";
import { PlaceCard } from "../../components/home/PlaceCard";
import { ColorSchema, new_green } from "../../constants/Colors";
import { PlacesNavProps } from "../../navigation/types";
import { fetchAllSites } from "../../utils/makeRequestToServer";
import { UserState } from "../../store/reducers/UserReducer";
import { SitesState } from "../../store/reducers/SitesReducer";
import { SitesActions } from "../../store/actions/SitesActions";
import { Loading } from "../../components/general/Loading";
import { windowWidth } from "../../utils/Dimensions";
import { Site } from "../../models/Site";

import GestureRecognizer from "react-native-swipe-gestures";
import { mapCategory } from "../../utils/mapCategories";
import { ErrorMessage } from "../../components/general/ErrorMessage";

export const HomeScreen = ({ navigation }: PlacesNavProps<"Home">) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  // const renderLeftActions = (progress: any, dragX) => {
  //   const trans = dragX.interpolate({
  //     inputRange: [0, 50, 100, 101],
  //     outputRange: [-20, 0, 0, 1],
  //   });
  //   return (
  //     <View>
  //       <FlatList
  //         // columnWrapperStyle={{ justifyContent: "space-between" }}
  //         showsVerticalScrollIndicator={true}
  //         contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
  //         numColumns={2}
  //         data={sites}
  //         keyExtractor={(item, _idx) => `${item.id}`}
  //         renderItem={({ item }: { item: Site }) => (
  //           <PlaceCard
  //             key={item.id}
  //             onPress={() => {
  //               navigation.navigate("PlaceDetails", {
  //                 id: item.id,
  //                 title: item.region,
  //               });
  //             }}
  //             description={`${item.city.trim()}`}
  //             title={item.name}
  //             imageUrl={item.image}
  //             visited={item.is_stamped}
  //           />
  //         )}
  //       />
  //     </View>
  //   );
  // };

  const onSwipeLeft = () => {
    // console.log("SWIPE_LEFT");
    setCategoryIndex((currentIndex) => {
      if (currentIndex < 2) {
        return currentIndex + 1;
      } else {
        return currentIndex;
      }
    });
  };

  const onSwipeRight = () => {
    // console.log("SWIPE_RIGHT");
    setCategoryIndex((currentIndex) => {
      if (currentIndex >= 1) {
        return currentIndex - 1;
      } else {
        return currentIndex;
      }
    });
  };

  const [categoryIndex, setCategoryIndex] = useState(0);
  // const [active, setActive] = useState<"all" | "visited" | "other">("all");

  const token = useSelector((state: { user: UserState }) => state.user.token);
  const sites = useSelector(
    (state: { sites: SitesState }) => state.sites.sites
  );
  const dispatch = useDispatch();
  const [loading, setLoading] = useState<boolean>(false);

  const categories = ["all", "visited", "unvisited"];
  // const imgUri =
  //   "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";

  useEffect(() => {
    if (!token) return;

    const fetchSites = async () => {
      setLoading(true);
      const fetchedSites = await fetchAllSites(
        token,
        categories[categoryIndex] as any
      );
      dispatch({
        type: SitesActions.SET_SITES,
        payload: { sites: fetchedSites },
      });
      setLoading(false);
    };

    fetchSites();
  }, [categoryIndex, token]);

  if (loading) {
    <Loading />;
  }

  return (
    <View
      style={[
        styles.container,
        theme && theme === "dark"
          ? styles.containerDark
          : styles.containerLight,
      ]}
    >
      <View style={styles.header}>
        <View>
          <Text
            style={[
              { fontSize: 25, fontWeight: "bold" },
              theme && theme === "dark" ? styles.darkText : styles.lightText,
            ]}
          >
            {language && language === "en"
              ? "Welcome To"
              : "Остроумно заглавие"}
          </Text>
          <Text
            style={[
              styles.title,
              theme && theme === "dark"
                ? { color: new_green }
                : styles.lightText,
            ]}
          >
            {language && language === "en" ? "App Name" : "Име На Приложението"}
          </Text>
        </View>
      </View>

      <View style={styles.categoryContainer}>
        {categories.map((item, index) => (
          <Categories
            key={index}
            index={index}
            onSelect={setCategoryIndex}
            item={
              language === "en" && language ? item : mapCategory(item as any)
            }
            selectedIdx={categoryIndex}
          />
        ))}
      </View>

      {sites ? (
        <GestureRecognizer
          onSwipeLeft={() => onSwipeLeft()}
          onSwipeRight={() => onSwipeRight()}
          config={{
            velocityThreshold: 0.4,
            directionalOffsetThreshold: 80,
          }}
        >
          <FlatList
            // columnWrapperStyle={{ justifyContent: "space-between" }}
            showsVerticalScrollIndicator={true}
            contentContainerStyle={{ marginTop: 10, paddingBottom: 230 }}
            numColumns={2}
            data={sites}
            keyExtractor={(item, _idx) => `${item.id}`}
            renderItem={({ item }: { item: Site }) => (
              <PlaceCard
                key={item.id}
                onPress={() => {
                  navigation.navigate("PlaceDetails", {
                    id: item.id,
                    title: item.region,
                  });
                }}
                description={`${item.city.trim()}`}
                title={item.name}
                imageUrl={item.image}
                visited={item.is_stamped}
              />
            )}
          />
        </GestureRecognizer>
      ) : (
        // <Swipeable
        //   onSwipeableLeftOpen={onSwipeLeft}
        //   onSwipeableRightOpen={onSwipeRight}
        //   renderLeftActions={renderLeftActions}
        //   renderRightActions={renderLeftActions}
        // >
        //   <View>
        //     <FlatList
        //       // columnWrapperStyle={{ justifyContent: "space-between" }}
        //       showsVerticalScrollIndicator={true}
        //       contentContainerStyle={{ marginTop: 10, paddingBottom: 50 }}
        //       numColumns={2}
        //       data={sites}
        //       keyExtractor={(item, _idx) => `${item.id}`}
        //       renderItem={({ item }: { item: Site }) => (
        //         <PlaceCard
        //           key={item.id}
        //           onPress={() => {
        //             navigation.navigate("PlaceDetails", {
        //               id: item.id,
        //               title: item.region,
        //             });
        //           }}
        //           description={`${item.city.trim()}`}
        //           title={item.name}
        //           imageUrl={item.image}
        //           visited={item.is_stamped}
        //         />
        //       )}
        //     />
        //   </View>
        // </Swipeable>
        <ErrorMessage
          text={
            language === "en" ? "No sites found. Try to reload." : "Грешка."
          }
        />
      )}
    </View>
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
    width: windowWidth / 2 - 30,
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
