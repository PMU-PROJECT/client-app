import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ColorContext } from "../../navigation/RootNavigator";
import { ColorSchema, new_green } from "../../constants/Colors";

export const CustomDrawer = (props: any) => {
  const { theme } = useContext(ColorContext);
  return (
    <View style={{ flex: 1, padding: 0 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          theme === "dark"
            ? styles.contentContainerDark
            : styles.contentContainerLight
        }
      >
        {/* <LinearGradient
          colors={[
            ColorSchema.default.success,
            ColorSchema.light.formButton,
            ColorSchema.dark.dark_green_alpha,
          ]}
          start={[2, 2]}
          end={{ x: 1, y: 0 }}
        ></LinearGradient> */}
        {/* <ImageBackground
          source={require("../../../assets/images/Vine.jpg")}
        ></ImageBackground> */}
        <View
          style={[
            styles.userInfoContainer,
            {
              backgroundColor:
                theme === "light" ? new_green : ColorSchema.light.formButton,
              borderBottomColor: theme === "light" ? "black" : "none",
              borderBottomWidth: theme === "light" ? 1 : 0,
            },
          ]}
        >
          <Image
            source={require("../../../assets/images/user-profile.png")}
            style={styles.profilePic}
          />
          <Text
            style={[
              styles.usernameText,
              theme === "dark" ? styles.textDark : styles.textLight,
            ]}
          >
            User Names
          </Text>
        </View>
        <View
          style={
            theme === "dark"
              ? styles.itemsContainerDark
              : styles.itemsContainerLight
          }
        >
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={[
          styles.bottomItems,
          {
            backgroundColor:
              theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {}}
          style={{
            paddingVertical: 15,
          }}
        >
          <View
            style={[
              styles.item,
              {
                backgroundColor:
                  theme === "dark"
                    ? ColorSchema.default.disabledButton
                    : ColorSchema.light.background,
                padding: 12,
                borderRadius: 4,
              },
            ]}
          >
            <Ionicons
              name="exit-outline"
              size={24}
              color={
                theme === "dark"
                  ? ColorSchema.default.disabled
                  : ColorSchema.light.text
              }
            />
            <Text
              style={[
                styles.itemTitle,
                theme === "dark"
                  ? { color: ColorSchema.default.disabled }
                  : styles.textLight,
              ]}
            >
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainerDark: {
    paddingTop: 0,
    backgroundColor: ColorSchema.default.formButtonAlpha,
  },
  contentContainerLight: {
    paddingTop: 0,
    backgroundColor: ColorSchema.light.background,
  },
  profilePic: {
    height: 80,
    width: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  usernameText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    marginLeft: 20,
  },
  textDark: {
    color: ColorSchema.dark.text,
  },
  textLight: {
    color: ColorSchema.light.text,
  },
  itemsContainerDark: {
    flex: 1,
    backgroundColor: ColorSchema.dark.background,
    paddingTop: 10,
  },
  itemsContainerLight: {
    flex: 1,
    backgroundColor: ColorSchema.light.background,
    paddingTop: 10,
  },
  bottomItems: {
    padding: 5,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemTitle: {
    fontSize: 15,
    marginLeft: 10,
    fontWeight: "500",
    color: "rgba(28, 28, 30, 0.68)",
  },
  userInfoContainer: {
    padding: 20,
    margin: 0,
    flexDirection: "row",
    alignItems: "center",
  },
});
