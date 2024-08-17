import React, {CSSProperties} from 'react';
import styles from './SelectedOrder.module.css'
import activeDay from "../../assets/image/activeDay.svg";
import select from "../../assets/image/selectDay.svg";

interface Props {
  className?: string;
  image: string;
  isSelected?: boolean;
  style?: CSSProperties;
}

const SelectedOrder = ({className, image, isSelected, style}: Props) => (
  <div style={style} className={`${styles.container} ${className}`}>
    <img src={image} alt="component photo" className={styles.orderImage}/>
    {isSelected && <img src={activeDay} alt="component photo" className={styles.selectImage}/>}
    {isSelected && <img src={select} alt="component photo" className={styles.selectImageIcon}/>}
  </div>
);

export default SelectedOrder;
