import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
import { windowWidth } from "../../utils/Dimensions";
import { createSitesImageUrl } from "../../utils/imageUrls";

type CarouselProps = {
  images: [];
};

const height = windowWidth * 0.6;
export const CustomImageCarousel = ({ images }: CarouselProps) => {
  // const imgUri =
  //   "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";
  // const img2 =
  //   "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";
  const [activeIndex, setIndex] = useState<number>(0);

  const token = useSelector((state: { user: UserState }) => state.user.token);
  // const images = [imgUri, img2, imgUri, img2];
  // console.log(images);
  return (
    <View style={styles.constainer}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.constainer}
        onScroll={({ nativeEvent }) => {
          const slide = Math.ceil(
            nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width
          );
          if (slide !== activeIndex) {
            setIndex(slide);
          }
        }}
      >
        {images.map((imageUrl: string, idx: number) => {
          return (
            <Image
              key={idx}
              source={{
                uri: createSitesImageUrl(imageUrl),
                headers: {
                  Authorization: token ? token : "",
                },
              }}
              style={styles.image}
            />
          );
        })}
      </ScrollView>
      <View style={styles.dotsContainer}>
        {images.map((_i, k) => (
          <Text
            key={k}
            style={{
              color: activeIndex === k ? "white" : "#888",
              fontSize: 20,
              margin: 3,
            }}
          >
            ●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  constainer: {
    width: windowWidth,
    height,
  },
  image: {
    width: windowWidth,
    height,
    resizeMode: "cover",
  },
  dotsContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
    margin: 3,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
