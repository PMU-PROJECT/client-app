import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  GestureResponderEvent,
} from "react-native";

type FormButtonProps = {
  title: string;
  backgroundColor: string;
  style: {};
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

export const FormButton = ({
  title,
  backgroundColor,
  style,
  onPress,
}: FormButtonProps) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style, { backgroundColor }]}>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    width: "50%",
    backgroundColor: "#1b1b33",
    justifyContent: "center",
    alignItems: "center",
  },
  title: { color: "white", fontSize: 16 },
});
