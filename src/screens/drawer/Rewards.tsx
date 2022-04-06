import { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import { TokenResponse } from "expo-auth-session";
// import * as Google2 from "expo-google-sign-in";

export const RewardsScreen = () => {
  const [user, setuser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [token, _settoken] = useState<TokenResponse | null>(null);

  const [_request, response, promptAsync] = Google.useAuthRequest({
    androidClientId:
      "102677665631-i1jrt648jjl95l35c0vde36vlpnsh1bs.apps.googleusercontent.com",
    expoClientId:
      "102677665631-2bnoj2r075lhqpgtrdh46of7sq636uj5.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@gen44o/pmu-app",
    clientSecret: "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",
    scopes: ["profile", "email"],
  });

  useEffect(() => {
    if (response?.type === "success") {
      const { authentication } = response;
      console.log(response);
      console.log(authentication);
      console.log("/*******************/");
      console.log(_request);
      _settoken(authentication);
    }
  }, [response]);

  // useEffect(() => {
  //   if (response?.type === "success") {
  //     settoken(response.authentication?.accessToken);
  //   }
  // }, [response]);

  async function getUserData() {
    let res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        Authentication: `Bearer ${token?.accessToken}`,
      },
    });

    console.log(res);
    const data = await res.json();
    console.log(data);
    setuser(data);
  }

  // const initAsync = async () => {
  //   try {
  //     await GoogleSignIn.initAsync({
  //       // You may ommit the clientId when the firebase `googleServicesFile` is configured
  //       clientId: "<YOUR_IOS_CLIENT_ID>",
  //       // Provide other custom options...
  //     });
  //   } catch ({ message }) {
  //     alert("GoogleSignIn.initAsync(): " + message);
  //   }
  //   await GoogleSignIn.initAsync({
  //     // You may ommit the clientId when the firebase `googleServicesFile` is configured
  //     clientId:
  //       "76434185540-8mvp8297q2igvrdtjjs3unhkuvbfumq2.apps.googleusercontent.com",
  //   });
  //   _syncUserWithStateAsync();
  // };

  // const _syncUserWithStateAsync = async () => {
  //   const u = await GoogleSignIn.signInSilentlyAsync();
  //   console.log(u);
  //   setuser({ u });
  // };

  // const signOutAsync = async () => {
  //   await GoogleSignIn.signOutAsync();
  //   setuser({ user: null });
  // };

  // const signInAsync = async () => {
  //   try {
  //     await GoogleSignIn.askForPlayServicesAsync();
  //     const { type, user } = await GoogleSignIn.signInAsync();
  //     if (type === "success") {
  //       _syncUserWithStateAsync();
  //     }
  //   } catch ({ message }) {
  //     alert("login: Error:" + message);
  //   }
  // };

  // const onPress = () => {
  //   if (user) {
  //     console.log(user);
  //     signOutAsync();
  //   } else {
  //     console.log(user);
  //     signInAsync();
  //   }
  // };

  // useEffect(() => {
  //   initAsync();
  // }, []);

  return (
    <View style={styles.container}>
      <Text>Rewards</Text>
      <Button
        title="Toggle Auth"
        onPress={async () => {
          if (token) {
            await getUserData();
          } else {
            promptAsync({ showInRecents: true });
          }
        }}
      ></Button>
      {user ? (
        <View>
          <Text>{user.name}</Text>
          <Text>{user.email}</Text>
        </View>
      ) : null}
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
