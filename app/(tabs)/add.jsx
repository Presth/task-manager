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
import COLORS from "@/constants/colors";
import { FontAwesome } from "@expo/vector-icons";
import { useTasksContext } from "@/contexts/tasks";

function AddTask() {
  const scheduleTypes = ["Daily", "Weekly"];
  const { createTask } = useTasksContext();

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
  const [day, setDay] = useState("");
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [repeat, setRepeat] = useState(false);
  const [saving, setSaving] = useState(false);

  const addToTasks = async () => {
    let time = `${day}, ${hour}:${minute}`;
    if (taskName === "" || scheduleType === "") {
      alert("Task info not supplied");
      return;
    }

    setSaving(true);
    try {
      const notificationId = await scheduleNotification();
      await createTask(taskName, scheduleType, time, notificationId);

      alert("Task created successfully");
      setTaskName("");
      setScheduleType("");
    } catch (error) {
      alert("Error creating task" + JSON.stringify(error));
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    setDay("");
    setHour(0);
    setMinute(0);
    setRepeat(false);
  }, [scheduleType]);

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
    try {
      const trigger = {};
      const weekday = weekDays.indexOf(day) + 1;

      let triggerType =
        Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL;
      if (scheduleType === "Weekly") {
        triggerType = Notifications.SchedulableTriggerInputTypes.WEEKLY;
        trigger.weekday = weekday;
      } else if (scheduleType === "Daily") {
        triggerType = Notifications.SchedulableTriggerInputTypes.DAILY;
      }

      trigger.type = triggerType;
      trigger.hour = hour;
      trigger.minute = minute;
      trigger.repeat = true;
      // trigger.repeat(scheduleType === "Custom" ? repeat : true);

      const notificationId = await Notifications.scheduleNotificationAsync({
        content: {
          title: "⏰ Reminder!",
          body: `It's time for ${taskName}`,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.MAX,
        },
        trigger,
      });
      return notificationId;
    } catch (error) {
      alert(JSON.stringify(error));
    }
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
          {scheduleType !== "Daily" ? (
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
          <View className="flex-row gap-4">
            <View className="flex-1">
              <Text className="font-semibold my-2 text-lg"> Hour </Text>

              <Select
                valueList={[...Array(24)].map((_, index) => index)}
                value={hour}
                setValue={setHour}
              />
            </View>
            <View className="flex-1">
              <Text className="font-semibold my-2 text-lg"> Minute </Text>
              <Select
                valueList={[...Array(60)].map((_, index) => index)}
                value={minute}
                setValue={setMinute}
              />
            </View>
          </View>
        </View>

        {scheduleType === "Custom" && (
          <Pressable
            className="my-4 flex-row gap-2"
            onPress={() => setRepeat(!repeat)}
          >
            <View
              className="border border-primary rounded-md my-auto"
              style={{
                width: 16,
                height: 16,
                backgroundColor: repeat ? COLORS.primary : "#fff",
              }}
            >
              <Text className="m-auto">
                <FontAwesome name="check" size={12} color={"#fff"} />
              </Text>
            </View>
            <Text className="my-auto font-semibold">Repeat</Text>
          </Pressable>
        )}

        <View>
          <TouchableOpacity
            className="bg-primary rounded-lg p-3 my-6 h-16"
            onPress={() => addToTasks()}
          >
            <Text className="text-white text-center font-semibold my-auto">
              {saving ? "Adding..." : "Add Task"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default AddTask;
