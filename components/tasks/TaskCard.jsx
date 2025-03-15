import React from "react";
import { Pressable, Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import COLORS from "@/constants/colors";

function TaskCard({ item, deleteTask }) {
  return (
    <View
      className="p-4 my-2 rounded-xl flex-row"
      style={{
        backgroundColor: COLORS.light,
      }}
    >
      <View className="flex-1">
        <Text className="font-semibold text-lg mb-1">{item.name}</Text>
        <Text className="text-gray-500 mb-2 text-sm">{item.schedule}</Text>
      </View>
      <View>
        <Pressable className="px-4 my-auto" onPress={() => deleteTask(item.id)}>
          <FontAwesome name="trash" size={20} color={"red"} />
        </Pressable>
      </View>
    </View>
  );
}

export default TaskCard;
