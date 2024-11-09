import React, {CSSProperties} from 'react';
import {colorTheme} from "../../utils/theme";

interface Props {
    color?: string;
    className?: string;
    style?: CSSProperties;
}
const MenuSvg = ({color = colorTheme.secondary, className, style}: Props) => (
  <svg className={className} style={style} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.444336 2.36621C0.444336 2.36621 0.444336 1.74489 0.883676 1.30555C0.883676 1.30555 1.32302 0.866211 1.94434 0.866211H6.44434C6.44434 0.866211 7.06566 0.866211 7.505 1.30555C7.505 1.30555 7.94434 1.74489 7.94434 2.36621V6.86621C7.94434 6.86621 7.94434 7.48753 7.505 7.92687C7.505 7.92687 7.06566 8.36621 6.44433 8.36621H1.94434C1.94434 8.36621 1.32301 8.36621 0.883675 7.92687C0.883675 7.92687 0.444336 7.48753 0.444336 6.86621V2.36621ZM1.94434 2.36621V6.86621L6.44433 6.86621L6.44434 2.36621H1.94434Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.444336 11.3662C0.444336 11.3662 0.444336 10.7449 0.883676 10.3056C0.883676 10.3056 1.32302 9.86621 1.94434 9.86621H6.44434C6.44434 9.86621 7.06566 9.86621 7.505 10.3056C7.505 10.3056 7.94434 10.7449 7.94434 11.3662V15.8662C7.94434 15.8662 7.94434 16.4875 7.505 16.9269C7.505 16.9269 7.06566 17.3662 6.44433 17.3662H1.94434C1.94434 17.3662 1.32301 17.3662 0.883675 16.9269C0.883675 16.9269 0.444336 16.4875 0.444336 15.8662V11.3662ZM1.94434 11.3662V15.8662L6.44433 15.8662L6.44434 11.3662H1.94434Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9.44434 2.36621C9.44434 2.36621 9.44434 1.74489 9.88368 1.30555C9.88368 1.30555 10.323 0.866211 10.9443 0.866211H15.4443C15.4443 0.866211 16.0657 0.866211 16.505 1.30555C16.505 1.30555 16.9443 1.74489 16.9443 2.36621V6.86621C16.9443 6.86621 16.9443 7.48753 16.505 7.92687C16.505 7.92687 16.0657 8.36621 15.4443 8.36621H10.9443C10.9443 8.36621 10.323 8.36621 9.88368 7.92687C9.88368 7.92687 9.44434 7.48753 9.44434 6.86621V2.36621ZM10.9443 2.36621V6.86621L15.4443 6.86621L15.4443 2.36621H10.9443Z"
      fill={color}
    />
    <path
      d="M9.44434 10.6162V13.6162C9.44434 14.0304 9.78012 14.3662 10.1943 14.3662C10.6085 14.3662 10.9443 14.0304 10.9443 13.6162V10.6162C10.9443 10.202 10.6085 9.86621 10.1943 9.86621C9.78012 9.86621 9.44434 10.202 9.44434 10.6162Z"
      fill={color}
    />
    <path
      d="M13.9443 16.6162V10.6162C13.9443 10.202 13.6085 9.86621 13.1943 9.86621C12.7801 9.86621 12.4443 10.202 12.4443 10.6162V15.8662H10.1943C9.78012 15.8662 9.44434 16.202 9.44434 16.6162C9.44434 17.0304 9.78012 17.3662 10.1943 17.3662H13.1943C13.6085 17.3662 13.9443 17.0304 13.9443 16.6162Z"
      fill={color}
    />
    <path
      d="M13.1943 12.8662H16.1943C16.6085 12.8662 16.9443 12.5304 16.9443 12.1162C16.9443 11.702 16.6085 11.3662 16.1943 11.3662H13.1943C12.7801 11.3662 12.4443 11.702 12.4443 12.1162C12.4443 12.5304 12.7801 12.8662 13.1943 12.8662Z"
      fill={color}
    />
    <path
      d="M16.1943 14.3662C15.7801 14.3662 15.4443 14.702 15.4443 15.1162V16.6162C15.4443 17.0304 15.7801 17.3662 16.1943 17.3662C16.6085 17.3662 16.9443 17.0304 16.9443 16.6162V15.1162C16.9443 14.702 16.6085 14.3662 16.1943 14.3662Z"
      fill={color}
    />
  </svg>
);

export default MenuSvg;
