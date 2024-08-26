import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../components/Loader/Loading";
import Empty from "../../components/Empty";
import {useNavigate} from "react-router-dom";
import {Modal} from "antd";
import checked from '../../assets/image/checked.svg'
import Avatar from "../../components/Avatar/Avatar";
import {EWEEK_DAY, WEEKDAY_ORDER} from "../../utils/utils";
import {ComponentType, DishType} from "../../utils/utils";
import CartSvg from "../../components/svg/CartSvg";
import ProductItem from "./ProductItem";
import closeImage from "../../assets/image/closeImage.svg";
import Button from "../../components/Button/Button";
import {MainContext} from "../../contexts/MainProvider";
import styles from "./WeeklyMenu.module.css";
import {colorTheme} from "../../utils/theme";
import {
  capitalizeFirstLetter,
  currency,
  currentDayIndex,
  encryptData,
  generateUniqueId, openDay, openWeek,
} from "../../utils/handle";
import ArrowsSwg from "../../components/svg/ArrowsSWG";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";
import WaitDish from "./WaitDish";
import {ProductForm, SideDishType} from "../../utils/type";
import DishPopup from "./DishPopup";


export interface ComboForm {
  id: number;
  title: string;
  price: number;
  type: string;
  image: string;
  description: string | null | undefined;
  week_day: string;
  status: string;
  products: ProductForm[],
}

export interface CartList {
  id: number;
  day: EWEEK_DAY;
  isBlockDay: boolean;
  office?: string;
  price?: number;
  products: {
    [DishType.MAIN]?: ProductForm;
    [DishType.SECOND]?: ProductForm;
    [DishType.DESSERT]?: ProductForm;
  };
  [DishType.SIDE]?: SideDishType;
  [DishType.SAUCE]?: string;
}

export interface AddCartType {
  product?: ProductForm;
  sauce?: string;
  sideDish?: SideDishType;
  isBlockDay: boolean;
}

const WeeklyMenu = () => {
  const navigate = useNavigate();
  const [daysList, setDaysList] = useState<EWEEK_DAY[]>([]);
  const [showResizeModal, setShowResizeModal] = useState<string>('')
  const [showProductInfo, setShowProductInfo] = useState<number>()
  const [selectDay, setSelectDay] = useState<EWEEK_DAY>(EWEEK_DAY.MONDAY)
  const [selectCombo, setSelectCombo] = useState<ComboForm | undefined>(undefined);
  const {cartList, setCartList, userData} = useContext(MainContext);
  const pageRef = useRef<HTMLDivElement>(null);

  const changeTimeMenu = (): boolean => {
    return false
  }

  const [sideDishes] = useTypedQuery({
    query: {
      sideDishes: {
        title: true,
        type: true,
      },
    },
  });


  const [combos] = useTypedQuery({
    query: {
      combosByCoupon: {
        __args: {
          domain_id: userData?.coupon.domain.id || 0
        },
        id: true,
        title: true,
        description: true,
        price: true,
        image: true,
        week_day: true,
        type: true,
        products: {
          id: true,
          title: true,
          description: true,
          price: true,
          image: true,
          categories: true,
          dish_type: true,
          allergens: true,
          sauces: true,
          calories: true,
        },
      },
    },
  });

  useEffect(() => {
    const currentCombo = combos.data?.combosByCoupon;
    if (currentCombo && currentCombo.length > 0) {
      const todayIndex = currentDayIndex; // Индекс текущего дня
      const isAfterTenAM = openDay(); // Проверка, после ли 10:00 текущее время
      const isFriday = currentDayIndex === WEEKDAY_ORDER.indexOf(EWEEK_DAY.FRIDAY); // Проверка, что текущий день — пятница

      let days: EWEEK_DAY[];

      if (isFriday && openWeek()) {
        days = WEEKDAY_ORDER.slice() as EWEEK_DAY[];
      } else if (isFriday && isAfterTenAM) {
        days = [];
      } else {
        days = currentCombo
          .map(combo => capitalizeFirstLetter(combo.week_day))
          .filter(day => {
            const dayIndex = WEEKDAY_ORDER.indexOf(day as EWEEK_DAY);
            return dayIndex > todayIndex || (dayIndex === todayIndex && !isAfterTenAM);
          }) as EWEEK_DAY[];
      }

      setDaysList(days);

      if (days.length > 0) {
        handleSelectDay(days[0]);
      }
    }
  }, [combos.data]);


  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({behavior: 'smooth'});
    }
  }, [selectDay]);


  const currentList = useMemo(() => cartList.find(list => list.day === selectDay), [selectDay, cartList])
  const isTypeDish = (type: ComponentType)=> currentList ? currentList.products[type] : false

  const handleSelectDay = (day: EWEEK_DAY) => {
    const currentCombo = combos.data?.combosByCoupon.find(comboDay => comboDay.week_day === day.toUpperCase())
    setSelectDay(day)
    setSelectCombo(currentCombo as ComboForm | undefined);
  }
  const isBlockDay = (day: EWEEK_DAY): boolean => cartList.find(list => list.day === day)?.isBlockDay ?? false;
  const closeModal = () => setShowResizeModal('')

  const productSelectHandle = (e: React.MouseEvent, image: string) => {
    e.preventDefault()
    e.stopPropagation()
    setShowResizeModal(image)
    setShowProductInfo(undefined)
  }

  const handleNextDay = () => {
    addToCart({isBlockDay: true})
    const currentIndex = daysList?.indexOf(selectDay);
    for (let i = 1; i < daysList?.length; i++) {
      const nextDay = daysList && daysList[(currentIndex + i) % daysList.length];
      if (!isBlockDay(nextDay)) {
        handleSelectDay(nextDay)
        break
      }
    }
  }

  const weekDaysList= daysList?.map(day => (
    <div
      key={day}
      onClick={() => handleSelectDay(day)}
      className={classNames(
        styles.daysBlock,
        {
          [styles.selectDay]: selectDay === day,
          [styles.closeDay]: isBlockDay(day)
        })}>
      <img src={checked} alt=""/>
      <span>{day}</span>
    </div>
  ));

  const addToCart = ({product, sauce = '', sideDish, isBlockDay = false}: AddCartType) => {
    setCartList((prevState: CartList[]) => {
      const updatedCartList = prevState.map(cartItem => {
        if (cartItem.day === selectDay) {
          // update current day in cart
          return {
            ...cartItem,
            isBlockDay: cartItem.isBlockDay || isBlockDay,
            price: selectCombo?.price,
            products: {
              ...cartItem.products,
              ...(product ? {[String(product.dish_type)]: product} : {}), // Добавляем продукт, только если он существует
            },
            [DishType.SIDE]: sideDish ? {
              ...cartItem[DishType.SIDE],
              ...sideDish,
              title: sideDish.title ?? cartItem[DishType.SIDE]?.title,
            } : cartItem[DishType.SIDE],
            [DishType.SAUCE]: product?.dish_type === DishType.MAIN ? sauce : cartItem[DishType.SAUCE],
          };
        }
        return cartItem;
      });

      // if day don`t fide in arr, add new object
      if (!updatedCartList.some(cartItem => cartItem?.day === selectDay)) {
        updatedCartList.push({
          id: generateUniqueId(),
          day: selectDay,
          isBlockDay: isBlockDay,
          price: selectCombo?.price,
          products: {
            [String(product?.dish_type)]: product,
          },
          [DishType.SIDE]: sideDish,
          [DishType.SAUCE]: sauce,
        });
      }
      const jsonData = JSON.stringify(updatedCartList);
      const encryptedData = encryptData(jsonData);
      localStorage.setItem('cartList', encryptedData);

      return updatedCartList;
    });
    setShowProductInfo(undefined);
  };

  // if (changeTimeMenu()) {
  //   return <WaitDish />
  // }

  return (
    <div className={styles.home}>
      {/* show image modal */}
      <Modal
        closeIcon={<img src={closeImage} alt="component photo"/>}
        open={!!showResizeModal}
        onCancel={closeModal}
        footer={false}
        width={900}
        centered
        styles={{
          content: {padding: 0},
          body: {lineHeight: 0}
        }}
        style={{width: '900px'}}
      >
        <img
          onClick={closeModal}
          src={showResizeModal}
          alt="full screen"
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: '90vh'
          }}
        />
      </Modal>
      <div className={styles.navbar}>
        <LogoSvg type={logoType.VERTICAL} style={{marginBottom: '64px'}}/>
        {weekDaysList}
        <div>
          <div
            onClick={() => navigate('checkout')}
            className={classNames(styles.cartBox,
              {[styles.cartBoxDisabled]: !cartList.find(item => item.isBlockDay)}
            )}
          >
            <CartSvg />
          </div>
          <Avatar
            size={56}
            classNamesContainer={styles.avatar}
            isActive
            click={() => navigate('history')}
          />
        </div>
      </div>
      {combos.fetching ?
        <Loading/> :
        selectCombo ?
          <div className={styles.page}>
            {/* footer */}
            <div className={styles.footerButtonBlock}>
              <Button
                disabled={!isTypeDish(ComponentType.SECOND)}
                onClick={handleNextDay}
                className={styles.nextButton}>
                <div className={styles.buttonContainer}>
                  <p>Next</p>
                  <ArrowsSwg type='right' color={colorTheme.white} />
                </div>
              </Button>
              <Button
                disabled={!isTypeDish(ComponentType.SECOND)}
                onClick={() => {
                  handleNextDay()
                  navigate('checkout')
                }}
                iconPosition='right'
                className={styles.checkoutButton}>
                <div className={styles.buttonContainer}>
                  <p>Proceed to Checkout</p>
                  <CartSvg color={colorTheme.white} style={{marginLeft: '8px'}}/>
                </div>
              </Button>
            </div>
            {/* main menu */}
            <div ref={pageRef} style={{paddingTop: '23px'}}>
              <div className={styles.pageTitleBlock}>
                <div className={styles.titleDish}>
                  <span className={classNames(styles.titleNumber,
                    {[styles.activeTitleNumber]: isTypeDish(ComponentType.MAIN)}
                  )}>1</span>
                  <span className={classNames(styles.titleText,
                    {[styles.activeTitleText]: isTypeDish(ComponentType.MAIN)}
                  )}>Step / {ComponentType.MAIN}</span>
                </div>
                <div className={styles.titleDish}>
                  <span> Select Your Corporate Lunch Combo</span>
                  <span className={styles.priceDish}>{currency(selectCombo.price)}</span>
                </div>
              </div>
              <ProductItem
                productList={selectCombo?.products.filter(product => product.dish_type === ComponentType.MAIN)}
                cart={currentList}
                showInfo={showProductInfo}
                onProductClick={productSelectHandle}
                setShowInfo={setShowProductInfo}
                popoverHandle={(data) =>
                  <DishPopup
                    data={data}
                    isMain
                    sideDishes={sideDishes.data?.sideDishes || []}
                    selectDay={selectDay}
                    addToCart={addToCart}
                  />}
                isMain
              />
            </div>
            {/* side menu */}
            <div className={classNames(styles.productSection,
              {[styles.productSectionActive]: isTypeDish(ComponentType.MAIN)}
            )}>
              <div className={styles.pageTitleBlock}>
                <div className={styles.titleDish}>
                  <span className={classNames(styles.titleNumber,
                    {[styles.activeTitleNumber]: isTypeDish(ComponentType.SECOND)}
                  )}>2</span>
                  <span className={classNames(styles.titleText,
                    {[styles.activeTitleText]: isTypeDish(ComponentType.SECOND)}
                  )}>Step / {ComponentType.SECOND}</span>
                </div>
              </div>
              <ProductItem
                productList={selectCombo?.products.filter(product => product.dish_type === ComponentType.SECOND)}
                cart={currentList}
                showInfo={showProductInfo}
                onProductClick={productSelectHandle}
                setShowInfo={setShowProductInfo}
                popoverHandle={(data) =>
                  <DishPopup
                    data={data}
                    isMain
                    sideDishes={sideDishes.data?.sideDishes || []}
                    selectDay={selectDay}
                    addToCart={addToCart}
                  />}
              />
            </div>
            <div className={classNames(styles.productSection,
              {[styles.productSectionActive]: isTypeDish(ComponentType.SECOND)}
            )}>
              <div className={styles.pageTitleBlock}>
                <div className={styles.titleDish}>
                  <span className={classNames(styles.titleNumber,
                    {[styles.activeTitleNumber]: isTypeDish(ComponentType.DESSERT)}
                  )}>3</span>
                  <span className={classNames(styles.titleText,
                    {[styles.activeTitleText]: isTypeDish(ComponentType.DESSERT)}
                  )}>Step / {ComponentType.DESSERT}</span>
                </div>
              </div>
              <ProductItem
                productList={selectCombo?.products.filter(product => product.dish_type === ComponentType.DESSERT)}
                cart={currentList}
                showInfo={showProductInfo}
                onProductClick={productSelectHandle}
                setShowInfo={setShowProductInfo}
                popoverHandle={(data) =>
                  <DishPopup
                    data={data}
                    isMain
                    sideDishes={sideDishes.data?.sideDishes || []}
                    selectDay={selectDay}
                    addToCart={addToCart}
                />}
              />
            </div>
          </div>
          // : <Empty>&#10024; Dish list is empty &#10024;</Empty>
          : <WaitDish />
      }
    </div>
  );
};

export default WeeklyMenu;
