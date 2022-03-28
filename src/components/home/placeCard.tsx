import React from "react";
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
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
  console.log(props.imageUrl);
  const token = useSelector((state: { user: UserState }) => state.user.token);

  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        props.onPress();
      }}
    >
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <Image
            source={
              {
                // velyanova-kushta.jpg
                uri: `http://0af1-78-90-52-121.eu.ngrok.io/imageserver/tourist_sites?name=${props.imageUrl}`,
                headers: {
                  Authorization: token,
                  // "da32e590530ed0d486effc634b76ef10b77c19b4e1bbbf55d6fe861de1c75c72b4c2c292de5c27c2d87a8d158e7f370a0f2975295ada6c841e8d87da7996c194feff402fab5ae4277adcc6cb",
                  //"fce8f2107973873ff4c90bb6d5a3a60a385f69327f106c8c5fcad19e7f3868545f697e58d1467d7efbd8ef43cca6f20670aa66f04042645e2d29da434bff9f49837c1ff2eb816a13459bfed3",
                },
              } as ImageSourcePropType
            }
            style={styles.image}
          />
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
