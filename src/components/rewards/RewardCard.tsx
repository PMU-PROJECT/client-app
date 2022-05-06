import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";
import { windowWidth } from "../../utils/Dimensions";
import { ScalableText } from "../general/ScalableText";
import { createRewardsImageUrl } from "../../utils/imageUrls";

type RewardCardProps = {
  id: number;
  picture: string;
  description: string;
  name: string;
  selected?: number | null;
  setSelected?: Function;
};

/**
 * @component
 * @param id index number of the reward
 * @param picture string of the image url
 * @param description string description of the reward
 * @param name string with the name of the reward
 * @param selected optional boolean to show if reward is selected
 * @param setSelected optional function to set the index of the selected reward
 * @description Component use for showing the reward card with some optional
 * variables for employees that are use for selecting a reward to give to user
 */
export const RewardCard: React.FC<RewardCardProps> = ({
  id,
  description,
  name,
  picture,
  selected,
  setSelected,
}) => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const token = useSelector((state: { user: UserState }) => state.user.token);

  return (
    <TouchableOpacity
      onPress={() => {
        if (setSelected) {
          setSelected(id);
        }
      }}
    >
      <View
        style={[
          {
            backgroundColor:
              selected && selected === id
                ? ColorSchema.default.light_green
                : undefined,
          },
          styles.container,
        ]}
      >
        {setSelected ? (
          <Checkbox
            disabled={false}
            value={selected && selected === id ? true : false}
            onValueChange={() => {
              if (setSelected) {
                setSelected(selected);
              }
            }}
          />
        ) : null}
        <Image
          source={{
            uri: createRewardsImageUrl(picture),
            headers: {
              Authorization: token ? token : "",
            },
          }}
          style={styles.image}
        />
        <View style={{ alignItems: "center", width: "80%" }}>
          <Text
            style={[
              {
                fontSize: 16,
              },
              theme === "dark" ? styles.textDark : styles.textLight,
            ]}
          >
            {name}
          </Text>
          <ScalableText
            fontSize={16}
            text={description}
            numberOfLines={4}
            styles={[theme === "dark" ? styles.textDark : styles.textLight]}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textDark: {
    color: ColorSchema.dark.text,
  },
  textLight: {
    color: ColorSchema.light.text,
  },
  image: {
    width: 55,
    height: 55,
    borderRadius: 10,
    marginHorizontal: 8,
  },
  container: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: 20,
    width: windowWidth,
    padding: 10,
  },
});
