import { View } from 'react-native'
import React, { useState } from 'react'
import ClotFormInput from './ClotFormInput';
import ClotPressable from '../common/ClotPressable';
import { Eye, EyeClosed } from 'lucide-react-native';
import { ClotGeneralInputProps } from '@/types/schema';

const ClotPasswordInput = ({value, setValue, placeholder, classname}: ClotGeneralInputProps) => {
    
  const [showPassword, setShowPassword] = useState<boolean>(true);
    
  const toggleVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View
      className={`flex flex-row gap-1 items-center bg-secondary rounded-md overflow-hidden ${classname}`}
    >
      <View className="flex-1">
        <ClotFormInput
          keyboardType="default"
          autoComplete="password"
          placeholder={placeholder || "Enter your password"}
          value={value}
          setValue={setValue}
          secureTextEntry={showPassword}
        />
      </View>

      <ClotPressable
        onPress={toggleVisibility}
        classname="p-4 flex items-center align-middle"
      >
        {showPassword ? (
          <EyeClosed size={20} className="flex items-center justify-center" />
        ) : (
          <Eye size={20} className="flex items-center justify-center" />
        )}
      </ClotPressable>
    </View>
  );
}

export default ClotPasswordInput