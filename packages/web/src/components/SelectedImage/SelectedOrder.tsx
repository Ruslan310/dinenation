import React, {CSSProperties} from 'react';
import styles from './SelectedOrder.module.css'
import ActiveDaySvg from "../svg/ActiveDaySvg";
import SelectSvg from "../svg/SelectSvg";

interface Props {
  className?: string;
  image: string;
  isSelected?: boolean;
  style?: CSSProperties;
}

const SelectedOrder = ({className, image, isSelected, style}: Props) => (
  <div style={style} className={`${styles.container} ${className}`}>
    <img src={image} alt="component photo" className={styles.orderImage}/>
    {isSelected && <ActiveDaySvg className={styles.selectImage}/>}
    {isSelected && <SelectSvg className={styles.selectImageIcon}/>}
  </div>
);

export default SelectedOrder;
