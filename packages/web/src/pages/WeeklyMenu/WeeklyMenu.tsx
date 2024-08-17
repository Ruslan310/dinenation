import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import classNames from 'classnames';
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../components/Loader/Loading";
import Empty from "../../components/Empty";
import {useNavigate} from "react-router-dom";
import {ConfigProvider, Modal, Radio} from "antd";
import calories from "../../assets/image/calories.svg";
import checked from '../../assets/image/checked.svg'
import logo from '../../assets/image/Logo_v.svg'
import SideDishSvg from "../../components/svg/SideDishSvg";
import Avatar from "../../components/Avatar/Avatar";
import {EWEEK_DAY} from "../../utils/utils";
import {
  ComponentType,
  DishType,
  EAllergensList,
  EColorSideDishList,
} from "../../utils/utils";
import CartSvg from "../../components/svg/CartSvg";
import AllergensSvg from "../../components/svg/AllergensSvg";
import {ProductForm} from "../AdminPanel/Product/UpdateProduct";
import ProductItem from "./ProductItem";
import closeImage from "../../assets/image/closeImage.svg";
import arrowRight from "../../assets/image/arrowRight.svg";
import Button from "../../components/Button/Button";
import {MainContext} from "../../contexts/MainProvider";
import styles from "./WeeklyMenu.module.css";
import {colorTheme, colorSideDishList} from "../../utils/theme";
import {currency} from "../../utils/handle";


export interface ComboForm {
  id: number;
  title: string;
  price: string;
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
  price?: string;
  products: {
    [DishType.MAIN]?: ProductForm;
    [DishType.SECOND]?: ProductForm;
    [DishType.DESSERT]?: ProductForm;
  };
  [DishType.SIDE]?: SideDishType;
  [DishType.SAUCE]?: string;
}

interface SideDishType {
  title: string;
  type: string;
}

const noSauce = 'no sauce'

const generateUniqueId = (): number => Math.floor(Date.now() % 1000000000 + Math.random() * 1000);

const WeeklyMenu = () => {
  const navigate = useNavigate();
  const days = Object.values(EWEEK_DAY);
  const [showResizeModal, setShowResizeModal] = useState<string>('')
  const [showProductInfo, setShowProductInfo] = useState<number>()
  const [selectDay, setSelectDay] = useState<EWEEK_DAY>(EWEEK_DAY.MONDAY)
  const [selectCombo, setSelectCombo] = useState<ComboForm | undefined>(undefined);
  const {cartList, setCartList, userData} = useContext(MainContext);
  const pageRef = useRef<HTMLDivElement>(null);

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
          coupon_id: userData?.domain_id
        },
        id: true,
        title: true,
        coupon_id: true,
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
    const currentCombo = combos.data?.combosByCoupon.find(comboDay => comboDay.week_day === EWEEK_DAY.MONDAY.toUpperCase());
    setSelectCombo(currentCombo as ComboForm | undefined);
  }, [combos.data]);

  useEffect(() => {
    if (pageRef.current) {
      pageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectDay]);


  const currentList = useMemo(() => cartList.find(list => list.day === selectDay), [selectDay, cartList])
  const isTypeDish = (type: ComponentType)=> currentList ? currentList.products[type] : false

  const handleSelectDay = (day: EWEEK_DAY) => {
    const currentCombo = combos.data?.combosByCoupon.find(comboDay => comboDay.week_day === day.toUpperCase())
    setSelectDay(day)
    setSelectCombo(currentCombo as ComboForm | undefined);
  }
  const isBlockDay = (day: EWEEK_DAY) => cartList.find(list => list.day === day)?.isBlockDay ?? false;
  const closeModal = () => setShowResizeModal('')

  const productSelectHandle = (e: React.MouseEvent, image: string) => {
    e.preventDefault()
    e.stopPropagation()
    setShowResizeModal(image)
    setShowProductInfo(undefined)
  }

  const handleNextDay = () => {
    addToCart({isBlockDay: true})
    const currentIndex = days.indexOf(selectDay);
    for (let i = 1; i < days.length; i++) {
      const nextDay = days[(currentIndex + i) % days.length];
      if (!isBlockDay(nextDay)) {
        handleSelectDay(nextDay)
        break
      }
    }
  }


  {/* список дней недели */}
  const weekList= days.map(day => {
    return (
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
    )
  })

  console.log('----cartList', cartList)

  const addToCart = ({product, sauce = '', sideDish, isBlockDay = false}: {product?: ProductForm, sauce?: string, sideDish?: SideDishType, isBlockDay: boolean}) => {
    setCartList((prevState: CartList[]) => {
      const updatedCartList = prevState.map(cartItem => {
        if (cartItem.day === selectDay) {
          // Обновляем существующий день
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
              title: sideDish.title ?? cartItem[DishType.SIDE]?.title, // Приведение типа и использование дефолтного значения
            } : cartItem[DishType.SIDE],
            [DishType.SAUCE]: product?.dish_type === DishType.MAIN ? sauce : cartItem[DishType.SAUCE],
          };
        }
        return cartItem;
      });

      // Если день не найден в массиве, добавляем новый объект
      if (!updatedCartList.some(cartItem => cartItem?.day === selectDay)) {
        updatedCartList.push({
          id: generateUniqueId(),
          day: selectDay,
          isBlockDay: isBlockDay,
          price: selectCombo?.price,
          products: {
            [String(product?.dish_type)]: product, // Преобразуем в строку
          },
          [DishType.SIDE]: sideDish,
          [DishType.SAUCE]: sauce,
        });
      }

      return updatedCartList;
    });
    setShowProductInfo(undefined);
  };

  {/* попап в меин меню */}
  const popoverContent = (data: ProductForm, isMain: boolean) => {
    const [selectSauce, setSelectSauce] = useState<string>('')
    const [selectSideDish, setSideDish] = useState<SideDishType>()
    const [colorSideDish, setColorSideDish] = useState<string>('')

    return (
      <div className={styles.popoverContent}>
        <div className={styles.popoverCategories}>
          <p className={styles.titlePopover}>Categories: {data.categories}</p>
          <p className={styles.subTextPopover}>{data?.description}</p>
          <div className={styles.calories}>
            <img src={calories} alt=""/>
            <p>{data.calories || 0} calories</p>
          </div>
          <div className={styles.blockAllergen}>
            <p className={styles.titlePopover}>List of allergens</p>
            <div>
              {data.allergens?.length
                ? data.allergens?.split(',').map((allergen: string) =>
                  <AllergensSvg key={allergen} type={allergen as EAllergensList} className={styles.imageAllergen}/>
                )
                : <div>no allergens</div>}
            </div>
          </div>
          {data.sauces && data.sauces.length && isMain &&
            <div className={styles.popoverSauceBlock}>
              <p className={styles.titlePopover}>Choose a Sauce</p>
              <ConfigProvider theme={{token: {paddingXS: 16, colorPrimary: colorTheme.black}}}>
                <Radio.Group onChange={e => setSelectSauce(e.target.value)} value={selectSauce}>
                  {data.sauces?.split(',').map((sauce: string, index: number) =>
                    <Radio key={`${index}-${sauce}`} value={sauce}>{sauce}</Radio>)}
                  <Radio value={noSauce}>{noSauce}</Radio>
                </Radio.Group>
              </ConfigProvider>
            </div>
          }
        </div>
        <div className={styles.popoverChoose}>
          {isMain ?
            <div>
              <p className={styles.titlePopover}>Choose Side Dish</p>
              <div className={styles.sideDishBlock}>
                {/* стили для радио батон */}
                <ConfigProvider theme={{token: {colorPrimary: colorSideDish, fontSize: 12}}}>
                  <Radio.Group value={selectSideDish?.title}>
                    {sideDishes.data?.sideDishes.map(({type, title}) =>
                      <Radio
                        style={{backgroundColor: selectSideDish?.title === title ? colorSideDish : colorTheme.navbar}}
                        className={styles.sideDishRadioItem}
                        onClick={() => {
                          setColorSideDish(colorSideDishList[type as EColorSideDishList])
                          setSideDish({
                            title: title,
                            type: type
                          })
                        }}
                        value={title}
                        key={type}
                      >
                        <div className={styles.sideDishRadioContent}>
                          <SideDishSvg type={type} active={selectSideDish?.title === title}/>
                          <span>{title}</span>
                        </div>
                      </Radio>
                    )}
                  </Radio.Group>
                </ConfigProvider>
              </div>
            </div>
            : <div></div>
          }
          <Button
            icon={<CartSvg color={colorTheme.white} style={{marginLeft: '8px'}}/>}
            iconPosition='right'
            disabled={isMain
              && (!selectSideDish?.title || (data.sauces.length > 0 && !selectSauce))
              || isBlockDay(selectDay)}
            onClick={() => addToCart({
              product: data,
              sauce: selectSauce,
              sideDish: selectSideDish,
              isBlockDay: false,
            })}>
            <p>Add to Cart</p>
          </Button>
        </div>
      </div>
    )
  };


  return (
    <div className={styles.home}>
      {/* ресайз картинки */}
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
        <img onClick={closeModal}
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
        <img style={{marginBottom: '64px'}} src={logo} alt=""/>
        {weekList}
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
            fullName={userData?.full_name}
            classNamesContainer={styles.avatar}
            isActive
            isActiveFn={() => navigate('history')}
          />
        </div>
      </div>
      {combos.fetching ?
        <Loading/> :
        selectCombo ?
          <div className={styles.page}>
            {/* футер батон */}
            <div className={styles.footerButtonBlock}>
              <Button
                disabled={!isTypeDish(ComponentType.SECOND)}
                onClick={handleNextDay}
                iconPosition='right'
                className={styles.nextButton}
                icon={<img src={arrowRight} alt="" />}>
                <p>Next</p>
              </Button>
              <Button
                disabled={!isTypeDish(ComponentType.SECOND)}
                onClick={() => {
                  handleNextDay()
                  navigate('checkout')
                }}
                iconPosition='right'
                className={styles.checkoutButton}
                icon={<CartSvg color={colorTheme.white} style={{marginLeft: '8px'}}/>}>
                <p>Proceed to Checkout</p>
              </Button>
            </div>
            {/* меин меню */}
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
                popoverHandle={popoverContent}
                isMain
              />
            </div>
            {/* сайд меню */}
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
                popoverHandle={popoverContent}
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
                popoverHandle={popoverContent}
              />
            </div>
          </div>
          : <Empty>&#10024; Product list is empty &#10024;</Empty>
      }
    </div>
  );
};

export default WeeklyMenu;
