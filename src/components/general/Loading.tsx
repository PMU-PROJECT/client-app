import { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";

export const Loading = () => {
  const { theme } = useContext(ColorContext);
  return (
    <View
      style={[
        styles.container,
        { alignItems: "center", justifyContent: "center" },
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Text
        style={[
          { fontSize: 25, fontWeight: "bold", textAlign: "center" },
          theme === "dark" ? styles.darkText : styles.lightText,
        ]}
      >
        Loading...
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  darkText: {
    color: ColorSchema.dark.text,
  },
  lightText: { color: ColorSchema.light.text },
  containerDark: { backgroundColor: ColorSchema.dark.background },
  containerLight: { backgroundColor: ColorSchema.light.background },
});
