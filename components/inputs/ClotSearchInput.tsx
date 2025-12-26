// import { ClotGeneralInputProps } from "@/types/schema";
// import React from "react";
// import { View } from "react-native";
// import ClotFormInput from "./ClotFormInput";

// const ClotSearchInput = ({
//   value,
//   setValue,
//   placeholder,
//   classname,
// }: ClotGeneralInputProps) => {
//   return (
//     <View
//       className={`flex flex-row gap-1 items-center bg-secondary rounded-md overflow-hidden ${classname}`}
//     >
//       <View className="flex-1">
//         <ClotFormInput
//           keyboardType="default"
//           autoComplete="password"
//           placeholder={placeholder || "Enter your password"}
//           value={value}
//           setValue={setValue}
//         />
//       </View>

//       <ClotPressable
//         onPress={toggleVisibility}
//         classname="p-4 flex items-center align-middle"
//       >
//         {showPassword ? (
//           <EyeClosed size={20} className="flex items-center justify-center" />
//         ) : (
//           <Eye size={20} className="flex items-center justify-center" />
//         )}
//       </ClotPressable>
//     </View>
//   );
// };

// export default ClotSearchInput;
