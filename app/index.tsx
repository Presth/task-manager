import { Link, router } from "expo-router";
import React, { useEffect } from "react";
import { Pressable, Text, View, Alert, Platform } from "react-native";
import * as Notifications from "expo-notifications";
import * as SplashScreen from "expo-splash-screen";
import useLocalStorage from "@/hooks/useLocalStorage";
import { createTaskstable } from "@/utils/db";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

SplashScreen.preventAutoHideAsync();

function Index() {
  const [firstTimeUse, setFirstTimeUse] = useLocalStorage("firstTimeUse");

  useEffect(() => {
    if (firstTimeUse === "false") return;

    const setupDb = async () => {
      const creation = await createTaskstable();
      if (creation === true) return setFirstTimeUse("false");
      alert("Error seting up db");
    };
    setupDb();
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      await SplashScreen.hideAsync();
    }, 5000); // Set duration (3000ms = 3 seconds)
  }, []);

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
