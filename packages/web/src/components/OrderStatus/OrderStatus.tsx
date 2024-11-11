import React from 'react';
import {colorTheme, statusColorIcon, statusColorText} from "../../utils/theme";
import styles from "./OrderStatus.module.css";
import OrderStatusSvg from "../svg/OrderStatusSvg";
import {TStatusType} from "../../utils/utils";

interface Props {
  status: TStatusType;
  className?: string;
  hideText?: boolean;
}

const OrderStatus = ({status, className, hideText}: Props) => (
  <div
    style={{borderColor: status ? statusColorIcon[status] : ''}}
    className={`${styles.statusBlock} ${className}`}>
    <OrderStatusSvg type={status}/>
    {!hideText &&
      <p
        style={{color: status ? statusColorText[status] : colorTheme.black}}>{status}
      </p>
    }
  </div>
);

export default OrderStatus;
