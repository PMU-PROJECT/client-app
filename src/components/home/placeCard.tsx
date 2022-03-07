import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import ImageButton from "./ImageButton";

type CardProps = {
  id?: string;
  title: string;
  imageUrl: string;
  description: string;
  onPress: Function; // onPress: ((event: GestureResponderEvent) => void) | undefined
};

export const PlaceCard: React.FC<CardProps> = (props: CardProps) => {
  // https://reactnative.dev/img/tiny_logo.png
  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        props.onPress();
      }}
    >
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image source={{ uri: props.imageUrl }} style={styles.image} />
          <ImageButton
            onPress={() => {
              props.onPress();
            }}
            title={props.title}
            description={props.description}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};
const { width, height } = Dimensions.get("screen");
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginTop: 30,
  },

  imageView: {
    width: width / 2.4,
    height: height / 3.5,
    marginHorizontal: 10,
  },

  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
});
