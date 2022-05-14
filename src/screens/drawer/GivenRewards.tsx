import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ErrorMessage } from "../../components/general/ErrorMessage";
import { Loading } from "../../components/general/Loading";
import { RewardCard } from "../../components/rewards/RewardCard";
import { ColorSchema } from "../../constants/Colors";
import { GivenRewards } from "../../models/Rewards";
import { DrawerNavProps } from "../../navigation/types";
import { UserActions } from "../../store/actions/UserActions";
import { UserState } from "../../store/reducers/UserReducer";
import { getSelfInfo } from "../../utils/makeRequestToServer";

export const GivenRewardsScreen = ({}: DrawerNavProps<"GivenRewards">) => {
  const rewards: GivenRewards[] | null = useSelector(
    (state: { user: UserState }) => {
      if (state.user.user) {
        return state.user.user.given_rewards;
      } else return null;
    }
  );

  const token = useSelector((state: { user: UserState }) => state.user.token);
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setLoading(true);
    const refresh = async () => {
      if (!token) return;
      const userInfo = await getSelfInfo(token);
      if (userInfo !== null) {
        dispatch({
          type: UserActions.REFRESH_USER_INFO,
          payload: {
            userInfo: {
              ...userInfo,
            },
          },
        });
      }
    };

    refresh();
    setLoading(false);
  }, [token]);

  if (loading) {
    return <Loading />;
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
      {rewards && rewards.length > 0 ? (
        <FlatList
          style={{ marginTop: 25 }}
          keyExtractor={(item) => `${item.reward_id}`}
          renderItem={({ item }) => (
            <RewardCard
              id={item.reward_id}
              name={item.name}
              picture={item.picture}
              description={item.description}
            />
          )}
          data={rewards}
        />
      ) : (
        <ErrorMessage
          text={
            language === "en"
              ? "No rewards collected."
              : "Не сте получавали награди."
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
