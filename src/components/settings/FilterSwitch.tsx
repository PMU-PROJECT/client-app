import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ColorSchema, new_green } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";

type FilterSwitchProps = {
  label: string;
  state: boolean;
  onChange: ((value: boolean) => void | Promise<void>) | null | undefined;
};

export const FilterSwitch = (props: FilterSwitchProps) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  return (
    <View style={styles.filterContainer}>
      <Text
        style={[
          styles.title,
          theme === "dark" ? styles.textDark : styles.textLight,
        ]}
      >
        {props.label}
      </Text>
      <Switch
        trackColor={{
          true: new_green,
          false: ColorSchema.default.disabledButton,
        }}
        thumbColor={Platform.OS === "android" ? new_green : ""}
        value={props.state}
        onValueChange={props.onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 22,
    margin: 20,
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "80%",
    marginVertical: 15,
  },
  textDark: {
    color: ColorSchema.dark.text,
  },
  textLight: {
    color: ColorSchema.light.text,
  },
});
