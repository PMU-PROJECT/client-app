import React, { useState } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import { Formik } from "formik";
import { FormContainer } from "./FormContainer";
import { FormInput } from "./FormInput";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/inputValidation";

export const LoginForm = () => {
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

    if (!password.trim() || password.length < 8)
      return updateError("Password is too short!", "pass", setError);

    return true;
  };

  const submitForm = () => {
    if (isValidForm()) {
      console.log(userInfo);
    }
  };

  return (
    <FormContainer>
      {error && error.field === "all" ? (
        <Text style={styles.textError}>{error.message}</Text>
      ) : null}
      <FormInput
        value={email}
        onChangeText={(value: string) => handleOnChangeText(value, "email")}
        label="Email"
        placeholder="example@email.com"
        autoCapitalize="none"
        error={error && error.field === "email" ? error.message : undefined}
      />
      <FormInput
        value={password}
        onChangeText={(value: string) => handleOnChangeText(value, "password")}
        label="Password"
        placeholder="********"
        autoCapitalize="none"
        secureTextEntry
        error={error && error.field === "pass" ? error.message : undefined}
      />
      <Button
        title="Login"
        onPress={() => {
          console.log(error.message);
          submitForm();
        }}
      />
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  textError: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
  },
});
