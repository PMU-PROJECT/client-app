import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ColorSchema } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ColorContext } from "../../navigation/RootNavigator";

export const FormNavButtons: React.FC = (props) => {
  const navigation = useNavigation();
  const route = useRoute();
  const { theme } = useContext(ColorContext);

  let active: "login" | "register" = "login";

  if (route.name === "Login") {
    active = "login";
  } else if (route.name === "Register") {
    active = "register";
  }

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <TouchableOpacity
        style={[
          active === "login" ? styles.buttonActive : styles.buttonOther,
          styles.buttonLeft,
        ]}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text
          style={[
            styles.title,
            active === "login"
              ? styles.titleDark
              : theme === "dark"
              ? styles.titleDark
              : styles.titleLight,
          ]}
        >
          Login
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          active === "register" ? styles.buttonActive : styles.buttonOther,
          ,
          styles.buttonRight,
        ]}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text
          style={[
            styles.title,
            ,
            active === "register"
              ? styles.titleDark
              : theme === "dark"
              ? styles.titleDark
              : styles.titleLight,
          ]}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 50,
    justifyContent: "space-evenly",
    borderRadius: 22,
  },
  containerLight: {
    backgroundColor: ColorSchema.default.disabledButton,
  },
  containerDark: {
    backgroundColor: "#000",
    borderColor: ColorSchema.dark.headerButtonAlpha,
    borderWidth: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleDark: {
    color: ColorSchema.dark.text,
  },
  titleLight: {
    color: ColorSchema.light.text,
  },
  buttonActive: {
    backgroundColor: ColorSchema.dark.headerButtonAlpha,
    width: "55%",
    color: "#fff",
    height: 40,
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: 20,
  },
  buttonOther: {
    width: "45%",
    color: ColorSchema.light.text,
    height: 40,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  buttonLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
