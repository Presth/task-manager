import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

function Index() {
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Enable notifications in settings.");
      }
    };

    // Create a notification channel for Android
    const createNotificationChannel = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "Default Channel",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default",
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }
    };

    requestPermissions();
    createNotificationChannel();

    // Handle notification when received
    const subscription = Notifications.addNotificationReceivedListener(
      (notification) => {
        Alert.alert(
          notification.request.content.title,
          notification.request.content.body
        );
      }
    );

    return () => subscription.remove();
  }, []);

  return (
    <View className="bg-white h-screen w-screen justify-center items-center">
      <Pressable
        onPress={() => router.push("/home")}
        className="bg-primary/25 p-4 px-6 rounded-lg"
      >
        <Text>Explore</Text>
      </Pressable>
    </View>
  );
}

export default Index;
