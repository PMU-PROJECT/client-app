import React, { useState } from "react";
import { Image, SafeAreaView, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";

type CarouselProps = {
  images: [];
};

export const ImageCarousel = ({}: CarouselProps) => {
  const imgUri =
    "https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg";
  const [_activeIndex, setIndex] = useState<number>(0);

  const _renderItem = ({ item }: { item: { title: string; text: string } }) => {
    return (
      <View style={styles.imageView}>
        <Image source={{ uri: imgUri }} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "rebeccapurple", paddingVertical: 50 }}
    >
      <View style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
        <Carousel
          layout={"default"}
          // ref={(ref) => (this.carousel = ref)}
          data={[
            {
              title: "Item 1",
              text: "Text 1",
            },
            {
              title: "Item 2",
              text: "Text 2",
            },
            {
              title: "Item 3",
              text: "Text 3",
            },
            {
              title: "Item 4",
              text: "Text 4",
            },
            {
              title: "Item 5",
              text: "Text 5",
            },
          ]}
          sliderWidth={300}
          itemWidth={300}
          renderItem={_renderItem}
          onSnapToItem={(index: number) => setIndex(index)}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 20,
  },
  imageView: {
    width: 280,
    height: 250,
    marginHorizontal: 10,
  },
});
