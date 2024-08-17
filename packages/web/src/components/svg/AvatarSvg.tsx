import React from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  size?: number;
  color?: string;
}

const AvatarSvg = ({size = 40, color = colorTheme.black}: Props) => (
  <svg width={size} height={size} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 78 78">
	  <path
      fill={color}
      d="M48.3,41.2C54.8,37.2,59,29.3,59,22c0-10.4-8.5-22-20-22S19,11.6,19,22c0,7.3,4.2,15.2,10.7,19.2 C14.3,45.3,3,59.4,3,76c0,1.1,0.9,2,2,2h68c1.1,0,2-0.9,2-2C75,59.4,63.7,45.3,48.3,41.2z M23,22c0-10.3,8.5-18,16-18s16,7.7,16,18s-8.5,18-16,18S23,32.3,23,22z M7.1,74c1-16.7,15-30,31.9-30s30.9,13.3,31.9,30H7.1z"
    />
  </svg>
);
export default AvatarSvg;
