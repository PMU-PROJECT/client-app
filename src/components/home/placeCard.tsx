import React from "react";
import {
  ImageBackground,
  ImageSourcePropType,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
import { createImageUrl } from "../../utils/imageUrls";
import ImageButton from "./ImageButton";
import { VisitedBadge } from "./VisitedBadge";

type CardProps = {
  id?: string;
  title: string;
  imageUrl: string;
  description: string;
  onPress: Function; // onPress: ((event: GestureResponderEvent) => void) | undefined
  visited: boolean;
};

export const PlaceCard: React.FC<CardProps> = (props: CardProps) => {
  // https://reactnative.dev/img/tiny_logo.png
  const token = useSelector((state: { user: UserState }) => state.user.token);
  // const imgUri =
  //   "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";

  return (
    <TouchableOpacity
      style={{ alignItems: "center" }}
      onPress={() => {
        props.onPress();
      }}
    >
      <View style={styles.imageContainer}>
        <View style={styles.imageView}>
          <ImageBackground
            style={[styles.imageBg]}
            imageStyle={styles.image}
            source={
              {
                // velyanova-kushta.jpg
                uri: createImageUrl(props.imageUrl),
                // uri: imgUri,
                headers: {
                  Authorization: token,
                  // "da32e590530ed0d486effc634b76ef10b77c19b4e1bbbf55d6fe861de1c75c72b4c2c292de5c27c2d87a8d158e7f370a0f2975295ada6c841e8d87da7996c194feff402fab5ae4277adcc6cb",
                  //"fce8f2107973873ff4c90bb6d5a3a60a385f69327f106c8c5fcad19e7f3868545f697e58d1467d7efbd8ef43cca6f20670aa66f04042645e2d29da434bff9f49837c1ff2eb816a13459bfed3",
                },
              } as ImageSourcePropType
            }
          >
            {props.visited ? <VisitedBadge /> : null}
            {/* {props.vistited ? (
              <Image
              source={require("../../../assets/images/visited.png")}
              style={styles.imageVisited}
              />
            ) : null} */}
          </ImageBackground>
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
const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: "row",
    marginTop: 30,
  },

  imageView: {
    width: windowWidth / 2.4,
    height: windowHeight / 3.5,
    marginHorizontal: 10,
    borderRadius: 20,
  },

  image: {
    borderRadius: 20,
  },
  imageBg: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },

  imageVisited: {
    width: 150,
    height: 150,
    marginBottom: 25,
    transform: [{ rotate: "315deg" }],
  },
});
