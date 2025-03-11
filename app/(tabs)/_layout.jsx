import React from 'react'
import { Tabs } from 'expo-router'
import Icon from 'react-native-vector-icons/FontAwesome'
import colors from "@/constants/colors";

function _layout() {
    return (
        <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen name='home' options={{
                title: 'Home',
                tabBarIcon: ({ focused }) => <Icon name='home' size={20} color={focused ? colors.primary : 'black'} />
            }} />
            <Tabs.Screen name='add' />
        </Tabs>
    )
}

export default _layout
