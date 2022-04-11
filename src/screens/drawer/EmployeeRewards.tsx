import { StyleSheet, Text, View } from "react-native";
import { useSelector } from "react-redux";
import Scanner from "../../components/QR/scanner";
import { ColorSchema } from "../../constants/Colors";
import { DrawerNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";

export const EmployeeRewardsScreen =
  ({}: DrawerNavProps<"EmployeeRewards">) => {
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
        <Scanner type="reward" />
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
