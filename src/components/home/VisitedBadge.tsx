import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { ColorSchema, new_green } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { ScalableText } from "../general/ScalableText";

export const VisitedBadge: React.FC = () => {
  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={22} color="white" />
      <ScalableText
        numberOfLines={2}
        styles={styles.text}
        fontSize={12}
        text={"Посетено"}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    textAlign: "center",
    color: ColorSchema.dark.text,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    backgroundColor: new_green,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
