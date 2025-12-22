import * as React from "react";
import Svg, { Path } from "react-native-svg";
const BackIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width || 14}
    height={props.height || 20}
    viewBox="0 0 7 13"
    fill="none"
    {...props}
  >
    <Path
      stroke="#272727"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.5}
      d="M2.882 3.35 1.135 5.097a1.324 1.324 0 0 0 0 1.866l4.347 4.347m0-10.56-.694.693"
    />
  </Svg>
);
export default BackIcon;
