import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const SauceSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg
    stroke={color}
    strokeWidth="1.5"
    className={className}
    style={style}
    width="24"
    height="24"
    viewBox="0 0 64 64"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M28,17.143c0-0.534,0-1.271,0-2.084c-0.006-2.19-1.809-3.939-4-3.941h-4.023C19.981,11.077,20,11.042,20,11   V6c0-0.552-0.448-1-1-1s-1,0.448-1,1v5c0,0.042,0.019,0.077,0.023,0.117H14c-2.191,0.002-3.994,1.751-4,3.941   c0,0.813,0,1.551,0,2.084C8.28,17.592,7.003,19.141,7,21v34c0.004,2.207,1.793,3.996,4,4h16c2.207-0.004,3.996-1.793,4-4V21   C30.997,19.141,29.72,17.592,28,17.143z M12.582,13.695c0.365-0.357,0.863-0.578,1.418-0.578h10c0.555,0,1.054,0.221,1.418,0.578   C25.783,14.054,26,14.531,26,15.059c0,0.746,0,1.421,0,1.941H12c0-0.52,0-1.196,0-1.941C12,14.531,12.217,14.054,12.582,13.695z    M29,55c0,0.55-0.223,1.045-0.588,1.412C28.044,56.777,27.549,57,27,57H11c-0.549,0-1.044-0.223-1.412-0.588   C9.223,56.045,9,55.55,9,55V21c0-0.549,0.223-1.044,0.588-1.412C9.956,19.223,10.451,19,11,19h16c0.549,0,1.044,0.223,1.412,0.588   C28.777,19.956,29,20.451,29,21V55z"
    />
    <path
      d="M51.545,24.236c0-0.443,0-1.061,0-1.745c0-1.016-0.519-1.906-1.251-2.495   c-0.736-0.595-1.702-0.937-2.749-0.938H45V15c0-0.552-0.448-1-1-1s-1,0.448-1,1v4.059h-2.545c-1.046,0.001-2.012,0.343-2.749,0.938   c-0.733,0.589-1.252,1.479-1.251,2.495c0,0.685,0,1.302,0,1.745c-1.439,0.606-2.452,2.028-2.455,3.687V55   c0.004,2.207,1.793,3.996,4,4h12c2.207-0.004,3.996-1.793,4-4V27.923C53.997,26.265,52.985,24.843,51.545,24.236z M38.966,21.55   c0.351-0.287,0.885-0.493,1.489-0.491h7.091c0.604-0.001,1.138,0.205,1.489,0.491c0.355,0.293,0.511,0.62,0.511,0.941   c0,0.536,0,1.029,0,1.432H38.455c0-0.403,0-0.896,0-1.432C38.455,22.169,38.611,21.843,38.966,21.55z M52,55   c0,0.55-0.223,1.045-0.588,1.412C51.044,56.777,50.549,57,50,57H38c-0.549,0-1.044-0.223-1.412-0.588C36.223,56.045,36,55.55,36,55   V27.923c0-0.549,0.223-1.044,0.588-1.412c0.367-0.366,0.862-0.588,1.412-0.588h12c0.549,0,1.044,0.223,1.412,0.588   C51.777,26.879,52,27.374,52,27.923V55z"
    />
    <path
      d="M12,21c-0.552,0-1,0.448-1,1v32c0,0.553,0.448,1,1,1s1-0.447,1-1V22C13,21.448,12.552,21,12,21z"
    />
    <path
      d="M39,28c-0.552,0-1,0.448-1,1v25c0,0.553,0.448,1,1,1s1-0.447,1-1V29C40,28.448,39.552,28,39,28z"
    />
  </svg>
);

export default SauceSvg;
