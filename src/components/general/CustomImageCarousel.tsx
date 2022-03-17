import React, { useState } from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

type CarouselProps = {
  images: [];
};

export const CustomImageCarousel = ({}: CarouselProps) => {
  const imgUri =
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";
  const img2 =
    "https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg";
  const [activeIndex, setIndex] = useState<number>(0);

  const { width } = Dimensions.get("window");
  const height = width * 0.6;
  const images = [imgUri, img2, imgUri, img2];

  return (
    <View
      style={{
        marginVertical: 50,
        width,
        height,
      }}
    >
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ width, height }}
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
              source={{ uri: imageUrl }}
              style={{
                width,
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
            {/* • */}●
          </Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
