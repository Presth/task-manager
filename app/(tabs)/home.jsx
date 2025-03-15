import TaskCard from "@/components/tasks/TaskCard";
import TopNav from "@/components/topNav";
import useLocalStorage from "@/hooks/useLocalStorage";
// import { getAlltasks } from "@/utils/db";
import { FontAwesome } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import * as Notification from "expo-notifications";

import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useTasksContext } from "@/contexts/tasks";

export default function Home() {
  const router = useRouter();
  const { tasks, deleteTask } = useTasksContext();

  const [filteredtasks, setFilteredTasks] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const [showSearchBox, setShowSearchBox] = useState(false);

  useEffect(() => {
    setFilteredTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    if (searchKey === "") return setFilteredTasks(tasks);

    const matchQ = tasks.filter((task) =>
      Object.values(task)
        .join("  ")
        .toLowerCase()
        .includes(searchKey.toLowerCase())
    );
    setFilteredTasks(matchQ);
  }, [searchKey]);

  // const cancelNotification = async () => {
  //   await Notification.cancelAllScheduledNotificationsAsync();
  //   alert("All notifications cancelled");
  // };

  return (
    <ScrollView className="bg-white py-8 px-4 h-screen w-screen">
      <View className="flex-row mb-2">
        <View className="flex-row flex-1 gap-2">
          <Pressable
            className="p-2"
            onPress={() => {
              setFilteredTasks(tasks);
            }}
          >
            <Icon name="refresh" size={18} />
          </Pressable>
          {/* <Pressable
            className="p-2 bg-primaryLight rounded-lg"
            onPress={cancelNotification}
          >
            <Text className="text-xs text-white my-auto font-semibold">
              Cancel Notifications
            </Text>
          </Pressable> */}
        </View>
        <View className="flex-1 flex-row justify-end gap-2">
          <Pressable
            className="p-2"
            onPress={() => setShowSearchBox(!showSearchBox)}
          >
            <Icon name="search" size={18} />
          </Pressable>
          <View className="h-9 w-9 p-1 rounded-full border border-primary bg-primary">
            <Image
              source={require("@/assets/images/react-logo.png")}
              className="w-full h-full"
              resizeMethod="auto"
            />
          </View>
        </View>
      </View>

      <View className="rounded-xl overflow-hidden">
        <ImageBackground
          className=" p-4 py-8"
          source={require("@/assets/images/wallpaper.jpg")}
        >
          <View></View>
          <Text className="text-white text-3xl mb-1 font-bold">
            {" "}
            Task Manager
          </Text>
          <Text className="text-sm text-gray-200 px-2">
            {" "}
            Be reminded of what to do at the right time
          </Text>
        </ImageBackground>
      </View>

      {showSearchBox && (
        <View className="relative  my-4 border border-primary rounded-lg px-4 h-12">
          <TextInput
            placeholder="Type to search"
            className="my-auto w-full"
            value={searchKey}
            onChangeText={setSearchKey}
          />
          <Pressable
            className="absolute top-4 right-4"
            onPress={() => {
              setShowSearchBox(false);
              setSearchKey("");
            }}
          >
            <FontAwesome name="remove" size={16} />
          </Pressable>
        </View>
      )}

      <View>
        {filteredtasks && filteredtasks.length === 0 ? (
          <View className="my-16">
            <Text className="text-center text-gray-500 font-semibold">
              No Task created yet
            </Text>
            <View className="flex flex-row justify-center">
              <Pressable
                onPress={() => router.push("/(tabs)/add")}
                className="p-2 bg-gray-200 rounded-lg my-4"
              >
                <Text className="text-md">
                  Add Task <Icon name="plus" size={14} />
                </Text>
              </Pressable>
            </View>
          </View>
        ) : (
          <FlatList
            data={filteredtasks}
            renderItem={({ item }) => (
              <TaskCard item={item} deleteTask={deleteTask} />
            )}
          />
        )}
      </View>
    </ScrollView>
  );
}
