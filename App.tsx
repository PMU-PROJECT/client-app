import React from "react";
import { Provider } from "react-redux";
import useCachedResources from "./src/hooks/useCachedResources";
import { RootNavigator } from "./src/navigation/RootNavigator";
import { store } from "./src/store/RootReducer";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  }

  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}
