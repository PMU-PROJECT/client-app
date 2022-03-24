import { Ionicons } from "@expo/vector-icons";
import { Formik, FormikHelpers } from "formik";
import React, { useContext, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { UserActions } from "../../store/actions/UserActions";
import { getSelfInfo, makeAuthRequest } from "../../utils/makeRequestToServer";
import { ValidationSchema } from "../../utils/ValidationSchema";
import { FormContainer } from "./FormContainer";
import { FormInput } from "./FormInput";

type UserInfo = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const RegisterForm: React.FC = () => {
  const { theme } = useContext(ColorContext);
  const dispatch = useDispatch();

  const [userInfo, _setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // const handleOnChangeText = (value: string, fieldName: string) => {
  //   setUserInfo({ ...userInfo, [fieldName]: value });
  // };

  const handleSubmit = async (
    values: UserInfo,
    formikHelpers: FormikHelpers<UserInfo>
  ) => {
    const token = await makeAuthRequest("registration", {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password,
    });
    if (token !== null) {
      const userInfo = await getSelfInfo(token);
      if (userInfo !== null) {
        dispatch({
          type: UserActions.REGISTER,
          payload: {
            token,
            userData: {
              ...userInfo,
            },
          },
        });
      }
    }
    formikHelpers.resetForm();
    formikHelpers.setSubmitting(false);
  };

  return (
    <FormContainer>
      <Text
        style={[
          styles.header,
          theme === "dark" ? styles.headerDark : styles.headerLight,
        ]}
      >
        Register
      </Text>
      <Formik
        style={styles.form}
        initialValues={userInfo}
        validationSchema={ValidationSchema}
        onSubmit={handleSubmit}
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
                    backgroundColor={ColorSchema.default.dark_green}
                    onPress={handleSubmit as any}
                  >
                    REGISTER
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
