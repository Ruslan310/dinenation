import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}
const ContactUsSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M13.5456 10.1219H13.5537"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"/>
    <path
      d="M9.93716 10.1219H9.94526"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"/>
    <path
      d="M6.32876 10.1219H6.33686"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"/>
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.3639 16.1129C13.6144 18.8637 9.54064 19.458 6.20768 17.9166C5.71565 17.7185 2.53102 18.6005 1.84001 17.9103C1.149 17.2192 2.03175 14.0341 1.83368 13.542C0.291561 10.2095 0.8867 6.13434 3.63718 3.38439C7.14832 -0.12813 12.8528 -0.12813 16.3639 3.38439C19.8823 6.90234 19.8751 12.6012 16.3639 16.1129Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"/>
  </svg>
);

export default ContactUsSvg;
