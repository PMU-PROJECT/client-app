import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import Scanner from "../../components/QR/scanner";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { DrawerNavProps } from "../../navigation/types";

export const ScanQRScreen = ({}: DrawerNavProps<"ScanQR">) => {
  const { theme } = useContext(ColorContext);
  return (
    <View
      style={[
        styles.container,
        theme === "dark" ? styles.containerDark : styles.containerLight,
      ]}
    >
      <Scanner />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: {
    backgroundColor: ColorSchema.dark.background,
  },
  containerLight: {
    backgroundColor: ColorSchema.light.background,
  },
});
