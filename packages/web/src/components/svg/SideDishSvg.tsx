import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const AddressSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} width="24" height="19" viewBox="0 0 24 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M3 8.57906V18.0009C3 18.4151 3.33579 18.7509 3.75 18.7509C4.16421 18.7509 4.5 18.4151 4.5 18.0009V8.57913C4.5 8.58249 4.50065 8.58262 4.50065 8.58262L4.50229 8.5803C4.50458 8.5751 4.50871 8.5712 4.50871 8.5712L11.9982 1.76536C12 1.76367 12 1.76367 12 1.76367L19.5015 8.5807C19.4979 8.57742 19.4972 8.57793 19.4972 8.57793L19.4977 8.5803C19.5 8.58551 19.5001 8.59119 19.5001 8.59119L19.5 18.0009C19.5 18.4151 19.8358 18.7509 20.25 18.7509C20.6642 18.7509 21 18.4151 21 18.0009L20.9999 8.56693C20.9949 8.25808 20.8703 7.97542 20.8703 7.97542C20.7458 7.69276 20.5107 7.47088 20.5107 7.47088L13.0125 0.656946C12.5826 0.263672 12 0.263672 12 0.263672C11.4174 0.263672 10.9893 0.655259 10.9893 0.655259L3.47879 7.48067C3.25422 7.69276 3.12966 7.97542 3.12966 7.97542C3.00509 8.25808 3 8.57906 3 8.57906Z"
        fill={color}/>
      <path
        d="M1.5 18.7509H22.5C22.9142 18.7509 23.25 18.4151 23.25 18.0009C23.25 17.5867 22.9142 17.2509 22.5 17.2509H1.5C1.08579 17.2509 0.75 17.5867 0.75 18.0009C0.75 18.4151 1.08579 18.7509 1.5 18.7509Z"
        fill={color}/>
      <path
        d="M9 12.7509V18.0009C9 18.4151 9.33579 18.7509 9.75 18.7509C10.1642 18.7509 10.5 18.4151 10.5 18.0009V12.7509H13.5V18.0009C13.5 18.4151 13.8358 18.7509 14.25 18.7509C14.6642 18.7509 15 18.4151 15 18.0009V12.7509C15 12.1296 14.5607 11.6903 14.5607 11.6903C14.1213 11.2509 13.5 11.2509 13.5 11.2509H10.5C9.87868 11.2509 9.43934 11.6903 9.43934 11.6903C9 12.1296 9 12.7509 9 12.7509Z"
        fill={color}/>
  </svg>
);

export default AddressSvg;
