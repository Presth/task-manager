import { Link, router } from 'expo-router'
import React from 'react'
import { Pressable, Text, View } from 'react-native'

function Index() {
  return (
    <View className='bg-white h-screen w-screen justify-center items-center'>
      <Pressable onPress={() => router.push('/home')} className='bg-primary/25 p-4 px-6 rounded-lg'>
        <Text>Explore</Text>
      </Pressable>
    </View>
  )
}

export default Index
