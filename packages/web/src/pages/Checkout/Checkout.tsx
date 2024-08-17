import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./Checkout.module.css";
import classNames from "classnames";
import logo from "../../assets/image/Logo.svg";
import {StarFilled} from '@ant-design/icons';
import {Modal, Select} from "antd";
import {ComponentType, DaysList, DishType, EStatusType, EWEEK_DAY, WEEKDAY_ORDER} from "../../utils/utils";
import SelectedOrder from "../../components/SelectedImage/SelectedOrder";
import SideDishSvg from "../../components/svg/SideDishSvg";
import CartSvg from "../../components/svg/CartSvg";
import {MainContext} from "../../contexts/MainProvider";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Button from "../../components/Button/Button";
import {CartList} from "../WeeklyMenu/WeeklyMenu";
import {useNavigate} from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import arrowRight from "../../assets/image/arrowRight.svg";
import {colorTheme} from "../../utils/theme";
import {currency} from "../../utils/handle";

const today = new Date();
const currentDay = DaysList[today.getDay()-1]

interface OrderCreate {
  status: string,
  price: string,
  coupon_id: number,
  customer_id: number,
  comment: string | null | undefined,
}

interface BoxCreate {
  sticker: string,
  type: string,
  week_day: string,
  image: string,
  office: string | null | undefined,
  side_dish: string | null | undefined,
  side_dish_type: string | null | undefined,
  sauce: string | null | undefined,
  order_id: number,
  combo_id: number,
}

const Checkout = () => {
  const navigate = useNavigate();
  const {cartList, setCartList, userData} = useContext(MainContext);
  const [removeModal, setRemoveModal] = useState<CartList | undefined>()
  const [submitModal, setSubmitModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const coupon_id = 1; //TODO

  console.log('---cartList', cartList)

  const filteredCartList = useMemo(() => {
    return cartList.filter(list => list.isBlockDay)
  }, [cartList])

  useEffect(() => {
    if (!cartList.length) {
      navigate("/")
    }
  }, [cartList])

  const [office] = useTypedQuery({
    query: {
      officesByCoupon: {
        __args: {
          coupon_id: coupon_id
        },
        id: true,
        title: true,
      },
    },
  });

  const [order, addOrder] = useTypedMutation((opts: OrderCreate) => ({
    createOrder: {
      __args: opts,
      id: true
    },
  }));

  const [box, addBox] = useTypedMutation((opts: BoxCreate) => ({
    createBox: {
      __args: opts,
      id: true
    },
  }));

  const isHasOffice = () => !!office.data?.officesByCoupon.length && filteredCartList.every(order => order.office);

  const handleOffice = (value: string, day: EWEEK_DAY) => {
    setCartList((prevCartList: CartList[]) => {
      return prevCartList.map(cartItem => {
        if (cartItem.day === day) {
          return {
            ...cartItem,
            office: value,
          };
        }
        return cartItem;
      });
    });
  };

  const removeDay = (id: number) => {
    setCartList(prevOrders => prevOrders.filter(cartItem => cartItem.id !== id));
    setRemoveModal(undefined);
  };

  const sumPrices = useMemo(() => {
    let total = 0;

    for (const day in filteredCartList) {
      const dayObject = filteredCartList[day];

      if (dayObject) {
        // Суммируем цену на первом уровне, если она есть
        if (dayObject.price) {
          total += parseFloat(dayObject.price || "0");
        }

        // Проверяем, есть ли объект 'products' с десертом и суммируем цену десерта
        if (dayObject.products && dayObject.products.Desert && dayObject.products.Desert.price) {
          total += parseFloat(dayObject.products.Desert.price || "0");
        }
      }
    }

    return total.toFixed(2);;
  }, [filteredCartList]);

  const createBox = async (data: BoxCreate) => {
    const result = await addBox(data)
    console.log('-----result', result)
  }

  const submitOrder = async () => {
    setSubmitModal(false)
    console.log('-------finish order------')
    try {
      if (userData) {
        const {data} = await addOrder({
          status: EStatusType.PROCESSING,
          // status: EStatusType.COMPLETED,
          price: sumPrices,
          coupon_id: coupon_id,
          customer_id: userData?.id,
          comment: '',
        })
        console.log('----newOrder----', data)
        if (data?.createOrder) {
          cartList.forEach(cartItem => {
            const {day, office, Sauce, id} = cartItem
            Object.values(cartItem.products).forEach(product => {
              const isMain = product.dish_type === DishType.MAIN
              createBox({
                sticker: product.title,
                type: product.dish_type,
                week_day: day,
                image: product.image,
                office: office,
                side_dish: isMain ? cartItem[DishType.SIDE]?.title : '',
                side_dish_type: isMain ? cartItem[DishType.SIDE]?.type : '',
                sauce: isMain ? Sauce : '',
                order_id: data?.createOrder.id,
                combo_id: id,
              });
            });
          });
          setMessage('Your order has been accepted!')
        }
      }
    } catch (err) {
      console.error(err)
      setMessage('An error occurred while creating your order.!')
    }
  };

  return (
    <div className={styles.page}>
      {(order.fetching || box.fetching) && <Loader />}
      <Modal
        open={!!removeModal}
        onCancel={() => setRemoveModal(undefined)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>Are you sure you want to remove {removeModal?.day}?</h3>
          <Button onClick={() => removeModal && removeDay(removeModal?.id)}>OK</Button>
        </div>
      </Modal>
      <Modal
        open={submitModal}
        onCancel={() => setSubmitModal(false)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>Would you like to complete your order?</h3>
          <Button onClick={submitOrder}>OK</Button>
        </div>
      </Modal>
      <Modal
        open={!!message}
        onCancel={() => setSubmitModal(false)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>{message}</h3>
          <Button onClick={() => {
            setMessage('')
            navigate('/history')
            setCartList([])
          }}>OK</Button>
        </div>
      </Modal>
      {/* header  */}
      <div className={styles.headerContainer}>
        <div className={classNames(styles.contentBlock, styles.headerBlock)}>
          <div>
            <h1>Checkout</h1>
            <span>Your Price </span>
            <span style={{color: colorTheme.active}}>{currency(sumPrices)}</span>
          </div>
          <img src={logo} alt="Logo"/>
        </div>
      </div>
      <div className={styles.footerContainer}>
        {/* footer button  */}
        {filteredCartList?.length &&
          <div className={styles.footerButtonBlock}>
            <Button
              onClick={() => setSubmitModal(true)}
              iconPosition='left'
              className={styles.submitButton}
              icon={<img src={arrow} alt="" />}>
              <div className={styles.buyButtonContainer}>
                <CartSvg color={colorTheme.white} style={{marginRight: '8px'}}/>
                <p>Total ( {currency(sumPrices)} ) Place Order</p>
                <p className={styles.buyButtonCountDay}>{Object.keys(filteredCartList)?.length} days</p>
              </div>
            </Button>
            <Button
              disabled={!isHasOffice()}
              onClick={() => setSubmitModal(true)}
              iconPosition='right'
              className={styles.submitButton}
              icon={<img src={arrowRight} alt="" />}>
              <div className={styles.buyButtonContainer}>
                <CartSvg color={colorTheme.white} style={{marginRight: '8px'}}/>
                <p>Total ( {currency(sumPrices)} ) Place Order</p>
                <p className={styles.buyButtonCountDay}>{Object.keys(filteredCartList)?.length} days</p>
              </div>
            </Button>
          </div>
        }
        {/* list  */}
        <div className={classNames(styles.contentBlock, styles.footerBlock)}>
          {filteredCartList
            .sort((a, b) =>
              WEEKDAY_ORDER.indexOf(a.day) - WEEKDAY_ORDER.indexOf(b.day))
            .map((cartItem, index) => (
              <div key={`${index}+${cartItem.day}`} className={styles.orderItem}>
                <div className={styles.orderHeaderTitleContainer}>
                  <div className={styles.daysHeaderBlock}>
                    <p className={styles.headerText}>{cartItem.day}</p>
                    {cartItem.day?.toLowerCase() === currentDay?.toLowerCase() ?
                      <>
                        <StarFilled className={styles.starIcon}/>
                        <p className={styles.headerText} style={{color: '#40C677'}}>Today</p>
                      </> :
                      <div onClick={() => setRemoveModal(cartItem)} className={styles.removeOrder}>
                        <span>Remove</span>
                      </div>
                    }
                  </div>
                  {office.data?.officesByCoupon.length &&
                    <div className={styles.daysHeaderBlock}>
                      <p>Choose an address</p>
                      <Select<string, { value: string; children: string }>
                        style={{width: '204px'}}
                        value={cartItem.office}
                        placeholder="Select your address"
                        onChange={(value) => handleOffice(value, cartItem.day)}
                        filterOption={(input, option) =>
                          option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                        }
                      >
                        {office.data?.officesByCoupon
                          .map(({id, title}) => <Select.Option key={id} value={title}>{title}</Select.Option>)}
                      </Select>
                    </div>
                  }
                </div>
                <div className={styles.orderBlock}>
                  {Object.values(cartItem.products)
                    .filter(product => !!product)
                    .map((product, index) => (
                      <div
                        key={product?.dish_type}
                        style={{maxWidth: product?.dish_type === ComponentType.MAIN ? '558px' : '339px'}}
                        className={styles.orderItemContent}>
                        <div className={styles.orderHeaderBlock}>
                          <p>{index+1}</p>
                          <h3>{product?.dish_type}</h3>
                        </div>
                        <div className={styles.orderItemBlock}>
                          <SelectedOrder style={{marginRight: '16px'}} image={product?.image} isSelected/>
                          <div>
                            <p>{product?.title}</p>
                            {product.dish_type === DishType.MAIN &&
                              <div className={styles.itemRow}>
                                {cartItem[DishType.SIDE] &&
                                  <div style={{marginRight: '16px'}} className={styles.sideBlock}>
                                    <p>Side Dish</p>
                                    <div className={styles.itemRowDish}>
                                      <SideDishSvg style={{marginRight: '8px'}} type={cartItem[DishType.SIDE]?.type}/>
                                      <span>{cartItem[DishType.SIDE]?.title}</span>
                                    </div>
                                  </div>
                                }
                                {cartItem.Sauce &&
                                  <div className={styles.sideBlock}>
                                    <p>Sauce</p>
                                    <div className={styles.subTitleSauce}>
                                      <span>{cartItem.Sauce}</span>
                                    </div>
                                  </div>
                                }
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
