import * as React from "react";
import Svg, { Path } from "react-native-svg";
const NotificationIcon = (props: any) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path
      stroke={props.color}
      strokeLinecap="round"
      strokeMiterlimit={10}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M12 6.441v3.33m8.59 5.399c.73 1.22.15 2.8-1.2 3.25a23.34 23.34 0 0 1-14.73 0c-1.44-.48-1.99-1.94-1.2-3.25l1.27-2.12c.35-.58.63-1.61.63-2.28v-2.1A6.66 6.66 0 0 1 12.02 2c3.66 0 6.66 3 6.66 6.66v2.1c0 .18.02.38.05.59"
    />
    <Path
      stroke={props.color}
      strokeMiterlimit={10}
      strokeOpacity={0.5}
      strokeWidth={1.5}
      d="M15.33 18.82c0 1.83-1.5 3.33-3.33 3.33-.91 0-1.75-.38-2.35-.98-.6-.6-.98-1.44-.98-2.35"
    />
  </Svg>
);
export default NotificationIcon;
