import { Button, Platform, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
// import { androidId } from "expo-application";
import * as Google from "expo-auth-session/providers/google";
import { CustomMap } from "../../components/general/CustomMap";
import { ImageCarousel } from "../../components/general/ImageCarousel";
import Constants from "expo-constants";
import * as Location from "expo-location";
import { LocationObject } from "expo-location";
import { CustomImageCarousel } from "../../components/general/CustomImageCarousel";

export const DetailsScreen = () => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    expoClientId:
      "798626048018-95mqg2bugasu4572nhb15p11s51cfbh5.apps.googleusercontent.com",
    iosClientId:
      "798626048018-95mqg2bugasu4572nhb15p11s51cfbh5.apps.googleusercontent.com",
    androidClientId:
      "798626048018-95mqg2bugasu4572nhb15p11s51cfbh5.apps.googleusercontent.com",
    webClientId:
      "798626048018-95mqg2bugasu4572nhb15p11s51cfbh5.apps.googleusercontent.com",
    clientId:
      "798626048018-95mqg2bugasu4572nhb15p11s51cfbh5.apps.googleusercontent.com",
  });

  useEffect(() => {
    console.log(response);
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(authentication);
    }
  }, [response]);

  const [location, setLocation] = useState<LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  let userLong = 0;
  let userLat = 0;

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
    userLat = location.coords.latitude;
    userLong = location.coords.longitude;
  }

  return (
    <View style={styles.container}>
      <Text>Details</Text>
      <Button
        title={"Login"}
        onPress={async () => {
          try {
            const res = await fetch(
              "http://356f-78-90-52-121.ngrok.io/api/get_all_sites",
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization:
                    "ae6fd49e6309089650e9f4bd0c47b4cca9652dd3676a34df8266bdd4eb69b25b59dea0bf9b7d3f6356b4a3fea50e7b6ac0ce348ca1a2afb7ea0f513f1b9ee30db157a02becdeaa4e93e0e756",
                },

                method: "GET",
                // body: JSON.stringify({
                //   email: "yeet2@abv.bg",
                //   password: "123456",
                // }),
              }
            );
            // console.log(res);
            const data = await res.json();
            console.log(data);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      <View style={{ marginVertical: 50 }}>
        <CustomImageCarousel images={[]} />
      </View>
      <CustomMap
        latitude={userLat !== 0 ? userLat : 41.970035}
        longitude={userLong !== 0 ? userLong : 23.477082}
        markerTitle={"Title"}
        markerDesc={"Description"}
        height={300}
        width={300}
      />
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
      {/* <ImageCarousel images={[]} /> */}
      {/* <Button
        disabled={!request}
        title="Login G"
        onPress={() => {
          promptAsync();
        }}
      /> */}
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
  paragraph: {
    fontSize: 18,
    textAlign: "center",
  },
});
