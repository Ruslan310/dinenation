import React from 'react';
import {colorTheme, statusColorIcon, statusColorText} from "../../utils/theme";
import styles from "./ProductStatus.module.css";
import {TStatusType} from "../../utils/utils";
import ProductStatusSvg from "../svg/ProductStatusSvg";

interface Props {
  status: TStatusType;
  className?: string;
}

const ProductStatus = ({status, className}: Props) => (
  <div
    style={{borderColor: status ? statusColorIcon[status] : ''}}
    className={`${styles.statusBlock} ${className}`}>
    <ProductStatusSvg type={status}/>
    <p style={{color: status ? statusColorText[status] : colorTheme.black}}>{status}</p>
  </div>
);

export default ProductStatus;
