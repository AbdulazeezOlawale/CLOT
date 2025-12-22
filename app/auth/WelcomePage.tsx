import { Pressable, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaWrapper } from '@/components/layout/SafeAreaWrapper'
import { auth } from '@/firebaseConfig';

const WelcomePage = () => {
  return (
    <SafeAreaWrapper>
      <Text>WelcomePage</Text>
      <TouchableOpacity onPress={() => auth.signOut()}>
        <Text>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
}

export default WelcomePage