import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import LogoLoader from "../../components/LogoLoader/LogoLoader";
import {useNavigate} from "react-router-dom";
import {Modal, Badge} from "antd";
import checked from '../../assets/image/checked.svg'
import Avatar from "../../components/Avatar/Avatar";
import {
  CATEGORIES_TYPE,
  CATEGORIES_TYPE_SORT,
  ComponentType,
  DishType, EStatusType,
  EWEEK_DAY, PageConfig,
  ROLE,
  WEEKDAY_ORDER
} from "../../utils/utils";
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
  generateUniqueId,
  openDay,
  openWeek,
} from "../../utils/handle";
import ArrowsSwg from "../../components/svg/ArrowsSWG";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";
import WaitDish from "./WaitDish";
import {ProductForm, SideDishType} from "../../utils/type";
import MenuSvg from "../../components/svg/MenuSvg";
const toOldSite = import.meta.env?.VITE_LINK_URL

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
  breakfast?: string;
}

export interface AddCartType {
  product?: ProductForm;
  sauce?: string;
  breakfast?: string;
  sideDish?: SideDishType;
  isBlockDay: boolean;
}

const WeeklyMenu = () => {
  const navigate = useNavigate();
  const [daysList, setDaysList] = useState<EWEEK_DAY[] | undefined>([]);
  const [exceptionWeekDays, setExceptionWeekDays] = useState<EWEEK_DAY[]>([]);
  const [showResizeModal, setShowResizeModal] = useState<string>('')
  const [showProductInfo, setShowProductInfo] = useState<number>()
  const [selectDay, setSelectDay] = useState<EWEEK_DAY>(EWEEK_DAY.MONDAY)
  const [selectCombo, setSelectCombo] = useState<ComboForm | undefined>(undefined);
  const {cartList, setCartList, userData} = useContext(MainContext);
  const pageRef = useRef<HTMLDivElement>(null);
  const daysRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [imageWidth, setImageWidth] = useState<number | undefined>(undefined);
  const multiOrder = useMemo(() => userData?.role === ROLE.HR, [userData?.role]);
  // const multiOrder = userData?.role !== ROLE.HR;


  const [sideDishes] = useTypedQuery({
    query: {
      sideDishes: {
        title: true,
        type: true,
        description: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [orders] = useTypedQuery({
    query: {
      ordersCheckById: {
        __args: {
          customer_id: userData?.id ?? 0,
          status: EStatusType.PROCESSING,
        },
        id: true,
        number: true,
        products: {
          week_day: true,
        }
      },
    },
    pause: !userData?.id,
    requestPolicy: 'network-only',
  });

  const queryDomain = userData?.coupon?.domain?.id ?? 133;

  const [combos] = useTypedQuery({
    query: {
      domain: {
        __args: {
          id: queryDomain
        },
        id: true,
        title: true,
        combos: {
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
            small_img: true,
            categories: true,
            dish_type: true,
            allergens: true,
            sauces: true,
            calories: true,
            is_dish: true,
          },
        },
      },
    },
    pause: !userData,
    // requestPolicy: 'cache-and-network',
    requestPolicy: 'network-only',
  });

  console.log('----combos', combos)

  useEffect(() => {
    const currentCombo = combos.data?.domain?.combos;
    // let exceptionDays: string[] = []
    if (orders.data && orders.data?.ordersCheckById && userData?.coupon?.check_order) {
      const days = orders?.data?.ordersCheckById
        .flatMap(order =>
          order.products.map(product => product.week_day))
        .filter((value, index, self) => self.indexOf(value) === index) || [];

      if (days?.length) {
        setExceptionWeekDays(days as EWEEK_DAY[])
      }
    }
    if (currentCombo && currentCombo?.length > 0) {
      const todayIndex = currentDayIndex;
      const isAfterTenAM = openDay(); // Проверка, что время после 10:00
      const isFriday = currentDayIndex === WEEKDAY_ORDER.indexOf(EWEEK_DAY.FRIDAY);
      const isAfterFridayThreePM = isFriday && openWeek(); // Пятница после 15:00
      const isFridayBetweenTenAndThree = isFriday && isAfterTenAM && !openWeek(); // Пятница с 10:00 до 15:00
      const isWeekend = currentDayIndex > WEEKDAY_ORDER.indexOf(EWEEK_DAY.FRIDAY); // Пятница или выходные
      const isBeforeMondayTenAM = todayIndex === WEEKDAY_ORDER.indexOf(EWEEK_DAY.MONDAY) && !isAfterTenAM; // Понедельник до 10:00

      const comboDays = currentCombo.map(combo => capitalizeFirstLetter(combo.week_day)) as EWEEK_DAY[];

      let days: EWEEK_DAY[];

      if (isFridayBetweenTenAndThree) {
        setDaysList(undefined);
        return
      } else if (isAfterFridayThreePM || isWeekend || isBeforeMondayTenAM) {
        days = comboDays.slice();
      } else {
        days = comboDays.filter(day => {
          const dayIndex = WEEKDAY_ORDER.indexOf(day as EWEEK_DAY);
          return dayIndex > todayIndex || (dayIndex === todayIndex && !isAfterTenAM);
        }) as EWEEK_DAY[];
      }

      setDaysList(days.sort((a, b) => WEEKDAY_ORDER.indexOf(a as EWEEK_DAY) - WEEKDAY_ORDER.indexOf(b as EWEEK_DAY)));

      if (days?.length > 0) {
        handleSelectDay(days[0]);
      }
    }
  }, [combos.data, orders.data]);


  const currentList = useMemo(() => {
    return cartList.find(list => list.day === selectDay && (multiOrder ? !list.isBlockDay : true));
  }, [selectDay, cartList]);
  const isTypeDish = (type: ComponentType)=> currentList ? currentList.products[type] : false
  const isSecond = () => !!selectCombo?.products.find(product => product.dish_type === ComponentType.SECOND)

  const handleSelectDay = useCallback((day: EWEEK_DAY) => {
    const currentCombo = combos.data?.domain.combos.find(comboDay => comboDay.week_day === day?.toUpperCase())
    setSelectDay(day)
    setSelectCombo(currentCombo as ComboForm | undefined);
    if (daysRefs.current[day]) {
      daysRefs.current[day]?.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
    setTimeout(() => {
      if (pageRef.current) {
        pageRef?.current.scrollIntoView({behavior: 'smooth'});
      }}, 0);
  }, [combos.data, daysRefs])

  const isBlockDay = (day: EWEEK_DAY): boolean => cartList.find(list => list.day === day)?.isBlockDay ?? false;

  const productSelectHandle = (e: React.MouseEvent, image: string) => {
    e.preventDefault()
    e.stopPropagation()
    setShowResizeModal(image)
    setShowProductInfo(undefined)
  }

  const isNextDay = () => {
    if (!daysList) return
    let isNext = true
    const currentIndex = daysList?.indexOf(selectDay);
    for (let i = 1; i < daysList?.length; i++) {
      const nextDay = daysList && daysList[(currentIndex + i) % daysList?.length];
      if (!isBlockDay(nextDay)) {
        isNext = false
        break
      }
    }
    return isNext
  };

  const currentComboPrice = useMemo(() => {
    let total = 0;
    if (currentList?.products) {
      if (currentList.products[DishType.MAIN] && currentList.products[DishType.MAIN].price) {
        total += currentList.products[DishType.MAIN].price || 0;
      }
      if (currentList.products.Dessert && currentList.products.Dessert.price) {
        total += currentList.products.Dessert.price || 0;
      }
    }
    return total;
  }, [selectCombo, cartList]);

  const handleNextDay = () => {
    addToCart({isBlockDay: true})
    if (multiOrder) {
      setTimeout(() => {
        if (pageRef.current) {
          pageRef?.current.scrollIntoView({behavior: 'smooth'});
        }}, 0);
      return;
    }
    if (!daysList) return;
    const currentIndex = daysList?.indexOf(selectDay);
    for (let i = 1; i < daysList?.length; i++) {
      const nextDay = daysList && daysList[(currentIndex + i) % daysList?.length];
      if (!isBlockDay(nextDay)) {
        handleSelectDay(nextDay)
        break
      }
    }
  }

  const orderCount = useCallback((day: EWEEK_DAY) =>
      cartList.reduce((acc, order) =>
        order.isBlockDay && order.day === day ? acc + 1 : acc, 0),
    [cartList]
  );

  const weekDaysList= daysList?.map(day => {
    const orderCountLength = orderCount(day)
    return (
      <div
        key={day}
        onClick={() => handleSelectDay(day)}
        className={classNames(styles.daysBlock,
          {
            [styles.selectDay]: selectDay === day,
            [styles.closeDay]: selectDay !== day && isBlockDay(day) && !multiOrder,
            [styles.blockDay]: exceptionWeekDays.includes(day)
          })}>
        {multiOrder && <Badge count={orderCountLength} className={styles.orderCount}/>}
        <img src={checked} alt="checked"/>
        <span>{day}</span>
      </div>
    )
  });


  const weekDaysListMobile= daysList?.map(day => {
    const orderCountLength = orderCount(day)
    return (
      <div
        key={day}
        onClick={() => handleSelectDay(day)}
        ref={(el) => (daysRefs.current[day] = el)}
        className={classNames(styles.daysBlockMobile,
          {
            [styles.selectDay]: selectDay === day,
            [styles.closeDay]: selectDay !== day && isBlockDay(day) && !multiOrder,
          })}>
        {multiOrder && <Badge count={orderCountLength} className={styles.orderCount}/>}
        <img src={checked} alt="checked"/>
        <span>{day}</span>
      </div>
    )
  });

  const addToCart = ({ product, sauce = '', breakfast = 'no', sideDish, isBlockDay = false }: AddCartType) => {
    if (!localStorage.getItem('cartTimestamp')) {
      localStorage.setItem('cartTimestamp', new Date().getTime().toString());
    }

    setCartList((prevState: CartList[]) => {
      let dayExists = false;

      const updatedCartList = prevState.map(cartItem => {
        if (cartItem.day === selectDay && (!multiOrder || !cartItem.isBlockDay)) {
          dayExists = true;
          return {
            ...cartItem,
            isBlockDay: cartItem.isBlockDay || isBlockDay,
            price: selectCombo?.price,
            products: {
              ...cartItem.products,
              ...(product ? { [String(product.dish_type)]: product } : {}),
            },
            [DishType.SIDE]: sideDish
              ? { ...cartItem[DishType.SIDE], ...sideDish, title: sideDish.title ?? cartItem[DishType.SIDE]?.title }
              : cartItem[DishType.SIDE],
            [DishType.SAUCE]: product?.dish_type === DishType.MAIN ? sauce : cartItem[DishType.SAUCE],
            breakfast: product?.dish_type === DishType.MAIN
              ? (breakfast === 'breakfast' ? 'breakfast' : breakfast === 'no' ? '' : cartItem.breakfast)
              : cartItem.breakfast,
          };
        }
        return cartItem;
      });

      if ((!dayExists || (multiOrder && isBlockDay)) && product) {
        updatedCartList.push({
          id: generateUniqueId(),
          day: selectDay,
          isBlockDay,
          price: selectCombo?.price,
          products: { [String(product.dish_type)]: product },
          [DishType.SIDE]: sideDish,
          [DishType.SAUCE]: sauce,
          breakfast: product?.dish_type === DishType.MAIN
            ? (breakfast === 'breakfast' ? 'breakfast' : breakfast === 'no' ? '' : undefined)
            : undefined,
        });
      }

      const encryptedData = encryptData(JSON.stringify(updatedCartList));
      localStorage.setItem('cartList', encryptedData);

      return updatedCartList;
    });

    setShowProductInfo(undefined);
  };


  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const imgElement = e.currentTarget;
    setImageWidth(imgElement.naturalWidth);
  };

  const isDisableNext = !isTypeDish(ComponentType.MAIN) ||
    (isSecond() && !isTypeDish(ComponentType.SECOND)) ||
    (!isSecond() && !isTypeDish(ComponentType.MAIN))

  return (
    <div className={styles.home}>
      {/* show image modal */}
      <Modal
        closeIcon={<img src={closeImage} alt="close"/>}
        open={!!showResizeModal}
        onCancel={() => setShowResizeModal('')}
        footer={null}
        centered
        styles={{
          content: {padding: 0},
          body: {lineHeight: 0}
        }}
        style={{ width: imageWidth || 'auto'}}
      >
        <img
          src={showResizeModal}
          alt="full screen"
          onLoad={handleImageLoad}
          style={{
            borderRadius: 8,
            width: '100%',
            height: 'auto',
            maxHeight: '90vh',
          }}
        />
      </Modal>
      <div className={styles.navbar}>
        <LogoSvg
          style={{cursor: "pointer"}}
          click={() => window.location.href = toOldSite}
          type={logoType.VERTICAL}
        />
        <div className={styles.weekList}>
          {weekDaysList}
        </div>
        <div>
          <div
            onClick={() => navigate(PageConfig.checkout)}
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
            click={() => navigate(PageConfig.history)}
          />
        </div>
      </div>
      {combos.fetching || (!selectCombo && combos.data && Array.isArray(daysList)) ?
        <LogoLoader /> :
        selectCombo ?
          <div className={styles.page}>
            {/* footer web */}
            <div className={styles.footerButtonBlock}>
              <Button
                disabled={isDisableNext}
                onClick={() => {
                  if (!isDisableNext) {
                    handleNextDay()
                    if (isNextDay() && !multiOrder) {
                      navigate(PageConfig.checkout)
                    }
                  }
                }}
                className={styles.nextButton}>
                <div className={styles.buttonContainer}>
                  <p>{multiOrder ? 'Add to Cart' : 'Next'}</p>
                  <ArrowsSwg type='right' color={colorTheme.white}/>
                </div>
              </Button>
              <Button
                disabled={!cartList.find(item => item.isBlockDay)}
                onClick={() => navigate(PageConfig.checkout)}
                iconPosition='right'
                className={styles.checkoutButton}>
                <div className={styles.buttonContainer}>
                  <p>Proceed to Checkout</p>
                  <CartSvg color={colorTheme.white} style={{marginLeft: 8}}/>
                </div>
              </Button>
            </div>

            {/* main menu */}
            <div ref={pageRef} className={styles.headerBlock}>
              <div className={classNames(styles.titleComboMobile,
                {[styles.hidePrice]: userData?.coupon.hide_price}
              )}>
                <span> Select Your Corporate Lunch Combo</span>
                <span className={styles.priceDish}>{currency(currentComboPrice, userData?.coupon.hide_price)}</span>
              </div>
              <div className={styles.headerMobileWrapper}>
                <div className={styles.headerMobile}>
                  {weekDaysListMobile}
                </div>
              </div>
              <div className={styles.pageTitleBlock}>
                <div className={styles.titleDish}>
                  <span className={classNames(styles.titleNumber,
                    {[styles.activeTitleNumber]: isTypeDish(ComponentType.MAIN)}
                  )}>1</span>
                  <span className={classNames(styles.titleText,
                    {[styles.activeTitleText]: isTypeDish(ComponentType.MAIN)}
                  )}>Step / {ComponentType.MAIN}</span>
                </div>
                <div className={styles.titleCombo}>
                  <span> Select Your Corporate Lunch Combo</span>
                  <span className={styles.priceDish}>{currency(currentComboPrice, userData?.coupon.hide_price)}</span>
                </div>
              </div>
              <ProductItem
                productList={selectCombo?.products
                  .filter(product => product.dish_type === ComponentType.MAIN)
                  .sort((a, b) => CATEGORIES_TYPE_SORT.indexOf(a.categories as CATEGORIES_TYPE) - CATEGORIES_TYPE_SORT.indexOf(b.categories as CATEGORIES_TYPE))
                }
                exceptionWeekDays={exceptionWeekDays}
                selectDay={selectDay}
                cart={currentList}
                showInfo={showProductInfo}
                onProductClick={productSelectHandle}
                setShowInfo={setShowProductInfo}
                sideDishes={sideDishes.data?.sideDishes || []}
                addToCart={addToCart}
                isMain
              />
            </div>

            {/* side menu */}
            {!!selectCombo?.products.filter(product => product.dish_type === ComponentType.SECOND)?.length &&
              <div className={classNames(styles.productSection, {[styles.productSectionActive]: isTypeDish(ComponentType.MAIN)})}>
                <div className={styles.pageTitleBlock}>
                  <div className={styles.titleDish}>
                    <span className={classNames(styles.titleNumber, {[styles.activeTitleNumber]: isTypeDish(ComponentType.SECOND)})}>
                      2
                    </span>
                    <span className={classNames(styles.titleText,
                      {[styles.activeTitleText]: isTypeDish(ComponentType.SECOND)})}>Step / {ComponentType.SECOND}
                    </span>
                  </div>
                </div>
                <ProductItem
                  productList={selectCombo?.products
                    .filter(product => product.dish_type === ComponentType.SECOND)
                    .sort((a, b) => CATEGORIES_TYPE_SORT.indexOf(a.categories as CATEGORIES_TYPE) - CATEGORIES_TYPE_SORT.indexOf(b.categories as CATEGORIES_TYPE))
                  }
                  exceptionWeekDays={exceptionWeekDays}
                  selectDay={selectDay}
                  cart={currentList}
                  showInfo={showProductInfo}
                  onProductClick={productSelectHandle}
                  setShowInfo={setShowProductInfo}
                  sideDishes={sideDishes.data?.sideDishes || []}
                  addToCart={addToCart}
                />
              </div>
            }

            {/* dessert */}
            {!!selectCombo?.products.filter(product => product.dish_type === ComponentType.DESSERT)?.length &&
              <div className={classNames(styles.productSection, styles.sss,{[styles.productSectionActive]: isTypeDish(ComponentType.SECOND)})}>
                <div className={styles.pageTitleBlock}>
                  <div className={styles.titleDish}>
                    <span className={classNames(styles.titleNumber, {[styles.activeTitleNumber]: isTypeDish(ComponentType.DESSERT)})}>
                      3
                    </span>
                    <span className={classNames(styles.titleText, {[styles.activeTitleText]: isTypeDish(ComponentType.DESSERT)})}>
                      Step / {ComponentType.DESSERT}
                    </span>
                  </div>
                </div>
                <ProductItem
                  productList={selectCombo?.products
                    .filter(product => product.dish_type === ComponentType.DESSERT)
                    .sort((a, b) => CATEGORIES_TYPE_SORT.indexOf(a.categories as CATEGORIES_TYPE) - CATEGORIES_TYPE_SORT.indexOf(b.categories as CATEGORIES_TYPE))
                  }
                  exceptionWeekDays={exceptionWeekDays}
                  selectDay={selectDay}
                  cart={currentList}
                  showInfo={showProductInfo}
                  onProductClick={productSelectHandle}
                  setShowInfo={setShowProductInfo}
                  sideDishes={sideDishes.data?.sideDishes || []}
                  addToCart={addToCart}
                />
              </div>
            }

            {/* footer mobil */}
            <div className={styles.mobileFooterBlock}>
              <div className={styles.avatarMobile}>
                <Button
                  disabled={!cartList.find(item => item.isBlockDay)}
                  onClick={() => {
                    // handleNextDay()
                    navigate(PageConfig.checkout)
                  }}
                  className={styles.buttonContainerMobile}>
                  <MenuSvg
                    color={!cartList.find(item => item.isBlockDay) ?
                      colorTheme.white :
                      colorTheme.active
                    }
                  />
                </Button>
                <p className={styles.avatarMobileText}>Cart</p>
              </div>
              <div className={styles.buttonContainerCenter}>
                <Button
                  disabled={isSecond() && !isTypeDish(ComponentType.SECOND) || !isSecond() && !isTypeDish(ComponentType.MAIN)}
                  onClick={() => {
                    handleNextDay()
                    if (isNextDay()) {
                      navigate(PageConfig.checkout)
                    }
                  }}
                  className={styles.mobileFooterButton}>
                  <CartSvg color={colorTheme.white}/>
                </Button>
                <p className={styles.avatarMobileText}>Add to Cart</p>
              </div>
              <Avatar
                size={36}
                isActive
                click={() => navigate(PageConfig.history)}
                showFullName
                fullNameStyle={styles.avatarMobileText}
              />
            </div>
          </div>
          : <WaitDish/>
      }
    </div>
  );
};

export default WeeklyMenu;
