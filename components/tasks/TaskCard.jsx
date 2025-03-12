import React from "react";
import { Text, View } from "react-native";

function TaskCard({ item }) {
  console.log(item);
  return (
    <View className="p-4 bg-gray-200 my-2 rounded-lg">
      <Text>{item.name}</Text>
      <Text className="text-gray-500 text-sm">{item.schedule}</Text>
    </View>
  );
}

export default TaskCard;
