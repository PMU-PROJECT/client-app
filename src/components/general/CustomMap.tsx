import React, { LegacyRef, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { Platform, StyleSheet, Text, View } from "react-native";
import { windowHeight, windowWidth } from "../../utils/Dimensions";
// import Geolocation from "react-native-geolocation-service";

type MapProps = {
  userLatitude?: number;
  userLongitude?: number;
  markerLatitude: number;
  markerLongitude: number;
  markerTitle: string;
  markerDesc: string;
  width?: number | string;
  height?: number | string;
};

const ASPECT_RATIO = windowWidth / windowHeight;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

/**
 * @component
 * @param userLatitude optional number showing user's latitude
 * @param userLongitude optional number showing user's longitude
 * @param markerLatitude number showing site's longitude
 * @param markerLongitude number showing site's longitude
 * @param markerTitle strinfg title for the marker on the map
 * @param markerDesc strinfg description for the marker on the map
 * @param width number or string showing the width of the map
 * @param height number or string showing the height of the map
 * @description Custom Map using MapView from react-native-maps to show marker of the site's location
 * and also show location of the current user if he give permision to the app
 */
export const CustomMap: React.FC<MapProps> = ({
  userLatitude,
  userLongitude,
  markerLatitude,
  markerLongitude,
  markerTitle,
  markerDesc,
  width,
  height,
}) => {
  const map: LegacyRef<MapView> = useRef(null);

  // const onZoomInPress = () => {
  //   if (map === undefined) return;
  //   map.current?.getCamera().then((cam: Camera) => {
  //     cam.zoom += 1;
  //     map?.current?.animateCamera(cam);
  //   });
  // };

  // console.log(userLatitude, userLongitude);
  // console.log(markerLatitude, markerLongitude);

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
        maxZoomLevel={15}
        region={{
          latitude: userLatitude ? userLatitude : markerLatitude,
          longitude: userLongitude ? userLongitude : markerLongitude,
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
        {/* <TouchableOpacity
          style={{ position: "absolute", bottom: 400, left: 0 }}
          onPress={onZoomInPress}
        ></TouchableOpacity> */}
        {Platform.OS !== "web" ? (
          <>
            <Marker
              key={1}
              coordinate={{
                latitude: markerLatitude,
                longitude: markerLongitude,
              }}
              title={markerTitle}
              description={markerDesc}
            />
            {/* {userLatitude && userLongitude ? (
              <Marker
                pinColor="blue"
                key={2}
                coordinate={{
                  latitude: userLatitude,
                  longitude: userLongitude,
                }}
                // icon={require("../../../assets/images/user-profile.png")}
              />
            ) : null} */}
          </>
        ) : (
          <View>
            <Text>Web</Text>
          </View>
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
