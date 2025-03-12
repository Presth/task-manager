import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

function Select({ valueList, value, setValue }) {
  const [selectIsOpen, setSelectIsOpen] = useState(false);
  return (
    <View>
      <View className="border border-primary h-16 rounded-lg">
        <TouchableOpacity
          className="h-16"
          onPress={() => setSelectIsOpen(!selectIsOpen)}
        >
          <Text className="my-auto px-4">
            {value !== "" ? value : "Select"}
          </Text>
        </TouchableOpacity>
        <View
          className="bg-white mt-1"
          style={{
            elevation: 4,
            zIndex: 99,
            display: selectIsOpen ? "block" : "none",
          }}
        >
          {valueList.map((typ) => (
            <TouchableOpacity
              key={Math.random()}
              className="h-16"
              onPress={() => {
                setValue(typ);
                setSelectIsOpen(false);
              }}
            >
              <Text className="my-auto px-4">{typ}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

export default Select;
