import React from 'react'
import { Stack } from 'expo-router'

const OnboardingLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="Login" options={{title: "Login", headerShown: false}}/>
        <Stack.Screen name="Signup" options={{title: "signup", headerShown: false}}/>
        <Stack.Screen name="PasswordSignIn" options={{title: "PasswordSignIn", headerShown: false}}/>
    </Stack>
  )
}

export default OnboardingLayout