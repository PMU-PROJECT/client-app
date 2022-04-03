import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import Scanner from "../../components/QR/scanner";
import { ColorSchema } from "../../constants/Colors";
import { DrawerNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";

export const ScanQRScreen = ({}: DrawerNavProps<"ScanQR">) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <View
      style={[
        styles.container,
        theme && theme === "dark"
          ? styles.containerDark
          : styles.containerLight,
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
