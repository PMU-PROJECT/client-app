import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomMap } from "../../components/general/CustomMap";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { CustomImageCarousel } from "../../components/general/CustomImageCarousel";
import { ColorSchema } from "../../constants/Colors";
import { getSiteInfo } from "../../utils/makeRequestToServer";
import { PlacesNavProps } from "../../navigation/types";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
import { SiteDetails } from "../../models/Site";
import { Loading } from "../../components/general/Loading";

export const DetailsScreen = ({ route }: PlacesNavProps<"PlaceDetails">) => {
  const id = route.params.id;
  const token = useSelector((state: { user: UserState }) => state.user.token);
  const [details, setDetails] = useState<SiteDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  useEffect(() => {
    const getInfo = async () => {
      setLoading(true);
      const data = await getSiteInfo(id, token!);
      // console.log(data);
      setDetails(data);
      setLoading(false);
    };
    getInfo();
  }, []);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  let userLong = 0;
  let userLat = 0;

  useEffect(() => {
    (async () => {
      if (Platform.OS === "android" && !Constants.isDevice) {
        setErrorMsg(
          "Oops, this will not work on Snack in an Android emulator. Try it on your device!"
        );
        return;
      }
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  // let text = "Waiting..";
  if (errorMsg) {
    // text = errorMsg;
  }
  if (location) {
    // text = JSON.stringify(location);
    userLat = location.coords.latitude;
    userLong = location.coords.longitude;
  }

  if (loading) {
    return <Loading />;
  }

  if (!loading && details !== null) {
    return (
      <View
        style={[
          styles.container,
          {
            backgroundColor:
              theme && theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
          },
        ]}
      >
        <View style={[styles.topContainer]}>
          <CustomImageCarousel images={details.images} />
          {/* <View style={styles.imageContainer}>
          <View>
            <CustomImageCarousel images={[]} />
            <View
            style={{
              position: "absolute",
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                justifyContent: "flex-end",
                alignItems: "flex-start",
                marginBottom: 20,
                marginLeft: 20,
                padding: 10,
              }}
              >
              <Text style={styles.text}>Site Name</Text>
              <Text style={styles.text}>Site City and Region</Text>
              </View>
              </View>
            </View> */}
        </View>
        <View
          style={[
            styles.bottomContainer,
            {
              backgroundColor:
                theme && theme === "dark"
                  ? ColorSchema.default.disabledButton
                  : ColorSchema.light.background,
            },
          ]}
        >
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={[
                  styles.title,
                  theme && theme === "dark"
                    ? styles.textDark
                    : styles.textLight,
                ]}
              >
                {details!.name}
              </Text>
              <Text
                style={[
                  styles.info,
                  theme && theme === "dark"
                    ? styles.textDark
                    : styles.textLight,
                ]}
              >
                {details!.city.trim()}, {details!.region.trim()}
              </Text>
            </View>
            <Text
              style={[
                styles.description,
                theme && theme === "dark"
                  ? styles.textDescriptionDark
                  : styles.textLight,
              ]}
            >
              {"\n"}
              {details!.description}
              {"\n"}
            </Text>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "center",
                marginTop: 24.0,
              }}
            >
              <CustomMap
                userLatitude={userLat !== 0 ? userLat : undefined}
                userLongitude={userLong !== 0 ? userLong : undefined}
                markerLongitude={parseFloat(details!.longitude)}
                markerLatitude={parseFloat(details!.latitude)}
                markerTitle={details.name}
                markerDesc={details.region}
                height={300}
                width={400}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
  return (
    <View>
      <Text
        style={[
          { fontSize: 25, fontWeight: "bold", textAlign: "center" },
          theme && theme === "dark" ? styles.textDark : styles.textLight,
        ]}
      >
        Sorry we Fucked
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    textAlign: "center",
    marginVertical: 5,
    fontSize: 22,
    fontWeight: "bold",
  },
  info: {
    textAlign: "center",
    fontSize: 18,
  },
  textLight: { color: ColorSchema.light.text },
  textDark: { color: ColorSchema.dark.text },
  textDescriptionDark: { color: "#BCBEBF" },
  topContainer: {
    backgroundColor: "transparent",
    flex: 1.5,
  },
  bottomContainer: {
    flex: 2,
    // padding: 20,
    alignItems: "center",
    justifyContent: "center",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  description: {
    textAlign: "center",
    fontSize: 17,
    // fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
