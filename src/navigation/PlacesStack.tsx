import { createStackNavigator } from "@react-navigation/stack";
import { PlacesNavProps, PlacesParamList } from "./types";
import { HomeScreen } from "../screens/main/Home";
import { DetailsScreen } from "../screens/main/DetailsScreen";
import { Ionicons } from "@expo/vector-icons";

const PlacesNavigator = createStackNavigator<PlacesParamList>();

export const PlacesStack: React.FC = (props) => {
  return (
    <PlacesNavigator.Navigator initialRouteName="Home">
      <PlacesNavigator.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="menu"
              size={24}
              color="black"
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
