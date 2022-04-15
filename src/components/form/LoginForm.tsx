import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserActions } from "../../store/actions/UserActions";
import { UserState } from "../../store/reducers/UserReducer";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/inputValidation";
import { getSelfInfo, makeAuthRequest } from "../../utils/makeRequestToServer";
import { FormContainer } from "./FormContainer";
import { FormInput } from "./FormInput";
import * as Google from "expo-auth-session/providers/google";
import { TokenResponse } from "expo-auth-session";

export const LoginForm: React.FC = () => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const dispatch = useDispatch();

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({ message: "", field: "" });

  const { email, password } = userInfo;
  const handleOnChangeText = (value: string, fieldName: string) => {
    setUserInfo({ ...userInfo, [fieldName]: value });
  };

  const isValidForm = () => {
    if (!isValidObjField(userInfo))
      return updateError("Required all fields!", "all", setError);

    if (!isValidEmail(email))
      return updateError("Invalid email!", "email", setError);

    if (!password.trim() || password.length < 6)
      return updateError("Password is too short!", "pass", setError);

    return true;
  };

  const submitForm = async () => {
    if (isValidForm()) {
      const token = await makeAuthRequest("login", { ...userInfo });
      if (token !== null) {
        const userInfo = await getSelfInfo(token);
        if (userInfo !== null) {
          dispatch({
            type: UserActions.LOGIN,
            payload: {
              token,
              userData: {
                ...userInfo,
              },
            },
          });
        }
      }
    }
  };

  const [user, setuser] = useState<{ name: string; email: string } | null>(
    null
  );
  const [token, settoken] = useState<TokenResponse | null>(null);

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
      // console.log(response);
      console.log(authentication);
      // console.log("/*******************/");
      // console.log(_request);
      settoken(authentication);
    }
  }, [response]);

  async function getUserData() {
    let res = await fetch("https://www.googleapis.com/userinfo/v2/me", {
      headers: {
        Authorization: `Bearer ${token?.accessToken}`,
        Authentication: `Bearer ${token?.accessToken}`,
      },
    });

    // console.log(JSON.stringify(res));
    const data = await res.json();
    console.log(data);
    setuser(data);
  }

  return (
    <>
      <FormContainer>
        <Text
          style={[
            styles.header,
            theme && theme === "dark" ? styles.headerDark : styles.header,
          ]}
        >
          {language && language === "en"
            ? "Welcome Back!"
            : "Добре дошли отново!"}
        </Text>
        {error && error.field === "all" ? (
          <Text style={styles.textError}>{error.message}</Text>
        ) : null}
        <View style={styles.form}>
          <FormInput
            value={email}
            onChangeText={(value: string) => handleOnChangeText(value, "email")}
            label={language && language === "en" ? "Email" : "Имейл адрес"}
            placeholder="example@email.com"
            autoCapitalize="none"
            error={error && error.field === "email" ? error.message : undefined}
            returnKeyType="next"
          />
          <FormInput
            value={password}
            onChangeText={(value: string) =>
              handleOnChangeText(value, "password")
            }
            label={language && language === "en" ? "Password" : "Парола"}
            placeholder="********"
            autoCapitalize="none"
            secureTextEntry
            error={error && error.field === "pass" ? error.message : undefined}
            returnKeyType="done"
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttons}>
              <AntDesign.Button
                name="login"
                size={25}
                color={"white"}
                backgroundColor={ColorSchema.default.dark_green}
                onPress={() => {
                  submitForm();
                }}
              >
                {language && language === "en" ? "LOGIN" : "ВХОД"}
              </AntDesign.Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <FontAwesome.Button
                name="google"
                size={25}
                color={"white"}
                backgroundColor={ColorSchema.default.dark_green}
                onPress={async () => {
                  // if (token) {
                  //   await getUserData();
                  // } else {
                  //   promptAsync({ showInRecents: true });
                  // }
                  try {
                    const res = await fetch(
                      `http://0af1-78-90-52-121.eu.ngrok.io/api/oauth2/google`
                    );

                    console.log(JSON.stringify(res));
                    console.log(res.url);
                    // if (res.status !== 200) {
                    //   const text = await res.json();
                    //   throw new Error(text.error);
                    // }
                    // {"web":{"client_id":"798626048018-mimb79khi9lgbs8ek99q6nccl04n7t78.apps.googleusercontent.com",
                    // "project_id":"pmu-project-343407","auth_uri":"https://accounts.google.com/o/oauth2/auth",
                    // "token_uri":"https://oauth2.googleapis.com/token",
                    // "auth_provider_x509_cert_url":"https://www.googleapis.com/oauth2/v1/certs",
                    // "client_secret":"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",
                    // "redirect_uris":["http://0af1-78-90-52-121.eu.ngrok.io/api/oauth2/google"]}}

                    const data = await res.json();
                    console.log(data);
                    return data;
                  } catch (err: any) {
                    console.log("Error googleAuthRequest");
                    console.log(err);
                    Alert.alert(`Error`, `${err}`, [{ text: "Okay" }]);
                    return null;
                  }
                }}
              >
                {language && language === "en"
                  ? "REGISTER"
                  : "Регистрация".toUpperCase()}
              </FontAwesome.Button>
            </TouchableOpacity>
            {user ? (
              <View>
                <Text
                  style={[
                    theme === "dark" ? styles.headerDark : styles.headerLight,
                  ]}
                >
                  {user.name}
                </Text>
                <Text
                  style={[
                    theme === "dark" ? styles.headerDark : styles.headerLight,
                  ]}
                >
                  {user.email}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </FormContainer>
    </>
  );
};

const styles = StyleSheet.create({
  textError: {
    color: ColorSchema.default.error,
    fontSize: 18,
    textAlign: "center",
  },
  header: {
    textAlign: "center",
    marginVertical: 20,
    fontWeight: "bold",
    fontSize: 28,
  },
  headerLight: {
    color: ColorSchema.light.text,
  },
  headerDark: {
    color: ColorSchema.dark.text,
  },
  form: {
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 15,
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
