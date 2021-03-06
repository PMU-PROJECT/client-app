import React from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";

type InputProps = {
  placeholder: string;
  label: string;
  error?: string | undefined;
  value: string;
  isValid?: boolean;
  touched?: boolean | undefined;
  // onInputChange: Function;
} & TextInputProps;

/**
 * @compenent
 * @param props InputProps & TextInputProps
 * @description Returns a custom text Input with a label, plus options for showing an
 * error message for invalid user input
 */
export const FormInput: React.FC<InputProps> = (props: InputProps) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  const { placeholder, label, error } = props;

  return (
    <>
      <View style={styles.formControl}>
        <Text
          style={[
            styles.label,
            theme && theme === "dark" ? styles.labelDark : styles.labelLight,
          ]}
        >
          {label}
        </Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
      </View>
      <TextInput
        {...props}
        placeholder={placeholder}
        placeholderTextColor={
          theme && theme === "dark"
            ? ColorSchema.default.disabled
            : ColorSchema.default.disabled
        }
        style={[
          styles.input,
          theme && theme === "dark" ? styles.inputBgDark : styles.inputBgLight,
        ]}
      />
    </>
  );
};

const styles = StyleSheet.create({
  label: {
    fontWeight: "bold",
  },
  labelDark: {
    color: ColorSchema.dark.text,
  },
  labelLight: {
    color: ColorSchema.light.text,
  },
  error: {
    color: ColorSchema.default.error,
    fontSize: 16,
  },
  formControl: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  input: {
    height: 35,
    borderRadius: 8,
    fontSize: 16,
    paddingLeft: 10,
    marginBottom: 20,
  },
  inputBgDark: {
    backgroundColor: "rgba(141, 141, 168, 0.2)",
    color: ColorSchema.dark.text,
  },
  inputBgLight: {
    backgroundColor: "rgba(141, 141, 168, 0.2)",
    color: ColorSchema.light.text,
  },
});
