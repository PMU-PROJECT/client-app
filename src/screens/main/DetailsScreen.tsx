import { Button, StyleSheet, Text, View } from "react-native";
// import { androidId } from "expo-application";
import * as Google from "expo-auth-session/providers/google";
import { useEffect } from "react";
import { CustomMap } from "../../components/general/CustomMap";

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
      <CustomMap
        latitude={41.970035}
        longitude={23.477082}
        markerTitle={"Title"}
        markerDesc={"Description"}
        height={400}
        width={500}
      />
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
});
