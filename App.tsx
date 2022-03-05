import AppLoading from "expo-app-loading";
import React from "react";
import { StyleSheet } from "react-native";
import useCachedResources from "./src/hooks/useCachedResources";
import { RootNavigator } from "./src/navigation/RootNavigator";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return <RootNavigator />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
