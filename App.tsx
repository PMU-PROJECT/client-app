import AppLoading from "expo-app-loading";
import React from "react";
import { AppRegistry, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store/RootReducer";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
