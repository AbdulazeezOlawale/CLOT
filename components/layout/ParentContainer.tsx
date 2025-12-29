import { View } from 'react-native'
import React from 'react'

const ParentContainer = ({children}: {children: React.ReactNode}) => {
  return (
    <View className='flex flex-col gap-6'>
        {children}
    </View>
  )
}

export default ParentContainer