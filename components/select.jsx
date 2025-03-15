import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Pressable,
} from "react-native";

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
          style={{
            display: selectIsOpen ? "flex" : "none",
            height: 200,
            width: "100%",
            zIndex: 99,
            elevation: 4,
            backgroundColor: "#fafafa",
            marginTop: 4,
            overflowY: "hidden",
            width: "100%",
          }}
        >
          <ScrollView>
            {valueList.map((item) => {
              return (
                <TouchableOpacity
                  key={Math.random()}
                  className="h-12 px-4 bg-white mb-1"
                  onPress={() => {
                    console.log(item);
                    setValue(item);
                    setSelectIsOpen(false);
                  }}
                >
                  <Text className="my-auto">{item}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* {valueList.map((typ) => (
           
          ))} */}
        </View>
      </View>
    </View>
  );
}

export default Select;
