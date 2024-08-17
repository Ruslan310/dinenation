import React from 'react';
import {colorTheme, statusColorIcon, statusColorText} from "../../utils/theme";
import styles from "./OrderStatus.module.css";
import OrderStatusSvg from "../svg/OrderStatusSvg";
import {TStatusType} from "../../utils/utils";

interface Props {
  status: TStatusType;
  className?: string;
}

const OrderStatus = ({status, className}: Props) => (
  <div
    style={{borderColor: status ? statusColorIcon[status] : ''}}
    className={`${styles.statusBlock} ${className}`}>
    <OrderStatusSvg type={status}/>
    <p
      style={{color: status ? statusColorText[status] : colorTheme.black}}>{status}</p>
  </div>
);

export default OrderStatus;
