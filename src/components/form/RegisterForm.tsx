import React, { useState } from "react";
import { View, StyleSheet, Text, Button, TouchableOpacity } from "react-native";
import { Formik, FormikHelpers } from "formik";
import { FormInput } from "./FormInput";
import { FormContainer } from "./FormContainer";
import {
  isValidEmail,
  isValidObjField,
  updateError,
} from "../../utils/inputValidation";
import { ValidationSchema } from "../../utils/ValidationSchema";
import { CustomButton } from "../general/CustomButton";
import { primary_main } from "../../constants/Colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: React.FC = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const handleOnChangeText = (value: string, fieldName: string) => {
  //   setUserInfo({ ...userInfo, [fieldName]: value });
  // };

  return (
    <FormContainer>
      <Text style={styles.header}>Register</Text>
      <Formik
        style={styles.form}
        initialValues={userInfo}
        validationSchema={ValidationSchema}
        onSubmit={(
          values: UserInfo,
          formikHelpers: FormikHelpers<UserInfo>
        ) => {
          console.log(values);
          formikHelpers.resetForm();
          formikHelpers.setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { firstName, lastName, email, password, confirmPassword } =
            values;
          return (
            <>
              <FormInput
                value={firstName}
                error={
                  touched.firstName && errors.firstName
                    ? errors.firstName
                    : undefined
                }
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                label="First Name"
                placeholder="John"
                returnKeyType="next"
              />
              <FormInput
                value={lastName}
                error={
                  touched.lastName && errors.lastName
                    ? errors.lastName
                    : undefined
                }
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                label="Last Name"
                placeholder="Smith"
                returnKeyType="next"
              />
              <FormInput
                value={email}
                error={touched.email && errors.email ? errors.email : undefined}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                autoCapitalize="none"
                label="Email"
                placeholder="example@email.com"
                returnKeyType="next"
              />
              <FormInput
                value={password}
                error={
                  touched.password && errors.password
                    ? errors.password
                    : undefined
                }
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                autoCapitalize="none"
                secureTextEntry
                label="Password"
                placeholder="********"
                returnKeyType="next"
              />
              <FormInput
                value={confirmPassword}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                autoCapitalize="none"
                secureTextEntry
                label="Confirm Password"
                placeholder="********"
                returnKeyType="done"
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttons}>
                  <Ionicons.Button
                    name="create-outline"
                    size={25}
                    color={"white"}
                    backgroundColor={"blue"}
                    onPress={handleSubmit as any}
                  >
                    Register
                  </Ionicons.Button>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
      </Formik>
    </FormContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    textAlign: "center",
    marginVertical: 20,
    color: primary_main,
    fontWeight: "bold",
    fontSize: 28,
  },
  form: {
    justifyContent: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  buttons: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
