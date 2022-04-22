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
import { createSitesImageUrl } from "../../utils/imageUrls";
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

/**
 * @component
 * @param id optional string showing the id of the site/place
 * @param title sting title of the site
 * @param imageUrl sting url of the site's image
 * @param description sting description of the site
 * @param onPress function that should run on pressing the card
 * @param visited boolean showing if the user has visited the site
 * @description Component displaying the cards of the sites on the home screen, showing
 * image of the place for background and ImageButton with title and description, and onPress
 * redirects to place details
 */
export const PlaceCard: React.FC<CardProps> = (props: CardProps) => {
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
                uri: createSitesImageUrl(props.imageUrl),
                headers: {
                  Authorization: token,
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
