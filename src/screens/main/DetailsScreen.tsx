import { Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { CustomMap } from "../../components/general/CustomMap";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { CustomImageCarousel } from "../../components/general/CustomImageCarousel";
import { windowWidth } from "../../utils/Dimensions";
import { ColorSchema } from "../../constants/Colors";

type Details = {
  city: string;
  description: string;
  employees: [] | null;
  // [ # Only if employees are assigned
  //   {
  //   "added_by": int,
  //   "can_reward": bool,
  //   "email": str,
  //   "first_name": str,
  //   "last_name": str,
  //   "place_id": int,
  //   "profile_picture": str
  //   }, ...
  // ],
  images: [string];
  latitude: number;
  longitude: number;
  name: string;
  region: string;
};

export const DetailsScreen = () => {
  useEffect(() => {}, []);

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

  return (
    <>
      <View style={styles.topContainer}>
        <CustomImageCarousel images={[]} />
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
      <View style={[styles.bottomContainer]}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ marginLeft: 10 }}>Site Name</Text>
            <Text style={{ marginRight: 10 }}>Site City, Region</Text>
          </View>
          <Text
            style={[styles.typeContainerTop, { marginTop: 12, fontSize: 13 }]}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. Lorem ipsum dolor sit
            amet consectetur adipisicing elit. Labore iste expedita, voluptas
            laudantium dolor quibusdam placeat ab doloribus reprehenderit,
            perferendis consequatur a accusamus necessitatibus. Sequi quis fugit
            neque ea. Cumque. Lorem ipsum dolor sit amet consectetur adipisicing
            elit. Rem vitae rerum debitis nobis animi non voluptatum possimus.
            Iusto placeat dolores necessitatibus exercitationem quisquam itaque
            deserunt quod suscipit illum! Nobis, consequatur! Lorem ipsum dolor
            sit amet consectetur adipisicing elit. Aspernatur ex non fugiat
            veritatis atque, repudiandae tempore quae aliquam, esse nulla
            reprehenderit quia quas sequi architecto assumenda nostrum, nisi
            enim deserunt.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 24.0,
            }}
          >
            <CustomMap
              latitude={userLat !== 0 ? userLat : 41.970035}
              longitude={userLong !== 0 ? userLong : 23.477082}
              markerTitle={"Title"}
              markerDesc={"Description"}
              height={300}
              width={400}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#5192FC",
  },
  topContainer: {
    backgroundColor: "transparent",
    flex: 1.5,
  },
  bottomContainer: {
    backgroundColor: "white",
    flex: 2,
    padding: 20,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  typeContainer: {
    height: 115,
    width: 100,
    marginTop: 24.0,
    marginRight: 10.0,
    justifyContent: "space-evenly",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "#F3F2F7",
  },
  typeContainerTop: {
    fontSize: 12.0,
    color: "#BCBEBF",
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
  },
});
