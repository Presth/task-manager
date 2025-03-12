import TaskCard from "@/components/tasks/TaskCard";
import TopNav from "@/components/topNav";
import { getAlltasks } from "@/utils/db";
import { Link, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export default function Home() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const response = await getAlltasks();
      setTasks(response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <ScrollView className="bg-white py-8 px-4 h-screen w-screen">
      <View className="flex-row mb-2">
        <View className="flex-row flex-1 gap-2">
          <Pressable className="p-2">
            <Icon name="refresh" size={18} />
          </Pressable>
          <Pressable className="p-2">
            <Icon name="ellipsis-h" size={18} color="black" />
          </Pressable>
        </View>
        <View className="flex-1 flex-row justify-end gap-2">
          <Pressable className="p-2">
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

      <View>
        {tasks && tasks.length === 0 ? (
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
            data={tasks}
            renderItem={({ item }) => <TaskCard item={item} />}
          />
        )}
      </View>
    </ScrollView>
  );
}
