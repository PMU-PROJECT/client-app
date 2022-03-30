import { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import QRCode from "react-native-qrcode-svg";
import { usePreventScreenCapture } from "expo-screen-capture";
import { useSelector } from "react-redux";
import { ColorSchema } from "../../constants/Colors";
import { ColorContext } from "../../navigation/RootNavigator";
import { PlacesNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";
import { getQRCode } from "../../utils/makeRequestToServer";
import { Loading } from "../../components/general/Loading";

export const QRCodeScreen = ({}: PlacesNavProps<"Home">) => {
  // const QR =
  //   "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAV4AAAFeAQAAAADlUEq3AAADE0lEQVR4Xu2ZMXbjMAxE4ZfCpY/go+ho0tF0FB/BpQs/YzEDyKaWVJKtd1BEAfnFYgQQIG3+e3va3yPfmODWBLcmuDXBrf0f8Mto4djVFwzfJj/543Kblnhw8kvwEMZ/vrzsHNSC8ZvN/jzfbVpeX4/LhggewKHltEBnA0xlHQJPHt7lZib4Wzgi9eJrROrZqXoE7DozUgX/AHvmMz2zoo50Flxw/EllQVHnWsGxwoYI7uGkXpCUOu8fnBQ8hN9GST8F+H5tJwW3k63OWUyuvpyesT96BewcAXvn/ih4BDuVnZHB0f0ZGhpsjI4HizNaQsEjOCj0eyd0MjajiqAqY4UpvsH5HamCxzAo6hyGoKzsZtyu/AaCexg7YkQjDxtRWqgsu+mk6MEEd3DpzAyGR2XR0CDXM7u7jyK4YOpcDU1RnpGaC+XXENzBiEZombFJSbMAowmMClOe4BEcVFQRvrNkpC7VwvDVMsEdXMqiptQjQjQjdYn34wSSiOAeNpQP9Hs4emQTOJfq+Q2aEBW8S9jYA43KIrvZwmAaxYQHXsHH8BMXK0vdSTWx6evMpVYeRAT3MOsGW+ULYtOrkzHozE4GVzCChzD+Q4+cOlc3/Q7RPMMJHsE0VN5HXufBy3cmR3ZHb/3RWfAeRjFBNOYDIzi1IbvTc8FjGFoin1FaUIdzY8zYpPhIecFDuH4322V3HkRS4FXwAQyDlpvA8Go8A7ZOIII7+IX7gK1VNvTPGITO23nEBB/AeTLLAgwQOqPtC9Xxs0Z4fEdwD2NjRDRiK5ypM3fEYDAN8bmE4AEMSeFUx4x3MHurK4NdTRG8h6klopFNIIpJ/SKEe4SKW8E9XMaqXIe3vOMLnfkNbH+xIPgNU0v0LtSZlEF1CJyv5mqCexgFgwdeTEcTGN00q8hHZ8FHMCikNfu9qilZo/kNsjMUfAzneAyEwFt2O8qx0xN8DEPL7Y7PELBX+PCyjRY8gDG4MDaR5CzOtUIleauz4AZGbBqnr7xtYWxGTSkvch1/Bffwb01wa4JbE9ya4NYEt/Zv8B9FHrJE9LM0FgAAAABJRU5ErkJggg==";
  usePreventScreenCapture();

  const { theme } = useContext(ColorContext);

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

    // setInterval(() => {
    if (loading === false) {
      generateNewQR();
    }
    // }, 30000);
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
              theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
          },
        ]}
      >
        <Text
          style={{
            color:
              theme === "dark" ? ColorSchema.dark.text : ColorSchema.light.text,
          }}
        >
          NO QR
        </Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor:
            theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background,
        },
      ]}
    >
      <QRCode
        value={token}
        backgroundColor={
          theme === "dark"
            ? ColorSchema.dark.background
            : ColorSchema.light.background
        }
        color={
          theme === "dark" ? ColorSchema.dark.text : ColorSchema.light.text
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
