import {
  Text,
  StyleSheet,
  View,
  Image,
  ImageBackground,
  TouchableOpacity,
  GestureResponderEvent,
  Platform,
} from "react-native";
import React from "react";
import { Card } from "../general/Card";

type CardProps = {
  id?: string;
  title: string;
  imageUrl: string;
  onPress: ((event: GestureResponderEvent) => void) | undefined;
};

export const PlaceCard: React.FC<CardProps> = (props: CardProps) => {
  // https://reactnative.dev/img/tiny_logo.png
  return (
    <View style={styles.gridItem}>
      <TouchableOpacity style={{ flex: 1 }} onPress={props.onPress}>
        <View style={styles.container}>
          <ImageBackground
            resizeMode="cover"
            style={styles.image}
            source={{ uri: props.imageUrl }}
          >
            <Text style={styles.title} numberOfLines={2}>
              placeCard
            </Text>
          </ImageBackground>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {},
  image: {
    width: "100%",
    height: "100%",

    flex: 1,
  },
  imageContainer: {},

  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    padding: 15,
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  title: {
    color: "white",
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "left",
    fontSize: 22,
  },
});
