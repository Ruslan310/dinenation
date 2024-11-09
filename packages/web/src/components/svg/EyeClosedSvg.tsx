import React from 'react';

interface Props {
    color?: string;
    className?: string;
}
const ActiveDaySvg = ({color = "#40C677", className}: Props) => (
  <svg className={className} width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.5 24.9108C0.5 11.5704 11.3145 0.755859 24.6549 0.755859V16.9108C24.6549 21.3291 21.0732 24.9108 16.6549 24.9108H0.5Z"
      fill={color}/>
  </svg>
);

export default ActiveDaySvg;
