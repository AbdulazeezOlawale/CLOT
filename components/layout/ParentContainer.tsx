import { View } from 'react-native'
import React from 'react'

const ParentContainer = ({children, classname}: {children: React.ReactNode, classname?: string}) => {
  return <View className={`flex flex-col gap-6 ${classname}`}>{children}</View>;
}

export default ParentContainer