import React from "react";
import { View, StyleSheet, Platform } from "react-native";

interface CardProps {
  style?: {};
}

export const Card: React.FC<CardProps> = (props) => {
  return (
    <View style={[styles.card, props.style ? props.style : null]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: "white",
  },
});
