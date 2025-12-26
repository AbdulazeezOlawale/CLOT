import * as React from "react";
import Svg, { Path } from "react-native-svg";
const HomeIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={22}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M20.75 9.233c0-1.21-.81-2.76-1.8-3.45l-6.18-4.33c-1.4-.98-3.65-.93-5 .12l-5.39 4.2c-.9.7-1.63 2.19-1.63 3.32v7.41c0 2.32 1.89 4.22 4.21 4.22h11.58c2.32 0 4.21-1.9 4.21-4.21v-3.1m-10 3.31v-3"
    />
  </Svg>
);
export default HomeIcon;
