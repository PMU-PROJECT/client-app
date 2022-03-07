import { createStackNavigator } from "@react-navigation/stack";
import { PlacesNavProps, PlacesParamList } from "./types";
import { HomeScreen } from "../screens/main/Home";
import { DetailsScreen } from "../screens/main/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { ColorContext } from "./RootNavigator";
import { ColorSchema } from "../constants/Colors";

const PlacesNavigator = createStackNavigator<PlacesParamList>();

export const PlacesStack: React.FC = (props) => {
  const { theme } = useContext(ColorContext);
  return (
    <PlacesNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({}) => ({
        headerTintColor:
          theme === "dark" ? ColorSchema.dark.text : ColorSchema.light.text,
        headerStyle: {
          backgroundColor: theme === "dark" ? "rgba(0,0,0,0.5)" : null,
          // border: theme === "dark" ? "none" : null,
          borderBottomWidth: theme === "dark" ? 0 : 1,
        },
      })}
    >
      <PlacesNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={
                theme === "dark"
                  ? ColorSchema.dark.text
                  : ColorSchema.light.text
              }
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        })}
      ></PlacesNavigator.Screen>
      <PlacesNavigator.Screen
        name="PlaceDetails"
        options={({ route }: PlacesNavProps<"PlaceDetails">) => ({
          headerTitle: `${route.params.id}`,
        })}
        component={DetailsScreen}
      ></PlacesNavigator.Screen>
    </PlacesNavigator.Navigator>
  );
};
