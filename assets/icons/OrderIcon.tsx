import * as React from "react";
import Svg, { Path } from "react-native-svg";
const OrderIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={19}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M17.75 5.79c0-4.03-.94-5.04-4.72-5.04H5.47C1.69.75.75 1.76.75 5.79v11.26c0 2.66 1.46 3.29 3.23 1.39l.01-.01c.82-.87 2.07-.8 2.78.15l1.01 1.35c.81 1.07 2.12 1.07 2.93 0l1.01-1.35c.72-.96 1.97-1.03 2.79-.15 1.78 1.9 3.23 1.27 3.23-1.39V9.75m-12.49-4h8m-7 4h6"
    />
  </Svg>
);
export default OrderIcon;
