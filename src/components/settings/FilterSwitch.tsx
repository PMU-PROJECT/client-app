import { Platform, StyleSheet, Switch, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";

type FilterSwitchProps = {
  label: string;
  state: boolean;
  onChange: ((value: boolean) => void | Promise<void>) | null | undefined;
};

/**
 * @component
 * @param label string with the label of switch
 * @param state boolean showing is the switch is flipped or not
 * @param onChange function to set the switch to new value
 * @description Custom component used for settings changes that
 * renders a Switch button with some text
 */
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
          true: ColorSchema.default.light_green,
          false: ColorSchema.default.disabledButton,
        }}
        thumbColor={
          Platform.OS === "android" ? ColorSchema.default.light_green : ""
        }
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
