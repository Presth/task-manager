import React from "react";
import { Tabs } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome";
import colors from "@/constants/colors";

function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="home"
              size={20}
              color={focused ? colors.primary : "black"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: "Add Task",
          tabBarIcon: ({ focused }) => (
            <Icon
              name="plus"
              size={20}
              color={focused ? colors.primary : "black"}
            />
          ),
        }}
      />
    </Tabs>
  );
}

export default _layout;
