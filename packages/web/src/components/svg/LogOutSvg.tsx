import React from 'react';

interface Props {
    color: string;
}
const LogOutSvg = ({color = "#68696D"}: Props) => (
  <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18 14.75L19.2929 13.4571C19.6834 13.0666 19.6834 12.4334 19.2929 12.0429L18 10.75"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M19 12.75L13 12.75M4 18.0163V8.01633M16 18.0163C16 19.1209 15.1046 20.0163 14 20.0163H10M16 8.01633C16 6.91176 15.1046 6.01633 14 6.01633H10M4.8906 20.6101L6.8906 21.9434C8.21971 22.8295 10 21.8767 10 20.2793V5.75336C10 4.15597 8.21971 3.20319 6.8906 4.08926L4.8906 5.4226C4.3342 5.79353 4 6.41799 4 7.0867V18.946C4 19.6147 4.3342 20.2391 4.8906 20.6101Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

export default LogOutSvg;
