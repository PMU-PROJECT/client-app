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
import { ColorSchema } from "../../constants/Colors";
import { EmployeeInfo } from "../../models/UserInfo";
import { DrawerNavProps } from "../../navigation/types";
import { UserState } from "../../store/reducers/UserReducer";
import { giveRewards } from "../../utils/makeRequestToServer";

export const EmployeeRewardsScreen = ({
  route,
}: DrawerNavProps<"EmployeeRewards">) => {
  // const rewards: EligibleRewards[] | null = useSelector(
  //   (state: { user: UserState }) => {
  //     if (state.user.user) {
  //       return state.user.user.eligible_rewards;
  //     } else return null;
  //   }
  // );

  const rewards = route.params.rewards;
  const token_id = route.params.token_id;
  const token = useSelector((state: { user: UserState }) => state.user.token);

  const canReward: boolean = useSelector((state: { user: UserState }) => {
    if (state.user.user) {
      const employeeInfo: EmployeeInfo | null = state.user.user.employeeInfo;
      if (employeeInfo) {
        if (employeeInfo.can_reward && employeeInfo.can_reward === true) {
          return true;
        } else {
          return false;
        }
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
    if (!token_id) return;
    // console.log(selected);
    if (selected === null) {
      Alert.alert("Error!", "Not Selected Reward.", [{ text: "Okay" }]);
    } else {
      // Alert.alert("Yay!", `Selected ${selected}`, [{ text: "Okay" }]);
      if (token) {
        const res = await giveRewards(token, token_id, selected);
        if (res !== null) {
          Alert.alert("Yay!", `${res}`, [{ text: "Okay" }]);
        }
      }
    }
  };

  if (rewards.length === 0) {
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
        <ErrorMessage text="No Rewards!" />
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
            <TouchableOpacity
              style={{
                width: 150,
                height: 55,
                backgroundColor: ColorSchema.default.light_green,
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
  },
  title: {
    textAlign: "center",
    fontSize: 24,
  },
});
