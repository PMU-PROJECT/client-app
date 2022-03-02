import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import React from "react";
import { primary_main } from "../../constants/Colors";
import { useNavigation, useRoute } from "@react-navigation/native";

export const FormNavButtons: React.FC = (props) => {
  const navigation = useNavigation();
  const route = useRoute();

  let stylesLogin,
    stylesRegister = null;
  if (route.name === "Login") {
    stylesLogin = styles.buttonActive;
    stylesRegister = styles.buttonOther;
  } else if (route.name === "Register") {
    stylesLogin = styles.buttonOther;
    stylesRegister = styles.buttonActive;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[stylesLogin, styles.buttonLeft]}
        onPress={() => {
          navigation.navigate("Login");
        }}
      >
        <Text style={styles.title}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[stylesRegister, styles.buttonRight]}
        onPress={() => {
          navigation.navigate("Register");
        }}
      >
        <Text style={styles.title}>Register</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 50,
    justifyContent: "space-evenly",
  },
  title: {
    textAlign: "center",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonActive: {
    backgroundColor: "rgba(78, 36, 242, 0.85)",
    width: "50%",
    color: primary_main,
    height: 40,
    textAlign: "center",
    justifyContent: "space-evenly",
  },
  buttonOther: {
    backgroundColor: "rgba(141, 141, 168, 0.85)",
    width: "50%",
    color: primary_main,
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
