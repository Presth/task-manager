
import React from 'react'
import { Pressable, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import '@/global.css'
function TopNav() {
    return (
        <View style={{ flexDirection: 'row' }}>
            <Pressable>
                <Icon name='refresh' size={16} />
            </Pressable>
            <Pressable className='p-4 bg-red-500'>
                <Icon name="ellipsis-h" size={16} color="black" />
            </Pressable>
        </View>
    )
}

export default TopNav
