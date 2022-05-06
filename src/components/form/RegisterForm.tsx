import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Formik, FormikHelpers } from "formik";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GestureRecognizer from "react-native-swipe-gestures";
import { useDispatch, useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { AuthParamList } from "../../navigation/types";
import { UserActions } from "../../store/actions/UserActions";
import { UserState } from "../../store/reducers/UserReducer";
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

/**
 * @compenent
 * @description Returns register form component that contains the FormNavButtons,
 * FormInputs for names, email and password and button for registration
 */
export const RegisterForm: React.FC = () => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const dispatch = useDispatch();
  const navigation: StackNavigationProp<AuthParamList, "Login" | "Register"> =
    useNavigation();

  const [userInfo, _setUserInfo] = useState<UserInfo>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

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
        formikHelpers.resetForm();
      }
    }
    formikHelpers.setSubmitting(false);
  };

  return (
    <FormContainer>
      <GestureRecognizer
        config={{
          velocityThreshold: 0.3,
          directionalOffsetThreshold: 80,
        }}
        onSwipeRight={() => {
          navigation.navigate("Login");
        }}
        // onSwipeRight={}
      >
        <Text
          style={[
            styles.header,
            theme && theme === "dark" ? styles.headerDark : styles.headerLight,
          ]}
        >
          {language && language === "en" ? "Register" : "Регистрация"}
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
            // isSubmitting,
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
                  label={
                    language && language === "en" ? "First Name" : "Първо име"
                  }
                  placeholder={language && language === "en" ? "John" : "Иван"}
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
                  label={
                    language && language === "en" ? "Last Name" : "Фамилия"
                  }
                  placeholder={
                    language && language === "en" ? "Johnson" : "Иванов"
                  }
                  returnKeyType="next"
                />
                <FormInput
                  value={email}
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                  onChangeText={handleChange("email")}
                  onBlur={handleBlur("email")}
                  autoCapitalize="none"
                  label={
                    language && language === "en" ? "Email" : "Имейл Адрес"
                  }
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
                  label={language && language === "en" ? "Password" : "Парола"}
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
                  label={
                    language && language === "en"
                      ? "Confirm Password"
                      : "Потвърди Парола"
                  }
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
                      {language && language === "en"
                        ? "Register"
                        : "Регистрация".toUpperCase()}
                    </Ionicons.Button>
                  </TouchableOpacity>
                </View>
              </>
            );
          }}
        </Formik>
      </GestureRecognizer>
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
