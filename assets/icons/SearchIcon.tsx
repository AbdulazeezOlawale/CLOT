import * as React from "react";
import Svg, { Path } from "react-native-svg";
const SearchIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    viewBox="0 0 18 18"
    fill="none"
    {...props}
  >
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.083.75a6.33 6.33 0 0 1 6.334 6.333 6.33 6.33 0 0 1-6.334 6.334A6.33 6.33 0 0 1 .75 7.083c0-2.466 1.407-4.6 3.467-5.646m9.866 12.646L12.75 12.75"
    />
  </Svg>
);
export default SearchIcon;
