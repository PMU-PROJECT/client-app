import React, { useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { ErrorMessage } from "../../components/general/ErrorMessage";
import { RewardCard } from "../../components/rewards/RewardCard";
import { ColorSchema, new_green } from "../../constants/Colors";
import { DrawerNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";

export const EligibleRewardsScreen = ({
  route,
}: DrawerNavProps<"EligibleRewards">) => {
  // const rewards: EligibleRewards[] | null = useSelector(
  //   (state: { user: UserState }) => {
  //     if (state.user.user) {
  //       return state.user.user.eligible_rewards;
  //     } else return null;
  //   }
  // );

  const rewards = route.params.rewards;
  // const token = useSelector((state: { user: UserState }) => state.user.token);

  const canReward: boolean = useSelector((state: { user: UserState }) => {
    if (state.user.user) {
      if (state.user.user.employeeInfo) {
        return true;
      }
    }
    return false;
  });
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const [selected, setSelected] = useState<null | number>(null);

  const giveReward = async () => {
    // console.log(selected);
    if (selected === null) {
      Alert.alert("Error!", "Not Selected Reward.", [{ text: "Okay" }]);
    } else {
      Alert.alert("Yay!", `Selected ${selected}`, [{ text: "Okay" }]);
    }
  };

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
      {canReward ? (
        <>
          <FlatList
            style={{ marginTop: 25 }}
            keyExtractor={(item) => `${item.reward_id}`}
            renderItem={({ item }) => (
              <RewardCard
                id={item.reward_id}
                name={item.name}
                picture={item.picture}
                description={item.description}
                setSelected={setSelected}
                selected={selected}
              />
            )}
            data={rewards}
          />

          <View
            style={{
              alignItems: "flex-end",
              marginHorizontal: 25,
              marginVertical: 10,
            }}
          >
            {/* <Image
          source={{
            uri: "http://0af1-78-90-52-121.eu.ngrok.io/imageserver/rewards?name=pride_and_accomplishment.jpg",
            headers: {
              Authorization:
                "c37dfed08ae797ecb6b8c88b310c305f890558f2a189ff455d5b6559979b5a275d5df9866ebf15eb9e5ccab85755ec6bd39ffcd717824c2a8b272dcbf6985e3118c63bc720380dac43002ffd",
            },
          }}
          style={{ width: 50, height: 50 }}
        /> */}

            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                backgroundColor: new_green,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 15,
              }}
              onPress={async () => {
                await giveReward();
              }}
            >
              <Text>
                {language && language === "en" ? "Give Reward" : "Дай Награда"}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <ErrorMessage
          text={
            language === "en"
              ? "Sorry. Cannot give rewards!"
              : "Нямате позволение да давате награди!"
          }
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
});
