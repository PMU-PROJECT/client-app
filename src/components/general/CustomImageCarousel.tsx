import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { windowWidth } from "../../utils/Dimensions";
import { createImageUrl } from "../../utils/imageUrls";

type CarouselProps = {
  images: [];
};

export const CustomImageCarousel = ({ images }: CarouselProps) => {
  // const imgUri =
  //   "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";
  // const img2 =
  //   "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";
  const [activeIndex, setIndex] = useState<number>(0);

  const height = windowWidth * 0.6;
  // const images = [imgUri, img2, imgUri, img2];
  // console.log(images);
  return (
    <View
      style={{
        width: windowWidth,
        height,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width: windowWidth, height }}
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
              source={{ uri: createImageUrl(imageUrl) }}
              style={{
                width: windowWidth,
                height,
                resizeMode: "cover",
              }}
            />
          );
        })}
      </ScrollView>
      <View
        style={{
          flexDirection: "row",
          position: "absolute",
          bottom: 0,
          alignSelf: "center",
          margin: 3,
        }}
      >
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
  container: {
    flex: 1,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "center",
  },
});
