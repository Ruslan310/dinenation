import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const MobileFooterSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg width="375" height="82" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd"
          d="M147.49 33.2976C141.473 23.2106 131.654 15 119.909 15L36 15C16.1178 15 0 31.1178 0 51V80.375C0 80.9273 0.44771 81.375 0.999995 81.375H374C374.552 81.375 375 80.9273 375 80.375V51C375 31.1178 358.882 15 339 15H256.091C244.346 15 234.527 23.2106 228.51 33.2976C219.189 48.9235 204.511 59 188 59C171.489 59 156.811 48.9235 147.49 33.2976Z"
          fill={color}/>
  </svg>
);

export default MobileFooterSvg;
