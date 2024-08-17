import React, {CSSProperties} from 'react';

interface Props {
    color?: string;
    className?: string;
    size?: number;
    style?: CSSProperties;
    onClick?: () => void;
}
const ProfileSvg = ({color = "#68696D", className, size = 25, style, onClick}: Props) => (
  <div onClick={onClick} style={style} className={className}>
      <svg width={size} height={size} viewBox="0 0 24 25" fill="none"
           xmlns="http://www.w3.org/2000/svg">
          <path
            d="M13.2603 4.34924L5.05034 13.0392C4.74034 13.3692 4.44034 14.0192 4.38034 14.4692L4.01034 17.7092C3.88034 18.8792 4.72034 19.6792 5.88034 19.4792L9.10034 18.9292C9.55034 18.8492 10.1803 18.5192 10.4903 18.1792L18.7003 9.48924C20.1203 7.98924 20.7603 6.27924 18.5503 4.18924C16.3503 2.11924 14.6803 2.84924 13.2603 4.34924Z"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"/>
          <path
            d="M11.8896 5.80078C12.3196 8.56078 14.5596 10.6708 17.3396 10.9508"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"/>
          <path
            d="M3 22.75H21"
            stroke={color}
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"/>
      </svg>
  </div>
);

export default ProfileSvg;
