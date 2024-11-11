import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const OrderSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} width="24" height="24" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16 1.5a.5.5 0 0 1 .5.5v.5H18a1.5 1.5 0 0 1 1.493 1.356L19.5 4v16a1.5 1.5 0 0 1-1.356 1.493L18 21.5H6a1.5 1.5 0 0 1-1.493-1.356L4.5 20V4a1.5 1.5 0 0 1 1.356-1.493L6 2.5h1.5V2a.5.5 0 0 1 .41-.492L8 1.5zm-8.5 2H6a.5.5 0 0 0-.492.41L5.5 4v16a.5.5 0 0 0 .41.492L6 20.5h12a.5.5 0 0 0 .492-.41L18.5 20V4a.5.5 0 0 0-.41-.492L18 3.5h-1.5V4a.5.5 0 0 1-.41.492L16 4.5H8a.5.5 0 0 1-.5-.5v-.5zm9 12.5a.5.5 0 1 1 0 1h-9a.5.5 0 1 1 0-1h9zm0-4a.5.5 0 1 1 0 1h-9a.5.5 0 1 1 0-1h9zm0-4a.5.5 0 1 1 0 1h-9a.5.5 0 0 1 0-1h9zm-1-5.5h-7v1h7v-1z"
      stroke={color}
      strokeWidth="1"
      fill="none"
    />
  </svg>
);

export default OrderSvg;
