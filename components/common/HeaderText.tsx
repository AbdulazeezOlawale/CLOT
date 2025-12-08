import { View, Text } from 'react-native'
import React from 'react'

interface HeaderTextPros {
    headerText: string
}

const HeaderText = ({headerText}: HeaderTextPros) => {
  return (
    <View>
      <Text className="text-5xl font-bold text-primary leading-relaxed">
        {headerText}
      </Text>
    </View>
  );
}

export default HeaderText