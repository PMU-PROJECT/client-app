import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { ColorSchema, new_green } from "../../constants/Colors";
// import { useNavigation, useRoute } from "@react-navigation/native";
import { ColorContext } from "../../navigation/RootNavigator";

type HeaderButtonProps = {
  active: "all" | "visited" | "other";
  setActive: React.Dispatch<React.SetStateAction<"all" | "visited" | "other">>;
};

export const HeaderSelectorButtons: React.FC<HeaderButtonProps> = ({
  active,
  setActive,
}) => {
  const { theme } = useContext(ColorContext);

  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <TouchableOpacity
        style={[active === "all" ? styles.buttonActive : styles.buttonOther]}
        onPress={() => {
          setActive("all");
        }}
      >
        <Text style={[styles.title]}>All Sites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          active === "visited" ? styles.buttonActive : styles.buttonOther,
        ]}
        onPress={() => {
          setActive("visited");
        }}
      >
        <Text style={[styles.title]}>Vistied</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[active === "other" ? styles.buttonActive : styles.buttonOther]}
        onPress={() => {
          setActive("other");
        }}
      >
        <Text style={[styles.title]}>Not Visited</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 20,
    justifyContent: "space-evenly",
    borderRadius: 22,
  },
  containerLight: {
    backgroundColor: ColorSchema.default.disabledButton,
  },
  containerDark: {
    backgroundColor: "#000",
    borderColor: ColorSchema.default.dark_green_alpha,
    borderWidth: 2,
  },
  title: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  titleDark: {
    color: ColorSchema.dark.text,
  },
  titleLight: {
    color: ColorSchema.light.text,
  },
  buttonActive: {
    backgroundColor: new_green,
    width: "34%",
    color: "#fff",
    height: 40,
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  buttonOther: {
    width: "33%",
    color: ColorSchema.light.text,
    height: 40,
    textAlign: "center",
    justifyContent: "space-evenly",
    borderRadius: 10,
  },
  buttonLeft: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  buttonRight: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
});
