import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet } from "react-native";

export const FormContainer = (props: any) => {
  return (
    <KeyboardAvoidingView
      enabled
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.container}
    >
      {props.children}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    paddingHorizontal: 20,
  },
});
