import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./Checkout.module.css";
import {Input, Modal, Popover, Select, Spin} from "antd";
import {ComponentType, DishType, EWEEK_DAY, PageConfig, WEEKDAY_ORDER} from "../../utils/utils";
import SelectedOrder from "../../components/SelectedImage/SelectedOrder";
import SideDishListSvg from "../../components/svg/SideDishListSvg";
import CartSvg from "../../components/svg/CartSvg";
import {MainContext} from "../../contexts/MainProvider";
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import Button from "../../components/Button/Button";
import {CartList} from "../WeeklyMenu/WeeklyMenu";
import {useNavigate} from "react-router-dom";
import {colorTheme} from "../../utils/theme";
import {currency, encryptData} from "../../utils/handle";
import ArrowsSwg from "../../components/svg/ArrowsSWG";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";
import {BoxCreate} from "../../utils/type";
import {useResize} from "../../hooks/useResize";
import { CheckOutlined } from '@ant-design/icons';

const {TextArea} = Input

interface OrderCreate {
  price: number,
  combo_price: number,
  coupon_id: number,
  customer_id: number,
  address: string | null | undefined,
  comment: string | null | undefined,
  boxes: BoxCreate[]
}

const Checkout = () => {
  const navigate = useNavigate();
  const {cartList, setCartList, userData} = useContext(MainContext);
  const [removeModal, setRemoveModal] = useState<CartList | undefined>()
  const [submitModal, setSubmitModal] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')
  const [openComment, setOpenComment] = useState(false);
  const [commentText, setCommentText] = useState('');
  const {isScreenSm} = useResize();

  const hidePrice = userData?.coupon.hide_price
  const removeDay = (id: number) => {
    setCartList(prevOrders => {
      const updatedCartList = prevOrders.filter(cartItem => cartItem.id !== id);
      const jsonData = JSON.stringify(updatedCartList);
      const encryptedData = encryptData(jsonData);
      localStorage.setItem('cartList', encryptedData);
      return updatedCartList;
    });
    setRemoveModal(undefined);
  };

  useEffect(() => {
    if (!cartList.length && !message) {
      localStorage.removeItem('cartTComment');
      navigate(PageConfig.home)
    }

    cartList.forEach(list => {
      if (!list.isBlockDay) {
        removeDay(list.id);
      }
    });

    const comment = localStorage.getItem('cartTComment') || '';
    setCommentText(comment)
  }, [cartList])

  const [order, createOrderWithBoxes] = useTypedMutation((opts: OrderCreate) => ({
    createOrderWithBoxes: {
      __args: opts,
      id: true
    },
  }));


  const isHasOffice = () => {
    const hasOffice = !!userData?.coupon?.office?.length;
    const allItemsHaveOffice = cartList.every(order => order.office);
    return (hasOffice && allItemsHaveOffice) || !hasOffice;
  };


  const handleOffice = (value: string, day: EWEEK_DAY) => {
    setCartList((prevCartList: CartList[]) => {
      const updatedCartList = prevCartList.map(cartItem => {
        if (cartItem.day === day) {
          return {
            ...cartItem,
            office: value,
          };
        }
        return cartItem;
      });
      const jsonData = JSON.stringify(updatedCartList);
      const encryptedData = encryptData(jsonData);
      localStorage.setItem('cartList', encryptedData);
      return updatedCartList;
    });
  };

  const sumPrices = useMemo(() => {
    const totalSum = Object.values(cartList).reduce((total, dayObject) => {
      if (!dayObject.products) return total;

      const dayTotal = Object.values(dayObject.products).reduce((sum, product) => {
        return sum + (product.price || 0);
      }, 0);

      return total + dayTotal;
    }, 0);

    const tax = totalSum * 0.05; // Налог 5%

    return { total: totalSum, tax };
  }, [cartList]);


  const submitOrder = async () => {
    setSubmitModal(false);
    // console.log('------- create order ------');
    try {
      if (userData) {
        let boxes = cartList.flatMap(cartItem => {
          return Object.values(cartItem.products).map(product => {
            const isMain = product.dish_type === DishType.MAIN;
            return {
              sticker: product.title,
              type: product.dish_type,
              week_day: cartItem.day,
              image: product.image,
              small_img: product.small_img,
              office: cartItem.office,
              price: product.price,
              side_dish: isMain ? cartItem[DishType.SIDE]?.title : '',
              side_dish_type: isMain ? cartItem[DishType.SIDE]?.type : '',
              // sauce: isMain ? cartItem.Sauce : '',
              sauce: isMain ? cartItem.breakfast : '',
              combo_id: cartItem.id,
            };
          });
        })

        let orderData = {
          price: sumPrices.total,
          combo_price: sumPrices.total,
          coupon_id: userData?.coupon.id,
          customer_id: userData?.id,
          address: userData?.coupon.address,
          comment: commentText,
          boxes: boxes,
        }

        const {data} = await createOrderWithBoxes(orderData);

        if (data?.createOrderWithBoxes) {
          localStorage.removeItem('cartList');
          localStorage.removeItem('cartTimestamp');
          localStorage.removeItem('cartTComment');
          setCartList([])
          setMessage('Your order has been accepted!');
        }
      }
    } catch (err) {
      console.error(err);
      setMessage('An error occurred while creating your order!');
    }
  };

  const contentPopover = (
    <div>
      <p>Please select an office</p>
    </div>
  );

  const handleOpenChange = (newOpen: boolean) => {
    setOpenComment(newOpen);
  };

  const handleCommentText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let text = e.target.value
    setCommentText(text)
    localStorage.setItem('cartTComment', text)
  }

  const commentComponent = (
    <div className={styles.commentContainer}>
      <h4>Order notes (optional)</h4>
      <TextArea
        maxLength={200}
        value={commentText}
        onChange={handleCommentText}
        style={{margin: '10 0'}}
        placeholder='Enter your notes'
        rows={4}
      />
    </div>
  )

  return (
    <Spin spinning={order.fetching} size="large" className={styles.page}>
      <div className={styles.page}>
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
              navigate(PageConfig.history)
            }}>OK</Button>
          </div>
        </Modal>
        {/* header  */}
        <div className={styles.headerContainer}>
          {/* header web  */}
          <div className={`${styles.contentBlock} ${styles.headerBlock}`}>
            <div>
              <h1>Checkout</h1>
              {!hidePrice ?
                <>
                  <span>Your Price </span>
                  <span style={{color: colorTheme.active}}>{currency(sumPrices.total, hidePrice)}</span>
                  <span style={{fontSize: 11, margin: '0 10px'}}>
                    (includes
                    <span style={{fontSize: 12, color: colorTheme.active, margin: '0 5px'}}>{currency(sumPrices.tax, hidePrice)}</span>
                    vat (5%))
                  </span>
                </>
                : ''
              }
            </div>
            <LogoSvg type={logoType.HORIZONTAL} />
          </div>
          {/* header mobile */}
          <div className={`${styles.contentBlock} ${styles.mobileHeaderBlock}`} onClick={() => navigate(PageConfig.home)}>
            <ArrowsSwg style={{width: 20, height: 20, marginRight: 15}} type='left'
                       color={colorTheme.black}/>
            <div>
              {hidePrice
                ? <p>Checkout</p>
                : <p>Checkout / Your Price</p>
              }
              {!hidePrice &&
                <p>
                  <span
                    style={{color: colorTheme.active}}>{currency(sumPrices.total, hidePrice)}</span>
                  <span style={{fontSize: 11, marginLeft: 10}}>
                    (includes
                    <span style={{
                      fontSize: 12,
                      color: colorTheme.active,
                      margin: '0 5px'
                    }}>{currency(sumPrices.tax, hidePrice)}</span>
                    vat (5%))
                  </span>
                </p>
              }
            </div>

          </div>
        </div>
        <div className={styles.footerContainer}>
          {/* footer button  */}
          {!!cartList?.length &&
            <div className={styles.footerButtonBlock}>
              <Popover
                content={commentComponent}
                trigger="click"
                open={openComment}
                onOpenChange={handleOpenChange}
              >
                <div className={styles.commentButton}>Comment</div>
              </Popover>
              <Button
                onClick={() => navigate(PageConfig.home)}
                iconPosition='left'
                className={`${styles.submitButton} ${styles.submitButtonBack}`}
                icon={<ArrowsSwg type='left' color={colorTheme.white} />}>
                <div className={styles.buyButtonContainer}>
                  <p>Back</p>
                </div>
              </Button>
              <Popover content={!isHasOffice() ? contentPopover : null}>
                <div style={{display: 'inline-block', cursor: 'not-allowed'}}>
                  <Button
                    disabled={!isHasOffice()}
                    onClick={() => setSubmitModal(true)}
                    iconPosition="left"
                    className={styles.submitButton}
                    icon={<CartSvg color={colorTheme.white} />}
                  >
                    <div className={styles.buyButtonContainer}>
                      {!hidePrice && <p className={styles.buyButtonPrice}>Total ( {currency(sumPrices.total)} )</p>}
                      <p>{isScreenSm ? 'Order' : 'Place Order'}</p>
                      <p className={styles.buyButtonCountDay}>{Object.keys(cartList)?.length} days</p>
                    </div>
                  </Button>
                </div>
              </Popover>
            </div>
          }
          {/* list  */}
          <div className={`${styles.contentBlock} ${styles.footerBlock}`}>
            {cartList
              .sort((a, b) =>
                WEEKDAY_ORDER.indexOf(a.day) - WEEKDAY_ORDER.indexOf(b.day))
              .map((cartItem, index) => (
                <div key={`${index}+${cartItem.day}`}>
                  <div className={styles.orderHeaderTitleContainer}>
                    <div className={styles.daysHeaderBlock}>
                      <p className={styles.headerText}>{cartItem.day}</p>
                      <div onClick={() => setRemoveModal(cartItem)} className={styles.removeOrder}>
                        <span>Remove</span>
                      </div>
                    </div>
                    {!!userData?.coupon?.office.length &&
                      <div className={styles.daysHeaderBlock}>
                        <p>Choose an address</p>
                        <Select<string, { value: string; children: string }>
                          style={{width: 164}}
                          value={cartItem.office}
                          placeholder="Select office"
                          onChange={(value) => handleOffice(value, cartItem.day)}
                          filterOption={(input, option) =>
                            option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                          }
                        >
                          {userData?.coupon?.office
                            .map(({id, title}) => <Select.Option key={id} value={title}>{title}</Select.Option>)}
                        </Select>
                      </div>
                    }
                  </div>
                  <div className={styles.orderBlock}>
                    {Object.values(cartItem.products)
                      .filter(product => !!product)
                      .map((product, index) => (
                        <div className={styles.orderContainer} key={product?.dish_type}>
                          {/* web  */}
                          <div
                            style={{width: product?.dish_type === ComponentType.MAIN ? '558px' : '332px'}}
                            className={styles.orderItemContent}>
                            <div className={styles.orderHeaderBlock}>
                              <p>{index + 1}</p>
                              <h3>{product?.dish_type}</h3>
                            </div>
                            <div className={styles.orderItemBlock}>
                              <SelectedOrder small_img={product.small_img} className={styles.imgBlock} image={product?.image} isSelected/>
                              <div>
                                <p>{product?.title}</p>
                                {product.dish_type === DishType.MAIN &&
                                  <div className={styles.itemRow}>
                                    {cartItem[DishType.SIDE] &&
                                      <div style={{marginRight: 16}} className={styles.sideBlock}>
                                        <p>{DishType.SIDE}</p>
                                        <div className={styles.itemRowDish}>
                                          <SideDishListSvg
                                            style={{marginRight: 8}}
                                            type={cartItem[DishType.SIDE]?.type}
                                          />
                                          <span>{cartItem[DishType.SIDE]?.title}</span>
                                        </div>
                                      </div>
                                    }
                                    {/*{cartItem.Sauce &&*/}
                                    {/*  <div className={styles.sideBlock}>*/}
                                    {/*    <p>{DishType.SAUCE}</p>*/}
                                    {/*    <div className={styles.subTitleSauce}>*/}
                                    {/*      <span>{cartItem.Sauce}</span>*/}
                                    {/*    </div>*/}
                                    {/*  </div>*/}
                                    {/*}*/}
                                    {cartItem.breakfast &&
                                      <div className={styles.sideBlock}>
                                        <p>Breakfast</p>
                                        <div className={styles.subTitleSauce}>
                                          <CheckOutlined style={{ color: 'green'}} />
                                        </div>
                                      </div>
                                    }
                                  </div>
                                }
                              </div>
                            </div>
                          </div>

                          {/* mobile  */}
                          <div
                            key={product?.dish_type}
                            className={styles.orderItemContentMobile}>
                            <div className={styles.orderHeaderBlock}>
                              <p>{index + 1}</p>
                              <h3>{product?.dish_type}</h3>
                            </div>
                            <div className={styles.orderItemBlockMobile}>
                              <div>
                                <p>{product?.title}</p>
                                {product.dish_type === DishType.MAIN &&
                                  <div>
                                    {cartItem[DishType.SIDE] &&
                                      <div className={styles.sideBlockMobile}>
                                        <p>{DishType.SIDE}</p>
                                        <span>{cartItem[DishType.SIDE]?.title}</span>
                                      </div>
                                    }
                                    {/*{cartItem.Sauce &&*/}
                                    {/*  <div className={styles.sideBlockMobile}>*/}
                                    {/*    <p>{DishType.SAUCE}</p>*/}
                                    {/*    <span>{cartItem.Sauce}</span>*/}
                                    {/*  </div>*/}
                                    {/*}*/}
                                    {cartItem.breakfast &&
                                      <div className={styles.sideBlock}>
                                        <p>Breakfast</p>
                                        <div className={styles.subTitleSauce}>
                                          <CheckOutlined style={{ color: 'green'}} />
                                        </div>
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
              ))}
          </div>
        </div>
      </div>
    </Spin>
  );
};

export default Checkout;
