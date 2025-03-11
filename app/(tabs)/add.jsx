import React, { useState } from 'react'
import { ScrollView, Text, TextInput, View } from 'react-native'

function AddTask() {
    const [schedule, setSchedule] = useState('')
    const scheduleValues = [
        'Daily', 'Weekly', 'Monthly', 'Custom'
    ]
    return (
        <ScrollView className='bg-white h-screen p-4'>
            <Text className='text-2xl font-bold mb-4'>
                Add Task
            </Text>

            <View>
                <View>
                    <Text className='font-semibold my-2'> Title </Text>
                    <View className='border border-primary px-2 rounded-lg'>
                        <TextInput placeholder='Title' />
                    </View>
                </View>
                <View>
                    <Text className='font-semibold my-2'> Schedule </Text>
                    <View className='border border-primary px-2 rounded-lg'>
                        <TextInput placeholder='Schedule' />
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default AddTask
