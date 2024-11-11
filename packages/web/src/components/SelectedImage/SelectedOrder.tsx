import React, {CSSProperties} from 'react';
import styles from './SelectedOrder.module.css'
import ActiveDaySvg from "../svg/ActiveDaySvg";
import SelectSvg from "../svg/SelectSvg";
import ProductImage from "../ProductImage/ProductImage";

interface Props {
  className?: string;
  image: string;
  small_img: string;
  isSelected?: boolean;
  style?: CSSProperties;
}

const SelectedOrder = ({className, image, small_img, isSelected, style}: Props) => (
  <div style={style} className={`${styles.container} ${className}`}>
    <ProductImage image={image} placeholder={small_img} className={styles.orderImage} />
    {isSelected && <ActiveDaySvg className={styles.selectImage}/>}
    {isSelected && <SelectSvg className={styles.selectImageIcon}/>}
  </div>
);

export default SelectedOrder;
