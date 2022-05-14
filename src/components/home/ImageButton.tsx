import React from "react";
import {
  GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ColorSchema } from "../../constants/Colors";
import { ScalableText } from "../general/ScalableText";

type ImageButtonProps = {
  title: string;
  description: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

/**
 * @component
 * @param onPress function that should run when the button is pressed
 * @param description string containig the region of the site
 * @param title string title of the site
 * @description Custom text component for automaticly sizing the text to fit
 */
export default function ImageButton({
  title,
  description,
  onPress,
}: ImageButtonProps) {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.imageButton}>
        <View
          style={{
            height: "75%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ScalableText
            numberOfLines={4}
            styles={styles.title}
            fontSize={16}
            text={title}
          />
        </View>
        <View style={{ height: "25%" }}>
          <ScalableText
            numberOfLines={2}
            styles={styles.description}
            fontSize={12}
            text={description}
          />
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  imageButton: {
    backgroundColor: "rgba(0,0,0,0.5)",
    width: "100%",
    height: "33%",
    position: "absolute",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    bottom: 0,
    left: 0,
    justifyContent: "center",
  },
  title: {
    padding: 2.5,
    fontWeight: "bold",
    textAlign: "center",
    color: ColorSchema.dark.text,
  },
  description: {
    textAlign: "center",
    color: ColorSchema.dark.text,
  },
});
