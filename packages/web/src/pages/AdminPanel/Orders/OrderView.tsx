import React, {useEffect, useMemo, useState} from 'react';
import styles from "./OrderView.module.css";
import {useNavigate, useParams} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {
  ComponentType,
  DishType, EStatusType,
  EWEEK_DAY, PageConfig,
  WEEKDAY_ORDER,
  WEEKDAY_ORDER_TYPE
} from "../../../utils/utils";
import {currency, groupByWeekDayAndComboId} from "../../../utils/handle";
import {message, Modal, Select, Spin} from "antd";
import SelectedOrder from "../../../components/SelectedImage/SelectedOrder";
import SideDishListSvg from "../../../components/svg/SideDishListSvg";
import {NotFound} from "../../index";
import {BoxCreate, GroupedProducts} from "../../../utils/type";
import Button from "../../../components/Button/Button";

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

interface OrdersBoxFields {
  id: number;
  status: string;
  combo_id: number;
  price: number;
  customer_id: number;
  boxes: BoxCreate[]
}


const OrderView = () => {
  const navigate = useNavigate();
  const currentId = useParams();
  const currentComboId = Number(currentId.id) as number;
  const [currentOrder, setCurrentOrder] = useState<GroupedProducts | {}>();
  const [removeModal, setRemoveModal] = useState<Product | undefined>();
  const [orderStatus, setOrderStatus] = useState<string>('');

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

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
        customer: {
          id: true,
        },
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
    context
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
      setOrderStatus(order.data.order.status)
    }
  }, [order.data]);

  const infoItem = (text: string, subText: string) => (
    <div className={styles.infoItem}>
      <p>{text}</p>
      <p className={styles.infoPrice}>{subText}</p>
    </div>
  );

  const removeBox = async (id: number) => {
    setRemoveModal(undefined);
    try {
      if (order?.data?.order) {
        let boxes = Object.values(currentOrder || {})
          .flatMap(dayObject => Object.values(dayObject || {}))
          .flat()
          .reduce((acc, box) => {
            if (box.combo_id !== id) {
              const { __typename, ...rest } = box;
              acc.push(rest);
            }
            return acc;
          }, []);

        const currentStatus = !boxes.length ? EStatusType.CANCEL_REQUEST : order.data?.order.status

        let newPrice = boxes.reduce((sum: number, product: { price: number }) => sum + product.price, 0);
        await updateOrderWithBoxes({
          id: currentComboId,
          status: orderStatus || currentStatus,
          combo_id: id,
          price: newPrice || 0,
          customer_id: order?.data?.order.customer.id,
          boxes,
        });
      }
      message.success({content: 'Order successfully update!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  };

  return (
    <Spin size="large" spinning={order.fetching || up_box.fetching}>
      <div className={styles.page}>
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
        {order?.data ?
          <div className={styles.orderContainer}>
            <div className={styles.header}>
              <div className={styles.headerNumber}>
                <h3>{order.data.order.number}</h3>
                {/*<OrderStatus status={order.data.order.status as TStatusType}/>*/}
                <Select<string, { value: string; children: string }>
                  className={styles.select}
                  value={orderStatus}
                  onChange={value => setOrderStatus(value as EStatusType)}
                  placeholder="Select status"
                  filterOption={(input, option) =>
                    option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                  }
                >
                  {Object.values(EStatusType)
                    .map((title) => <Select.Option key={title} value={title}>{title}</Select.Option>
                    )}
                </Select>
                <Button onClick={() => removeBox(-1)} className={styles.button}>Save</Button>
              </div>
              <div className={styles.close} onClick={() => navigate(PageConfig.orders)}></div>
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
                            <div onClick={() => setRemoveModal(linkDish)} className={styles.removeOrder}>
                              <span>Remove</span>
                            </div>
                          </div>
                          {linkDish?.office &&
                            <div className={styles.daysHeaderBlock}>
                              <p>Choose an address</p>
                              <Select<string, { value: string; children: string }>
                                style={{width: 204}}
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
                                  style={{width: product?.type === ComponentType.MAIN ? '558px' : '339px'}}
                                  className={styles.orderItemContent}>
                                  <div className={styles.orderHeaderBlock}>
                                    <p>{index + 1}</p>
                                    <h3>{product?.type}</h3>
                                  </div>
                                  <div className={styles.orderItemBlock}>
                                    <SelectedOrder small_img={product.small_img} className={styles.image}
                                                   image={product?.image} isSelected/>
                                    <div>
                                      <p>{product?.sticker}</p>
                                      {product.type === DishType.MAIN &&
                                        <div className={styles.itemRow}>
                                          {product.side_dish && (
                                            <div style={{marginRight: 16}} className={styles.sideBlock}>
                                              <p>{DishType.SIDE}</p>
                                              <div className={styles.itemRowDish}>
                                                <SideDishListSvg
                                                  style={{marginRight: 8}}
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
              <div className={styles.footerInfoBlock}>
                <div className={styles.footerInfo}>
                  {infoItem('Subtotal:', currency(order.data.order.price))}
                  {infoItem('Discount:', currency(0))}
                </div>
              </div>
            </div>
          </div>
          : <></>
        }
        {order.error && <NotFound/>}
      </div>
    </Spin>
  )
};

export default OrderView;
