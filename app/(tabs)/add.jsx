import { createTask } from "@/utils/db";
import React, { useState, useEffect } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as Notifications from "expo-notifications";
import Select from "@/components/select";

function AddTask() {
  const scheduleTypes = ["Daily", "Weekly", "Custom"];
  const weekDays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const [taskName, setTaskName] = useState("");
  const [scheduleType, setScheduleType] = useState("");
  const [time, setTime] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const addToTasks = async () => {
    if (taskName === "" || schedule === "" || time === "") {
      console.log("Task info not supplied");
      return;
    }
    try {
      const response = await createTask(taskName, schedule, time);
      console.log(response);
      scheduleNotification();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "You need to enable notifications");
      }
    };
    requestPermissions();
  }, []);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "🚀 Hello!",
        body: "This is your scheduled notification!",
        sound: true,
        priority: Notifications.AndroidNotificationPriority.MAX,
      },
      trigger: { seconds: 5 }, // Triggers after 5 seconds
    });
    console.log("scheduled");
  };

  return (
    <ScrollView className="bg-white h-screen p-4">
      <Text className="text-2xl font-bold mb-4">Add Task</Text>

      <View>
        <View>
          <Text className="font-semibold my-2 text-lg"> Title </Text>
          <View className="border border-primary rounded-lg h-16 px-4">
            <TextInput
              placeholder="Title"
              value={taskName}
              onChangeText={setTaskName}
              className="my-auto text-md"
            />
          </View>
        </View>
        <View>
          <Text className="font-semibold my-2 text-lg"> Schedule </Text>
          <Select
            label={"Schedule"}
            valueList={scheduleTypes}
            value={scheduleType}
            setValue={setScheduleType}
          />
        </View>

        <View>
          {scheduleType !== "" ? (
            <View>
              <Text className="font-semibold my-2 text-lg"> Day </Text>

              <Select
                label={"Day of the Week"}
                valueList={weekDays}
                value={day}
                setValue={setDay}
              />
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <View>
          {scheduleType !== "" && scheduleType !== "Weekly" ? (
            <View className="flex-row gap-4">
              <View className="flex-1">
                <Text className="font-semibold my-2 text-lg"> Hour </Text>

                <Select valueList={Array(5)} value={day} setValue={setDay} />
              </View>
              <View className="flex-1">
                <Text className="font-semibold my-2 text-lg"> Minute </Text>

                <Select valueList={weekDays} value={day} setValue={setDay} />
              </View>
            </View>
          ) : (
            <View></View>
          )}
        </View>
        <View>
          <Pressable
            className="bg-primary rounded-lg p-3 my-4"
            onPress={() => addToTasks()}
          >
            <Text className="text-white text-center font-semibold">
              Add Task
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddTask;
