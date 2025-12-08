import { TouchableOpacity } from 'react-native'
import React from 'react'

interface CommonButtonProps {
    children: React.ReactNode;
    classNameStyle?: string;
}

const CommonButton = ({children, classNameStyle}: CommonButtonProps) => {
  return (
    <TouchableOpacity className={`bg-secondary py-3 px-4 ${classNameStyle}`}>
      {children}
    </TouchableOpacity>
  );
}

export default CommonButton