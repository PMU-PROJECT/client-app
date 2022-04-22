import { StyleSheet, View } from "react-native";
import React from "react";
import { UserState } from "../../store/reducers/UserReducer";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { ScalableText } from "./ScalableText";

type ErrorMessageProps = {
  text: string;
};

/**
 * @component
 * @param text string of the message
 * @description Component used for showing error messeges to the users
 */
export const ErrorMessage: React.FC<ErrorMessageProps> = ({ text }) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <View style={styles.container}>
      <ScalableText
        fontSize={25}
        numberOfLines={2}
        text={text}
        styles={[
          styles.text,
          theme && theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
  },
  darkText: {
    color: ColorSchema.dark.text,
  },
  lightText: { color: ColorSchema.light.text },
});
