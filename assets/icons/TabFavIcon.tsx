import * as React from "react";
import Svg, { Path } from "react-native-svg";
const TabFavIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={24}
    viewBox="0 0 15 15"
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1}
      d="M13.143 1.997c.587.66.94 1.526.94 2.48 0 4.666-4.32 7.42-6.253 8.086-.227.08-.6.08-.827 0C5.07 11.897.75 9.143.75 4.477.75 2.417 2.41.75 4.457.75c1.213 0 2.286.587 2.96 1.493A3.687 3.687 0 0 1 10.377.75"
    />
  </Svg>
);
export default TabFavIcon;
