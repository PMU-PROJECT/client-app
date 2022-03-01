import React, { useReducer, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputProps,
} from "react-native";

type InputProps = {
  placeholder: string;
  label: string;
  error?: string | undefined;
  value: string;
  isValid?: boolean;
  touched?: boolean | undefined;
  // onInputChange: Function;
} & TextInputProps;

export const FormInput = (props: InputProps) => {
  const { placeholder, label, error } = props;
  return (
    <>
      <View style={styles.formControl}>
        <Text style={styles.label}>{label}</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TextInput {...props} placeholder={placeholder} style={styles.input} />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
  error: {
    color: "red",
    fontSize: 16,
  },
  formControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#14143b",
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
});
