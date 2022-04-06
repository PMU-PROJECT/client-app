import { createStackNavigator } from "@react-navigation/stack";
import { PlacesNavProps, PlacesParamList } from "./types";
import { HomeScreen } from "../screens/main/Home";
import { DetailsScreen } from "../screens/main/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";
import { ColorSchema } from "../constants/Colors";
import { useSelector } from "react-redux";
import { UserState } from "../store/reducers/UserReducer";

const PlacesNavigator = createStackNavigator<PlacesParamList>();

export const PlacesStack: React.FC = () => {
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <PlacesNavigator.Navigator
      initialRouteName="Home"
      screenOptions={({}) => ({
        headerTintColor:
          theme && theme === "dark"
            ? ColorSchema.dark.text
            : ColorSchema.light.text,
        headerStyle: {
          backgroundColor:
            theme && theme === "dark"
              ? ColorSchema.dark.background
              : ColorSchema.light.background,
          borderBottomWidth: theme && theme === "dark" ? 1 : 1,
          borderBottomColor: theme && theme === "dark" ? "grey" : "grey",
        },
      })}
    >
      <PlacesNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          title: language && language === "en" ? "Home" : "Начало",
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color={
                theme && theme === "dark"
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
          headerTitle: `${route.params.title}`,
        })}
        component={DetailsScreen}
      ></PlacesNavigator.Screen>
    </PlacesNavigator.Navigator>
  );
};
