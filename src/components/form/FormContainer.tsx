import React from "react";
import { KeyboardAvoidingView, Platform, StyleSheet, View } from "react-native";
import { FormNavButtons } from "./FormNavButtons";

export const FormContainer: React.FC = (props: any) => {
  return (
    <>
      <KeyboardAvoidingView
        enabled
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.container}
      >
        <View style={styles.navButtons}>
          <FormNavButtons />
        </View>
        {props.children}
      </KeyboardAvoidingView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    shadowColor: "black",
    justifyContent: "center",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 10,
    padding: 20,
  },
  navButtons: {
    alignSelf: "flex-start",
  },
});
