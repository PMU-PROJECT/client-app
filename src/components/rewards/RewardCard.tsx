import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import { useSelector } from "react-redux";
import { ColorSchema, new_green } from "../../constants/Colors";
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
// const imgUri =
//   "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";
const img2 =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";

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
              selected && selected === id ? new_green : undefined,
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
        <View style={{ alignItems: "center" }}>
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
            numberOfLines={2}
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
    padding: 5,
  },
});
