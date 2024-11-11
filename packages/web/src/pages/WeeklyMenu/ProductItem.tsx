import React, {useCallback, useMemo, useState} from 'react';
import styles from "./WeeklyMenu.module.css";
import {Popover} from "antd";
import classNames from "classnames";
import {CartList} from "./WeeklyMenu";
import {colorTheme} from "../../utils/theme";
import ResizeSvg from "../../components/svg/ResizeSvg";
import ActiveDaySvg from "../../components/svg/ActiveDaySvg";
import SelectSvg from "../../components/svg/SelectSvg";
import {ProductForm, SideDishType} from "../../utils/type";
import DishPopup from "./DishPopup";
import {EWEEK_DAY} from "../../utils/utils";
import ProductImage from "../../components/ProductImage/ProductImage";

interface Props {
  productList: ProductForm[];
  cart: CartList | undefined;
  showInfo: number | undefined;
  setShowInfo: (value: number | undefined) => void;
  onProductClick: (e: React.MouseEvent, image: string) => void;
  isMain?: boolean;
  open?: boolean;
  sideDishes: SideDishType[];
  exceptionWeekDays: string[];
  selectDay: EWEEK_DAY;
  addToCart: (params: {
    product?: ProductForm;
    sauce?: string;
    sideDish?: SideDishType;
    isBlockDay: boolean;
  }) => void;
}

const ProductItem = ({
                       productList,
                       cart,
                       showInfo,
                       setShowInfo,
                       sideDishes,
                       onProductClick,
                       addToCart,
                       exceptionWeekDays,
                       selectDay,
                       isMain = false,
}: Props) => {
  const [open, setOpen] = useState<boolean>(false);
  const isProductInCart = useMemo(() => (product: ProductForm): boolean => {
    if (cart) {
      const dishType = product.dish_type as keyof typeof cart.products;
      const productInCart = cart.products[dishType];
      return productInCart ? productInCart.id === product.id : false;
    }
    return false;
  }, [cart]);

  const handleProductClick = useCallback(
    (e: React.MouseEvent, image: string) => onProductClick(e, image),
    [onProductClick]
  );

  const handlePopoverChange = useCallback(
    (e: boolean) => !open && !e && setShowInfo(undefined),
    [open, setShowInfo]
  );

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
            onOpenChange={handlePopoverChange}
            content={() =>
              <DishPopup
                data={product}
                isMain={isMain}
                sideDishes={sideDishes}
                addToCart={addToCart}
                open={open}
                exceptionWeekDays={exceptionWeekDays}
                selectDay={selectDay}
                setOpen={setOpen}
                setShowInfo={setShowInfo}
              />}
          >
            <div className={styles.productBlock} onClick={() => setShowInfo(product.id)}>
              <div className={styles.imageResizeBlock} onClick={e => handleProductClick(e, product.image)}>
                <ResizeSvg/>
              </div>
              {active && <ActiveDaySvg className={styles.imageActive}/>}
              {active && <SelectSvg className={styles.imageSelect}/>}
              <div
                className={classNames(
                  styles.imageProductBlock,
                  {[styles.activeImageProduct]: select},
                  {[styles.selectImageProduct]: active}
                )}
              >
                <ProductImage image={product.image} placeholder={product.small_img} className={styles.imageProduct} />
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
