import { View, Text } from 'react-native'
import React from 'react'

const Welcome = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-bold text-blue-500">
        Screen after splash screen.
      </Text>
    </View>
  );
}

export default Welcome