import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TouchableOpacity,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { ColorSchema, new_green } from "../../constants/Colors";
import { useSelector } from "react-redux";
import { UserState } from "../../store/reducers/UserReducer";
import { getRewards, receiveStamp } from "../../utils/makeRequestToServer";
import { ScalableText } from "../general/ScalableText";

type ScannerProps = {
  type: "stamp" | "reward";
  // navigation: StackNavigationProp<
  //   DrawerParamList,
  //   "EmployeeRewards" | "ScanQR"
  // >;
};

export default function Scanner({ type }: ScannerProps) {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  const token = useSelector((state: { user: UserState }) => state.user.token);

  const [hasPermission, setHasPermission] = useState<null | boolean>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [text, setText] = useState("Not yet scanned");

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  useEffect(() => {
    askForCameraPermission();
  }, []);

  const handleBarCodeScanned = async (params: {
    type: number;
    data: string;
  }) => {
    setScanned(true);
    setText(params.data);
    // console.log("Type: " + params.type + "\nData: " + params.data);

    if (params.type === 256) {
      if (type === "stamp") {
        const res = await receiveStamp(token!, params.data);
      } else if (type === "reward") {
        const res = await getRewards(token!, params.data);
      }
    } else {
      Alert.alert("Invalid Scan!", "Please scan a valid QR code!", [
        { text: "Okay" },
      ]);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <TouchableOpacity
          onPress={() => {}}
          style={{
            backgroundColor: ColorSchema.default.dark_green_alpha,
            padding: 10,
            width: 100,
            borderRadius: 20,
          }}
        >
          <ScalableText
            fontSize={18}
            numberOfLines={2}
            styles={{
              color: "#fff",
              textAlign: "center",
            }}
            text={"Allow Camera"}
          />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme && theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background,
        },
      ]}
    >
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : (handleBarCodeScanned as any)}
          style={{ height: 600, width: 600 }}
        />
      </View>
      <Text
        style={[
          styles.maintext,
          {
            color:
              theme && theme === "dark"
                ? ColorSchema.dark.text
                : ColorSchema.light.text,
          },
        ]}
      >
        {text}
      </Text>

      {scanned && (
        <Button
          title={
            language && language === "en" ? "Scan Again" : "Сканирай отново"
          }
          onPress={() => setScanned(false)}
          color={
            theme && theme === "dark"
              ? ColorSchema.default.dark_green
              : new_green
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 400,
    width: 400,
    overflow: "hidden",
    borderRadius: 30,
  },
});
