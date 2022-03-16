import { AntDesign, FontAwesome } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { UserActions } from "../../store/actions/UserActions";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/inputValidation";
import { makeAuthRequest } from "../../utils/makeRequestToServer";
import { FormContainer } from "./FormContainer";
import { FormInput } from "./FormInput";

export const LoginForm: React.FC = () => {
  const { theme } = useContext(ColorContext);
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
      // const res = await makeAuthRequest("login", { ...userInfo });
      // console.log(res);
      dispatch({ type: UserActions.LOGIN, payload: { token: "12345678" } });
    }
  };

  return (
    <>
      <FormContainer>
        <Text
          style={[
            styles.header,
            theme === "dark" ? styles.headerDark : styles.header,
          ]}
        >
          Welcome Back!
        </Text>
        {error && error.field === "all" ? (
          <Text style={styles.textError}>{error.message}</Text>
        ) : null}
        <View style={styles.form}>
          <FormInput
            value={email}
            onChangeText={(value: string) => handleOnChangeText(value, "email")}
            label="Email"
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
            label="Password"
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
                LOG IN
              </AntDesign.Button>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttons}>
              <FontAwesome.Button
                name="google"
                size={25}
                color={"white"}
                backgroundColor={ColorSchema.default.dark_green}
                onPress={() => {}}
              >
                SIGN UP
              </FontAwesome.Button>
            </TouchableOpacity>
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
