import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./OrderHistoryView.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import {
  ComponentType,
  DaysList,
  DishType,
  EWEEK_DAY,
  TStatusType,
  WEEKDAY_ORDER,
  WEEKDAY_ORDER_TYPE
} from "../../utils/utils";
import {currency} from "../../utils/handle";
import {StarFilled} from "@ant-design/icons";
import {Modal, Select} from "antd";
import Button from "../../components/Button/Button";
import SelectedOrder from "../../components/SelectedImage/SelectedOrder";
import SideDishSvg from "../../components/svg/SideDishSvg";
import FeedbackModal from "../../components/ReviewModal/FeedbackModal";
import Loader from "../../components/Loader/Loader";
import {NotFound} from "../index";

interface OrdersFields {
  id: number;
  price: number;
}

export type Product = {
  sticker: string;
  type: string;
  week_day: string;
  image: string;
  office: string | null | undefined;
  side_dish: string | null | undefined;
  side_dish_type: string | null | undefined;
  sauce: string | null | undefined;
  combo_id: number;
};

type ProductList = {
  [combo_id: number]: Product[];
}


type GroupedProducts = {
  [week_day: string]: ProductList;
};

const today = new Date();
const currentDay = DaysList[today.getDay()-1]

const OrderHistoryView = () => {
  const navigate = useNavigate();
  const currentId= useParams();
  const currentComboId = Number(currentId.id) as number
  const {userData} = useContext(MainContext);
  const [currentOrder, setCurrentOrder] = useState<GroupedProducts | {}>()
  const [removeModal, setRemoveModal] = useState<Product | undefined>()
  const [feedback, setFeedback] = useState<Product | undefined>(undefined)

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const context = useMemo(
    () => ({ additionalTypenames: ["Orders"] }),
    []
  );

  const [order] = useTypedQuery({
    query: {
      orderCustomerId: {
        __args: {
          id: currentComboId,
          customer_id: userData?.id || 0
        },
        id: true,
        number: true,
        status: true,
        price: true,
        customer_id: true,
        combo_price: true,
        date_created: true,
        products: {
          sticker: true,
          type: true,
          week_day: true,
          image: true,
          office: true,
          price: true,
          side_dish: true,
          side_dish_type: true,
          sauce: true,
          combo_id: true,
        },
      },
    },
    context
  });

  const [up, updateOrderPrice] = useTypedMutation((opts: OrdersFields) => ({
    updateOrderPrice: {
      __args: opts,
      id: true,
    },
  }));

  const [del, deleteBox] = useTypedMutation((opts: {combo_id: number, order_id: number}) => ({
    deleteBoxCombo: {
      __args: opts,
    },
  }));

  useEffect(() => {
    if (order.data) {
      let groupOrder = groupByWeekDayAndComboId(order.data?.orderCustomerId?.products)
      setCurrentOrder(groupOrder)
    }
  }, [order.data]);

  const removeBox = async (id: number) => {
    try {
      setRemoveModal(undefined)
      order.data && await deleteBox({
        combo_id: id,
        order_id: order.data?.orderCustomerId.id,
      })
      let newPrice = order.data?.orderCustomerId?.products
        .filter(product => product.combo_id !== id)
        .reduce((sum, product) => sum + product.price, 0)
      await updateOrderPrice({
        id: order.data?.orderCustomerId.id || 0,
        price: newPrice || 0
      })
    } catch (err) {
      console.log(err)
    }
  };

  const groupByWeekDayAndComboId = (products: Product[]): GroupedProducts => {
    return products?.reduce((acc, product) => {
      if (!acc[product.week_day]) {
        acc[product.week_day] = {};
      }
      if (!acc[product.week_day][product.combo_id]) {
        acc[product.week_day][product.combo_id] = [];
      }
      acc[product.week_day][product.combo_id].push(product);

      return acc;
    }, {} as GroupedProducts);
  }

  const infoItem = (text: string, subText: string) => (
    <div className={styles.infoItem}>
      <p>{text}</p>
      <p className={styles.infoPrice}>{subText}</p>
    </div>
  );

  return (
    <div className={styles.page}>
      {(order.fetching || up.fetching) && <Loader />}
      <Modal
        open={!!removeModal}
        onCancel={() => setRemoveModal(undefined)}
        footer={false}
        width={500}>
        <div className={styles.messageContainer}>
          <h3>Are you sure you want to remove {removeModal?.week_day}?</h3>
          <Button onClick={() => removeModal && removeBox(removeModal?.combo_id)}>OK</Button>
        </div>
      </Modal>
      <FeedbackModal date={feedback} close={() => setFeedback(undefined)} />
      {order?.data ?
        <>
          <div className={styles.header}>
            <div className={styles.headerNumber}>
              <h3>{order?.data.orderCustomerId.number}</h3>
              <OrderStatus status={order.data.orderCustomerId.status as TStatusType}/>
            </div>
            <div className={styles.close} onClick={() => navigate('/history')}></div>
          </div>
          <div className={styles.orderBlock}>
            {currentOrder && Object.keys(currentOrder as GroupedProducts)
              .sort((a, b) => WEEKDAY_ORDER.indexOf(a as EWEEK_DAY) - WEEKDAY_ORDER.indexOf(b as EWEEK_DAY))
              .map(day => {
                const productsByComboId = (currentOrder as GroupedProducts)[day];
                return Object.values(productsByComboId).map((dishList, index) => {
                  const linkDish = dishList[0]
                  return (
                    <div key={`${index}+${day}`} className={styles.orderItem}>
                      <div className={styles.orderHeaderTitleContainer}>
                        <div className={styles.daysHeaderBlock}>
                          <p className={styles.headerText}>{day}</p>
                          {/*{day?.toLowerCase() === currentDay?.toLowerCase() ?*/}
                          {/*  <>*/}
                          {/*    <StarFilled className={styles.starIcon}/>*/}
                          {/*    <p className={styles.headerText} style={{color: '#40C677'}}>Today</p>*/}
                          {/*  </> :*/}
                            <div onClick={() => setRemoveModal(linkDish)} className={styles.removeOrder}>
                              <span>Remove</span>
                            </div>
                          {/*}*/}
                        </div>
                        {linkDish?.office &&
                          <div className={styles.daysHeaderBlock}>
                            <p>Choose an address</p>
                            <Select<string, { value: string; children: string }>
                              style={{width: '204px'}}
                              value={linkDish?.office}
                              disabled
                              placeholder="Select your address"
                            />
                          </div>
                        }
                      </div>
                      <div className={styles.orderInfoBlock}>
                        {dishList
                          .sort((a, b) => WEEKDAY_ORDER_TYPE.indexOf(a.type as ComponentType) - WEEKDAY_ORDER_TYPE.indexOf(b.type as ComponentType))
                          .map((product, index) => (
                            <div
                              onClick={() => setFeedback(product)}
                              key={product?.type}
                              style={{maxWidth: product?.type === ComponentType.MAIN ? '558px' : '339px'}}
                              className={styles.orderItemContent}>
                              <div className={styles.orderHeaderBlock}>
                                <p>{index + 1}</p>
                                <h3>{product?.type}</h3>
                              </div>
                              <div className={styles.orderItemBlock}>
                              <SelectedOrder style={{marginRight: '16px'}} image={product?.image} isSelected/>
                                <div>
                                  <p>{product?.sticker}</p>
                                  {product.type === DishType.MAIN &&
                                    <div className={styles.itemRow}>
                                      {product.side_dish && (
                                        <div style={{marginRight: '16px'}} className={styles.sideBlock}>
                                          <p>Side Dish</p>
                                          <div className={styles.itemRowDish}>
                                            <SideDishSvg
                                              style={{marginRight: '8px'}}
                                              type={product.side_dish_type || 'defaultType'} // Задаем дефолтное значение
                                            />
                                            <span>{product.side_dish}</span>
                                          </div>
                                        </div>
                                      )}
                                      {product.sauce &&
                                        <div className={styles.sideBlock}>
                                          <p>Sauce</p>
                                          <div className={styles.subTitleSauce}>
                                            <span>{product.sauce}</span>
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
                  )
              })
            })}
          </div>
          <div className={styles.footerInfoBlock}>
            <div className={styles.footerInfo}>
              {infoItem('Subtotal:', currency(order.data.orderCustomerId.price))}
              {infoItem('Discount:', currency(0))}
              {infoItem('Shipping:', 'Free Shipping')}
              {infoItem('Payment Method:', 'Corporate Order')}
            </div>
          </div>
        </>
        : <></>
      }
    </div>
  )
};

export default OrderHistoryView;
