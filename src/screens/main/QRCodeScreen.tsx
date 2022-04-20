import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { usePreventScreenCapture } from "expo-screen-capture";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { PlacesNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";
import { getQRCode } from "../../utils/makeRequestToServer";
import { Loading } from "../../components/general/Loading";
import { ErrorMessage } from "../../components/general/ErrorMessage";

export const QRCodeScreen = ({}: PlacesNavProps<"Home">) => {
  usePreventScreenCapture();
  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  const [token, setToken] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  // const [token, setToken] = useState<null | boolean>(null);

  const userToken = useSelector(
    (state: { user: UserState }) => state.user.token
  );

  useEffect(() => {
    if (!userToken) return;

    const generateNewQR = async () => {
      setLoading(true);
      const id_token = await getQRCode(userToken);
      if (id_token !== null || id_token !== undefined) {
        // console.log(res);
        setToken(id_token);
      }
      setLoading(false);
    };

    generateNewQR();
    setInterval(() => {
      if (loading === false) {
        generateNewQR();
      }
    }, 20000);
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (!token) {
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
        <ErrorMessage text="No QR" />
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
      <QRCode
        value={token}
        backgroundColor={
          theme && theme === "dark"
            ? ColorSchema.dark.background
            : ColorSchema.light.background
        }
        color={
          theme && theme === "dark"
            ? ColorSchema.dark.text
            : ColorSchema.light.text
        }
        size={250}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerDark: { backgroundColor: ColorSchema.dark.background },
  containerLight: { backgroundColor: ColorSchema.light.background },
});
