import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";
import { ScalableText } from "../general/ScalableText";

/**
 * @component
 * @description Component used for showing the user that they have visited the site
 */
export const VisitedBadge: React.FC = () => {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  return (
    <View style={styles.container}>
      <Ionicons name="checkmark-circle-outline" size={22} color="white" />
      <ScalableText
        numberOfLines={2}
        styles={styles.text}
        fontSize={12}
        text={language && language === "en" ? "Visited" : "Посетено"}
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
    backgroundColor: ColorSchema.default.light_green,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
