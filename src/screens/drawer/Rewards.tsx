import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RewardCard } from "../../components/rewards/RewardCard";
import { ColorSchema } from "../../constants/Colors";
import { UserState } from "../../store/reducers/UserReducer";

export const RewardsScreen = () => {
  const theme = useSelector((state: { user: UserState }) => state.user.theme);
  const [selected, setSelected] = useState<null | 0>(null);

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
      <FlatList
        style={{ marginTop: 50 }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <RewardCard
            id={item.id}
            selected={selected}
            setSelected={setSelected}
          />
        )}
        data={[
          { id: 1, data: 1 },
          { id: 2, data: 2 },
          { id: 3, data: 3 },
          { id: 4, data: 4 },
          { id: 5, data: 5 },
        ]}
      />
      <FlatList
        style={{ marginTop: 50 }}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <RewardCard id={item.id} selected={selected} />
        )}
        data={[
          { id: 1, data: 1 },
          { id: 2, data: 2 },
          { id: 3, data: 3 },
          { id: 4, data: 4 },
          { id: 5, data: 5 },
        ]}
      />
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
