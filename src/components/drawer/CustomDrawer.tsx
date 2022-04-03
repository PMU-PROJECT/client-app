import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { ColorSchema } from "../../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import { UserActions } from "../../store/actions/UserActions";
import { UserState } from "../../store/reducers/UserReducer";
import { ScalableText } from "../general/ScalableText";

export const CustomDrawer = (props: any) => {
  const dispatch = useDispatch();
  const user = useSelector((state: { user: UserState }) => state.user.user);
  const language = useSelector(
    (state: { user: UserState }) => state.user.language
  );

  const theme = useSelector((state: { user: UserState }) => state.user.theme);

  return (
    <View style={{ flex: 1, padding: 0 }}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={
          theme && theme === "dark"
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
                theme && theme === "dark"
                  ? ColorSchema.default.disabledButton
                  : ColorSchema.light.background,
              borderBottomColor: theme && theme === "light" ? "black" : "none",
              borderBottomWidth: theme && theme === "light" ? 1 : 0,
            },
          ]}
        >
          <Image
            source={require("../../../assets/images/user-profile.png")}
            style={styles.profilePic}
          />
          <ScalableText
            fontSize={18}
            text={user ? `${user.firstName} ${user.lastName}` : "User Names"}
            styles={{
              fontWeight: "bold",
              marginBottom: 5,
              marginLeft: 20,
              color:
                theme && theme === "dark"
                  ? ColorSchema.dark.text
                  : ColorSchema.light.text,
            }}
            numberOfLines={2}
          />
        </View>
        <View
          style={
            theme && theme === "dark"
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
              theme && theme === "dark"
                ? ColorSchema.dark.background
                : ColorSchema.light.background,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            dispatch({ type: UserActions.LOGOUT });
          }}
          style={{
            paddingVertical: 15,
          }}
        >
          <View
            style={[
              styles.item,
              {
                backgroundColor:
                  theme && theme === "dark"
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
                theme && theme === "dark"
                  ? ColorSchema.default.disabled
                  : ColorSchema.light.text
              }
            />
            <Text
              style={[
                styles.itemTitle,
                theme && theme === "dark"
                  ? { color: ColorSchema.default.disabled }
                  : styles.textLight,
              ]}
            >
              {language && language === "en" ? "Log out" : "Изход"}
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
    backgroundColor: ColorSchema.dark.background,
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
