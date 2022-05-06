import React, { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";
import { windowWidth } from "../../utils/Dimensions";
import { createSitesImageUrl } from "../../utils/imageUrls";

type CarouselProps = {
  images: [];
};

const height = windowWidth * 0.6;

/**
 * @component
 * @param images array of image urls
 * @description Image Carousel Component that takes array of urls and displays
 * and returns an image slider
 */
export const CustomImageCarousel = ({ images }: CarouselProps) => {
  const token = useSelector((state: { user: UserState }) => state.user.token);
  const [activeIndex, setIndex] = useState<number>(0);

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
              color: activeIndex === k ? ColorSchema.light.background : "#888",
              fontSize: 20,
              margin: 3,
            }}
          >
            •
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
    color: ColorSchema.light.background,
    fontSize: 18,
    textAlign: "center",
  },
});
