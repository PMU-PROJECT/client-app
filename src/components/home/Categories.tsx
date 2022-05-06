import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { ColorSchema } from "../../constants/Colors";

type CategoryProps = {
  index: number;
  onSelect: Function;
  selectedIdx: number;
  title: string;
};

/**
 * @component
 * @param index number showing items index
 * @param onSelect Function to be fired when new item is selected
 * @param selectedIdx number showing the index of new selected element
 * @param title string title of the category
 * @description Component used for containing the categories data on the main screen
 */
export const Categories: React.FC<CategoryProps> = ({
  index,
  title,
  onSelect,
  selectedIdx,
}) => {
  return (
    <TouchableOpacity
      key={index}
      activeOpacity={0.8}
      onPress={() => onSelect(index)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedIdx === index && styles.categoryTextSelected,
        ]}
      >
        {title.toUpperCase()}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  categoryText: {
    fontSize: 16,
    color: "grey",
    fontWeight: "bold",
  },
  categoryTextSelected: {
    color: ColorSchema.default.light_green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: ColorSchema.default.light_green,
  },
});
