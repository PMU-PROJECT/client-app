import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import { new_green } from "../../constants/Colors";

type CategoryProps = {
  index: number;
  onSelect: Function;
  selectedIdx: number;
  item: string;
};

export const Categories: React.FC<CategoryProps> = ({
  index,
  item,
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
        {item.toUpperCase()}
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
    color: new_green,
    paddingBottom: 5,
    borderBottomWidth: 2,
    borderColor: new_green,
  },
});
