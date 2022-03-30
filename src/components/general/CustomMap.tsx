import React, { LegacyRef, useRef } from "react";
import MapView, { Camera } from "react-native-maps";
import {
  Button,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Marker, Polyline } from "react-native-maps";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
// import Geolocation from "react-native-geolocation-service";

type MapProps = {
  latitude: number;
  longitude: number;
  markerTitle: string;
  markerDesc: string;
  width?: number | string;
  height?: number | string;
};

// const SCREEN_HEIGHT = height;
// const SCREEN_WIDTH = width;
const ASPECT_RATIO = windowWidth / windowHeight;
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
  const map: LegacyRef<MapView> = useRef(null);

  const onZoomInPress = () => {
    map?.current?.getCamera().then((cam: Camera) => {
      cam.zoom += 1;
      map?.current?.animateCamera(cam);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={map}
        // initialRegion={{
        //   latitude,
        //   longitude,
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,
        // }}
        showsUserLocation={true}
        minZoomLevel={1}
        maxZoomLevel={1}
        region={{
          latitude,
          longitude,
          latitudeDelta: 0.3822,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={[
          styles.map,
          {
            width: width !== 0 ? width : windowWidth,
            height: height !== 0 ? height : 300,
          },
        ]}
      >
        <TouchableOpacity
          style={{ position: "absolute", bottom: 400, left: 0 }}
          onPress={onZoomInPress}
        ></TouchableOpacity>
        {Platform.OS !== "web" ? (
          <>
            {/* <Marker
              key={1}
              coordinate={{
                latitude,
                longitude,
              }}
              title={markerTitle}
              description={markerDesc}
            /> */}
            {/* <Marker
              key={2}
              coordinate={{
                latitude: 41.970035,
                longitude: 23.477082,
              }}
              title={markerTitle}
              description={markerDesc}
            /> */}
          </>
        ) : (
          <Text>Web</Text>
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  map: {},
});
