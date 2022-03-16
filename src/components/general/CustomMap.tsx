import React from "react";
import MapView from "react-native-maps";
import { Dimensions, StyleSheet, View } from "react-native";
import { Marker } from "react-native-maps";
// import Geolocation from "react-native-geolocation-service";

type MapProps = {
  latitude: number;
  longitude: number;
  markerTitle: string;
  markerDesc: string;
  width?: number;
  height?: number;
};

const { width, height } = Dimensions.get("window");

// const SCREEN_HEIGHT = height;
// const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export const CustomMap: React.FC<MapProps> = ({
  latitude,
  longitude,
  markerTitle,
  markerDesc,
  width,
  height,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        // initialRegion={{
        //   latitude,
        //   longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        region={{
          latitude,
          longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={[
          styles.map,
          {
            width: width !== 0 ? width : 300,
            height: height !== 0 ? height : 300,
          },
        ]}
      >
        <Marker
          key={1}
          coordinate={{
            latitude,
            longitude,
          }}
          title={markerTitle}
          description={markerDesc}
        />
        <Marker
          key={2}
          coordinate={{
            latitude: latitude + 5,
            longitude: longitude + 5,
          }}
          title={markerTitle}
          description={markerDesc}
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {},
});
