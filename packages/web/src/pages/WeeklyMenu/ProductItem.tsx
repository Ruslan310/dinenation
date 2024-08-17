import React, {ReactNode} from 'react';
import styles from "./WeeklyMenu.module.css";
import {Popover} from "antd";
import resize from "../../assets/image/resizeSVG.svg";
import activeDay from "../../assets/image/activeDay.svg";
import selectDay from "../../assets/image/selectDay.svg";
import classNames from "classnames";
import {ProductForm} from "../AdminPanel/Product/UpdateProduct";
import {CartList} from "./WeeklyMenu";
import {colorTheme} from "../../utils/theme";

interface Props {
  productList: ProductForm[];
  cart: CartList | undefined;
  showInfo: number | undefined;
  setShowInfo: (value: number | undefined) => void;
  popoverHandle: (value: ProductForm, isMain: boolean) => ReactNode;
  onProductClick: (e: React.MouseEvent, image: string) => void;
  isMain?: boolean;
}

const ProductItem = ({
                       productList,
                       cart,
                       showInfo,
                       setShowInfo,
                       popoverHandle,
                       onProductClick,
                       isMain = false,
}: Props) => {
  const isProductInCart = (product: ProductForm): boolean => {
    if (cart) {
      const dishType = product.dish_type as keyof typeof cart.products; // Приведение типа
      const productInCart = cart.products[dishType];
      return productInCart ? productInCart.id === product.id : false;
    }
    return false;
  };

  return (
    <div className={styles.pageList}>
      {productList.map(product => {
        let select = showInfo === product.id
        let active = isProductInCart(product)
        return (
          <Popover
            overlayClassName={styles.customPopover}
            trigger="click"
            color={colorTheme.navbar}
            arrow={false}
            key={product.id}
            open={select}
            onOpenChange={e => !e && setShowInfo(undefined)}
            content={() => popoverHandle(product, isMain)}
          >
            <div className={styles.productBlock} onClick={() => {
              setShowInfo(product.id)
            }}>
              <div
                className={styles.imageResizeBlock}
                onClick={e => onProductClick(e, product.image)}
              >
                <img src={resize} alt="component photo" className={styles.imageResize}/>
              </div>
              {active && <img src={activeDay} alt="component photo" className={styles.imageActive}/>}
              {active && <img src={selectDay} alt="component photo" className={styles.imageSelect}/>}
              <div
                className={classNames(
                  styles.imageProductBlock,
                  {[styles.activeImageProduct]: select},
                  {[styles.selectImageProduct]: active}
                )}
              >
                <img
                  src={product.image}
                  alt="component photo"
                  className={styles.imageProduct}
                />
              </div>
              <p className={styles.imageDescription}>{product?.title}</p>
            </div>
          </Popover>
        )
      })}
    </div>
  )
};

export default ProductItem;
