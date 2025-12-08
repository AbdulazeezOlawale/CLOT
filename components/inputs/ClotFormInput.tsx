import React from "react";
import { KeyboardTypeOptions, TextInput, TextInputProps } from "react-native";

interface ClotFormInputProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  keyboardType?: KeyboardTypeOptions;
  placeholder: string;
  autoComplete?: TextInputProps["autoComplete"];
  secureTextEntry?: boolean;
}

const ClotFormInput = ({
  value,
  setValue,
  keyboardType,
  placeholder,
  autoComplete,
  secureTextEntry = false,
}: ClotFormInputProps) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      secureTextEntry={secureTextEntry}
      onChangeText={(text: string) => setValue(text)}
      placeholderTextColor="black"
      className="bg-secondary h-14 rounded-md text-[#272727] text-xl font-medium"
      style={{ paddingLeft: 16 }}
      keyboardType={keyboardType}
      autoCapitalize="none"
      autoComplete={autoComplete}
      autoCorrect={false}
    />
  );
};

export default ClotFormInput;
