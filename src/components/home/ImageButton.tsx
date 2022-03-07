import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { ColorSchema } from "../../constants/Colors";

type ImageButtonProps = {
  title: string;
  description: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

export default function ImageButton({
  title,
  description,
  onPress,
}: ImageButtonProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "30%",
    position: "absolute",
    borderRadius: 20,
    bottom: 0,
    left: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: ColorSchema.dark.text,
  },
  description: {
    fontSize: 16,
    marginVertical: 3,
    textAlign: "center",
    color: ColorSchema.dark.text,
  },
});
