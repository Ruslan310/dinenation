import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./CompanyOrder.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import {
  ComponentType,
  DishType, EStatusType,
  EWEEK_DAY, PageConfig,
  TStatusType,
  WEEKDAY_ORDER,
  WEEKDAY_ORDER_TYPE
} from "../../utils/utils";
import {currency, groupByWeekDayAndComboId, openDay} from "../../utils/handle";
import {message, Modal, Select, Spin} from "antd";
import Button from "../../components/Button/Button";
import SelectedOrder from "../../components/SelectedImage/SelectedOrder";
import SideDishListSvg from "../../components/svg/SideDishListSvg";
import FeedbackModal from "../../components/ReviewModal/FeedbackModal";
import {NotFound} from "../index";
import dayjs from "dayjs";
import {BoxCreate, GroupedProducts} from "../../utils/type";

interface OrdersBoxFields {
  id: number;
  status: string;
  combo_id: number;
  price: number;
  customer_id: number;
  boxes: BoxCreate[]
}

export type Product = {
  sticker: string;
  type: string;
  week_day: string;
  image: string;
  small_img: string;
  office: string | null | undefined;
  side_dish: string | null | undefined;
  side_dish_type: string | null | undefined;
  sauce: string | null | undefined;
  combo_id: number;
};

const currentDayIndex = dayjs().day() - 1;
const CompanyOrderView = () => {
  const navigate = useNavigate();
  const {id: comboIdParam} = useParams();
  const currentComboId = Number(comboIdParam);
  const {userData} = useContext(MainContext);
  const [currentOrder, setCurrentOrder] = useState<GroupedProducts | {}>();
  const [removeModal, setRemoveModal] = useState<Product | undefined>();
  const [feedback, setFeedback] = useState<Product | undefined>(undefined);

  const hidePrice = userData?.coupon.hide_price
  const isValidId = (id: string | undefined): boolean => id !== undefined && /^\d+$/.test(id);

  if (!isValidId(comboIdParam)) return <NotFound />;

  const context = useMemo(() => ({ additionalTypenames: ["Orders"] }), []);

  const [order] = useTypedQuery({
    query: {
      order: {
        __args: {
          id: currentComboId,
        },
        id: true,
        number: true,
        status: true,
        price: true,
        combo_price: true,
        date_created: true,
        products: {
          sticker: true,
          type: true,
          week_day: true,
          image: true,
          small_img: true,
          office: true,
          price: true,
          side_dish: true,
          side_dish_type: true,
          sauce: true,
          combo_id: true,
        },
      },
    },
    context,
    requestPolicy: 'cache-and-network',
  });

  const [up_box, updateOrderWithBoxes] = useTypedMutation((opts: OrdersBoxFields) => ({
    updateOrderWithBoxes: {
      __args: opts,
      id: true,
    },
  }));

  useEffect(() => {
    if (order.data) {
      let groupOrder = groupByWeekDayAndComboId(order.data?.order?.products)
      setCurrentOrder(groupOrder)
    }
  }, [order.data]);

  const shouldHideField = (day: string) => {
    const dayIndex = WEEKDAY_ORDER.indexOf(day as EWEEK_DAY);
    return dayIndex < currentDayIndex || (dayIndex === currentDayIndex && openDay());
  };

  const removeBox = async (id: number) => {
    setRemoveModal(undefined);
    try {
      if (userData?.id && order.data?.order) {
        let timeRemoveOff = '';
        let boxes = Object.values(currentOrder || {})
          .flatMap(dayObject => Object.values(dayObject || {}))
          .flat()
          .filter((box) => {
            if (shouldHideField(box.week_day) && box.combo_id === id) {
              timeRemoveOff = box.week_day;
              return false;
            }
            return box.combo_id !== id; // Сначала фильтруем по combo_id
          })
          .map((box) => ({ ...box, __typename: undefined }));

        if (timeRemoveOff) {
          message.error({ content: `Cannot remove the day, as ${timeRemoveOff} is already closed.`, duration: 2 });
          return;
        }
        const currentStatus = !boxes.length ? EStatusType.CANCEL_REQUEST : order.data?.order.status
        let newPrice = boxes.reduce((sum: number, product: { price: number }) => sum + product.price, 0);

        await updateOrderWithBoxes({
          id: currentComboId,
          status: currentStatus,
          combo_id: id,
          price: newPrice,
          customer_id: userData?.id,
          boxes,
        });
      }
      message.success({content: 'Order successfully update!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  };

  const infoItem = (text: string, subText: string) => (
    <div className={styles.infoItem}>
      <p>{text}</p>
      <p className={styles.infoPrice}>{subText}</p>
    </div>
  );

  return (
    <Spin size="large" spinning={order.fetching || up_box.fetching}>
      <div className={styles.pageView}>
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
          <div className={styles.orderContainer}>
            <div className={styles.header}>
              <div className={styles.headerNumber}>
                <h3>{order.data.order.number}</h3>
                <OrderStatus status={order.data.order.status as TStatusType}/>
              </div>
              <div className={styles.close} onClick={() => navigate(PageConfig.company_orders)}></div>
            </div>
            <div className={styles.orderBlock}>
              {currentOrder && Object.keys(currentOrder as GroupedProducts)
                .sort((a, b) => WEEKDAY_ORDER.indexOf(a as EWEEK_DAY) - WEEKDAY_ORDER.indexOf(b as EWEEK_DAY))
                .map(day => {
                  const productsByComboId = (currentOrder as GroupedProducts)[day];
                  return Object.values(productsByComboId).map((dishList, index) => {
                    const linkDish= dishList[0]
                    return (
                      <div key={`${index}+${day}`}>
                        <div className={styles.orderHeaderTitleContainer}>
                          <div className={styles.daysHeaderBlock}>
                            <p className={styles.headerText}>{day}</p>
                            {!shouldHideField(day) &&
                              <div onClick={() => setRemoveModal(linkDish)} className={styles.removeOrder}>
                                <span>Remove</span>
                              </div>
                            }
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
                              <div key={`${day}+${product?.type}`}>
                                {/* web  */}
                                <div
                                  onClick={() => setFeedback(product)}
                                  style={{width: product?.type === ComponentType.MAIN ? '558px' : '339px'}}
                                  className={styles.orderItemContent}>
                                  <div className={styles.orderHeaderBlock}>
                                    <p>{index + 1}</p>
                                    <h3>{product?.type}</h3>
                                  </div>
                                  <div className={styles.orderItemBlock}>
                                    <SelectedOrder small_img={product.small_img} className={styles.image} image={product?.image} isSelected/>
                                    <div>
                                      <p>{product?.sticker}</p>
                                      {product.type === DishType.MAIN &&
                                        <div className={styles.itemRow}>
                                          {product.side_dish && (
                                            <div style={{marginRight: '16px'}} className={styles.sideBlock}>
                                              <p>{DishType.SIDE}</p>
                                              <div className={styles.itemRowDish}>
                                                <SideDishListSvg
                                                  style={{marginRight: '8px'}}
                                                  type={product.side_dish_type || 'defaultType'}
                                                />
                                                <span>{product.side_dish}</span>
                                              </div>
                                            </div>
                                          )}
                                          {product.sauce &&
                                            <div className={styles.sideBlock}>
                                              <p>{DishType.SAUCE}</p>
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

                                {/* mobile  */}
                                <div className={styles.orderItemContentMobile}>
                                  <div className={styles.orderHeaderBlock}>
                                    <p>{index + 1}</p>
                                    <h3>{product?.type}</h3>
                                  </div>
                                  <div className={styles.orderItemBlockMobile}>
                                    <div>
                                      <p>{product?.sticker}</p>
                                      {product.type === DishType.MAIN &&
                                        <div>
                                          {product.side_dish &&
                                            <div className={styles.sideBlockMobile}>
                                              <p>{DishType.SIDE}</p>
                                              <span>{product.side_dish}</span>
                                            </div>
                                          }
                                          {product.sauce &&
                                            <div className={styles.sideBlockMobile}>
                                              <p>{DishType.SAUCE}</p>
                                              <span>{product.sauce}</span>
                                            </div>
                                          }
                                        </div>
                                      }
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    )
                  })
                })}
              {!hidePrice ?
                <div className={styles.footerInfoBlock}>
                  <div className={styles.footerInfo}>
                    {infoItem('Subtotal:', currency(order.data.order.price))}
                    {infoItem('Discount:', currency(0))}
                  </div>
                </div>
                : ''
              }
            </div>
          </div>
          : <></>
        }
        {order.error && <NotFound />}
      </div>
    </Spin>
  )
};

export default CompanyOrderView;
