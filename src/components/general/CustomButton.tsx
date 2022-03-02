import React from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  GestureResponderEvent,
} from "react-native";

type ButtonProps = {
  title: string;
  submitting?: boolean;
  color: string;
  stylesProp?: {};
  onPress:
    | ((event: GestureResponderEvent) => void)
    // | ((e: React.FormEvent<HTMLFormElement> | undefined) => void)
    | undefined;
};

export const CustomButton = ({
  title,
  submitting,
  color,
  stylesProp,
  onPress,
}: ButtonProps) => {
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : undefined}
      style={[styles.container, stylesProp, { backgroundColor: color }]}
    >
      <Text>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
});
