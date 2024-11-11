import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
  color?: string;
  className?: string;
  style?: CSSProperties;
}

const InvoiceSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg
    stroke={color}
    strokeWidth="0.7"
    className={className}
    style={style}
    width="24"
    height="24"
    viewBox="0 0 22.46 22.502"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M12.854,5.183h3.667a.341.341,0,0,1,0,.682H12.854A.341.341,0,0,1,12.854,5.183Zm-2.24.682h.423a.341.341,0,0,0,0-.682h-.423A.341.341,0,0,0,10.614,5.865Zm2.24-2.273h3.667a.341.341,0,0,0,0-.681H12.854A.341.341,0,0,0,12.854,3.592Zm-2.24,4.545h2.757a.341.341,0,0,0,0-.681H10.614A.341.341,0,0,0,10.614,8.137Zm0,2.272h1.848a.341.341,0,0,0,0-.681H10.614A.341.341,0,0,0,10.614,10.409Zm0,2.273h1.848a.341.341,0,0,0,0-.682H10.614A.341.341,0,0,0,10.614,12.682Zm3.1,1.931a.341.341,0,0,0-.341-.34H10.614a.341.341,0,1,0,0,.681h2.757A.341.341,0,0,0,13.712,14.613Zm-3.1-11.021h.423a.341.341,0,0,0,0-.681h-.423A.341.341,0,0,0,10.614,3.592Zm5.907,15.225H12.854a.341.341,0,0,0,0,.682h3.667A.341.341,0,0,0,16.521,18.817Zm-5.484,0h-.423a.341.341,0,0,0,0,.682h.423A.341.341,0,0,0,11.037,18.817Zm1.477-1.931a.34.34,0,0,0,.34.34h3.667a.341.341,0,1,0,0-.681H12.854A.34.34,0,0,0,12.514,16.886Zm-1.477-.341h-.423a.341.341,0,0,0,0,.681h.423A.341.341,0,0,0,11.037,16.545Zm7.368-.885v6.494a.343.343,0,0,1-.518.291l-2.071-1.256c-.04,0-2.26,1.424-2.249,1.306.006.115-2.206-1.3-2.248-1.306L9.247,22.445a.343.343,0,0,1-.517-.291V16.066H2.524A2.527,2.527,0,0,1,0,13.542V5.971a.344.344,0,0,1,.522-.289l2,1.251L4.365,5.782V2.526A2.542,2.542,0,0,1,6.888,0h8.994a2.526,2.526,0,0,1,2.523,2.524v4.31A4.429,4.429,0,0,1,18.405,15.66ZM4.365,13.542V6.586L2.7,7.624a.341.341,0,0,1-.361,0L.682,6.586v6.956a1.842,1.842,0,1,0,3.683,0ZM8.73,2.524A1.844,1.844,0,0,0,6.888.682h0A1.843,1.843,0,0,0,5.047,2.524V13.542a2.516,2.516,0,0,1-.8,1.842H8.73ZM17.723,15.66a4.429,4.429,0,0,1,0-8.826V2.524A1.843,1.843,0,0,0,15.882.682H8.611a2.515,2.515,0,0,1,.8,1.842V21.548a19.453,19.453,0,0,1,1.907-1.1c-.008-.118,2.208,1.3,2.248,1.3L15.639,20.5a.339.339,0,0,1,.353,0l1.731,1.049ZM18.064,7.5a3.749,3.749,0,0,0,0,7.5A3.749,3.749,0,0,0,18.064,7.5Zm0,3.409c-.555,0-.836-.246-.836-.729-.02-.806,1.345-.989,1.621-.249a.341.341,0,0,0,.629-.264A1.475,1.475,0,0,0,18.4,8.808c.017-.265.011-.623-.341-.628s-.358.363-.341.627a1.4,1.4,0,0,0,.341,2.781c.558,0,.84.246.84.729.02.806-1.345.989-1.621.249a.34.34,0,0,0-.446-.182c-.641.437.39,1.238.886,1.3-.016.264-.011.622.341.628s.358-.362.341-.626A1.4,1.4,0,0,0,18.062,10.907Z"
    />
  </svg>
);

export default InvoiceSvg;
