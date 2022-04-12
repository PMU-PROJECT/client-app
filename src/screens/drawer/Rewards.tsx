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
import { RewardCard } from "../../components/rewards/RewardCard";
import { ColorSchema, new_green } from "../../constants/Colors";
import { EligibleRewards } from "../../models/Rewards";
import { UserState } from "../../store/reducers/UserReducer";

export const RewardsScreen = () => {
  const rewards: EligibleRewards[] | null = useSelector(
    (state: { user: UserState }) => {
      if (state.user.user) {
        return state.user.user.eligible_rewards;
      } else return null;
    }
  );
  const isEmployee: boolean = useSelector((state: { user: UserState }) => {
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
      {isEmployee ? (
        <FlatList
          style={{ marginTop: 25 }}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <RewardCard
              id={item.id}
              setSelected={setSelected}
              selected={selected}
            />
          )}
          data={
            rewards && rewards.length !== 0
              ? rewards
              : ([
                  { id: 1, data: 1 },
                  { id: 2, data: 2 },
                  { id: 3, data: 3 },
                  { id: 4, data: 4 },
                  { id: 5, data: 5 },
                  { id: 6, data: 6 },
                  { id: 7, data: 7 },
                  { id: 8, data: 8 },
                  { id: 9, data: 9 },
                  { id: 10, data: 10 },
                  { id: 11, data: 11 },
                ] as any)
          }
        />
      ) : (
        <FlatList
          style={{ marginTop: 25 }}
          keyExtractor={(item) => `${item.id}`}
          renderItem={({ item }) => (
            <RewardCard id={item.id} selected={selected} />
          )}
          data={
            rewards && rewards.length !== 0
              ? rewards
              : ([
                  { id: 1, data: 1 },
                  { id: 2, data: 2 },
                  { id: 3, data: 3 },
                  { id: 4, data: 4 },
                  { id: 5, data: 5 },
                ] as any)
          }
        />
      )}
      <View
        style={{
          alignItems: "flex-end",
          marginHorizontal: 25,
          marginVertical: 10,
        }}
      >
        {isEmployee ? (
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
        ) : null}
      </View>
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
