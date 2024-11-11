import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const AddSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg"><title/>
    <path fill={color} d="M64,0a64,64,0,1,0,64,64A64.07,64.07,0,0,0,64,0Zm0,122a58,58,0,1,1,58-58A58.07,58.07,0,0,1,64,122Z"/>
    <path fill={color} d="M90,61H67V38a3,3,0,0,0-6,0V61H38a3,3,0,0,0,0,6H61V90a3,3,0,0,0,6,0V67H90a3,3,0,0,0,0-6Z"/>
  </svg>
);

export default AddSvg;
