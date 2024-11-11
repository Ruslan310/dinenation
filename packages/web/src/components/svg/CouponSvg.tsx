import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const CouponSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} viewBox="0 0 24 24" height='24' width='24' xmlns="http://www.w3.org/2000/svg">
    <path
      stroke={color}
      strokeWidth="1"
      fill="none"
      d="M2 9.5V4a1 1 0 0 1 1-1h18a1 1 0 0 1 1 1v5.5a2.5 2.5 0 1 0 0 5V20a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-5.5a2.5 2.5 0 1 0 0-5zm2-1.532a4.5 4.5 0 0 1 0 8.064V19h16v-2.968a4.5 4.5 0 0 1 0-8.064V5H4v2.968zM9 9h6v2H9V9zm0 4h6v2H9v-2z"/>
  </svg>
);

export default CouponSvg;
