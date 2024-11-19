import React, {useState} from 'react';
import {ConfigProvider, Modal, Popover, Radio} from 'antd';
import styles from './WeeklyMenu.module.css';
import {DishType, EAllergensList, EColorSideDishList, EWEEK_DAY} from '../../utils/utils';
import {SideDishType, ProductForm} from '../../utils/type';
import Button from '../../components/Button/Button';
import CartSvg from '../../components/svg/CartSvg';
import SideDishListSvg from '../../components/svg/SideDishListSvg';
import AllergensSvg from '../../components/svg/AllergensSvg';
import {colorSideDishList, colorTheme} from '../../utils/theme';
import CaloriesSvg from "../../components/svg/CaloriesSvg";

const noSauce = 'no sauce';

interface PopoverContentProps {
  data: ProductForm;
  isMain?: boolean;
  sideDishes: SideDishType[];
  open: boolean;
  exceptionWeekDays: string[];
  selectDay: EWEEK_DAY;
  setShowInfo: (value: number | undefined) => void;
  setOpen: (value: boolean) => void;
  addToCart: (params: {
    product?: ProductForm;
    sauce?: string;
    sideDish?: SideDishType;
    isBlockDay: boolean;
  }) => void;
}

const DishPopup: React.FC<PopoverContentProps> = ({
                                                    data,
                                                    isMain,
                                                    sideDishes,
                                                    addToCart,
                                                    open,
                                                    exceptionWeekDays,
                                                    selectDay,
                                                    setOpen,
                                                    setShowInfo,
}) => {
  const [selectSauce, setSelectSauce] = useState<string>('');
  const [selectSideDish, setSideDish] = useState<SideDishType>();
  const [colorSideDish, setColorSideDish] = useState<string>('');

  const addProduct = () => {
    setOpen(false);
    setTimeout(() => {
      addToCart({
        product: data,
        sauce: selectSauce,
        sideDish: selectSideDish,
        isBlockDay: false,
      })
    }, 100);
    // console.log('Product added ...');
  }
  const addHandle = () => {
    if ((isMain && data.sauces?.length > 0 && !selectSauce) || (isMain && data.is_dish && !selectSideDish)) {
      setOpen(true)
    } else {
      addProduct()
    }
  }


  return (
    <div className={styles.popoverContent}>
      <Modal
        closeIcon={false}
        open={open}
        onCancel={() => setOpen(false)}
        width={400}
        centered
        maskClosable={false}
        onOk={addProduct}
      >
        <>
          <h4 style={{textAlign: 'center'}}>
            Are you sure you want to order
          </h4>
          <h4 style={{textAlign: 'center'}}>
            without
            {data.sauces?.length > 0 && !selectSauce && !selectSideDish && data.is_dish && ' sauce and side dish'}
            {data.sauces?.length > 0 && !selectSauce && (!data.is_dish || selectSideDish) && ' sauce'}
            {!selectSideDish && data.is_dish && (!data.sauces?.length || selectSauce) && ' side dish'}?
          </h4>
        </>
      </Modal>
      <div className={styles.popoverCategories}>
        <div className={styles.descriptionBlock}>
          <div>
            <p className={styles.titlePopover}>Categories: {data.categories}</p>
            <p className={styles.subTextPopover}>{data?.description}</p>
          </div>
          <div className={styles.close} onClick={() => setShowInfo(undefined)}></div>
        </div>
        {data.calories &&
          <div className={styles.calories}>
            <CaloriesSvg/>
            <p>{data.calories || ''}</p>
          </div>
        }
        <div className={styles.blockAllergen}>
          <p className={styles.titlePopover}>List of allergens</p>
          <div>
            {data.allergens?.length ? (
              data.allergens?.split(',').map((allergen: string) => (
                <div className={styles.allergenHover} key={allergen}>
                  <span className={styles.tooltip}>{allergen}</span>
                  <AllergensSvg type={allergen as EAllergensList} className={styles.imageAllergen} />
                </div>
              ))
            ) : (
              <div>no allergens</div>
            )}
          </div>
        </div>
        {data?.sauces && data?.sauces?.length && isMain && (
          <div className={styles.popoverSauceBlock}>
            <p className={styles.titlePopover}>Choose a {DishType.SAUCE}</p>
            <ConfigProvider theme={{ token: { paddingXS: 16, colorPrimary: colorTheme.black } }}>
              <Radio.Group onChange={e => setSelectSauce(e.target.value)} value={selectSauce}>
                {data?.sauces?.split(',').map((sauce: string, index: number) => (
                  <Radio key={`${index}-${sauce}`} value={sauce}>
                    {sauce}
                  </Radio>
                ))}
                <Radio value={noSauce}>{noSauce}</Radio>
              </Radio.Group>
            </ConfigProvider>
          </div>
        )}
      </div>
      <div className={styles.popoverChoose}>
        {isMain && data.is_dish ? (
          <div>
            <p className={styles.titlePopover}>Choose {DishType.SIDE}</p>
            <div className={styles.sideDishBlock}>
              {/* radio */}
              <ConfigProvider theme={{ token: { colorPrimary: colorSideDish, fontSize: 12 } }}>
                <Radio.Group value={selectSideDish?.title}>
                  {sideDishes.map(({ type, title, description }) => (
                    <Radio
                      style={{backgroundColor: selectSideDish?.title === title ? colorSideDish : colorTheme.navbar}}
                      className={styles.sideDishRadioItem}
                      onClick={() => {
                        setColorSideDish(colorSideDishList[type as EColorSideDishList]);
                        setSideDish({title, type, description});
                      }}
                      value={title}
                      key={`${type}+${title}`}
                    >
                      <Popover placement="topLeft" content={
                        description ?
                          <div className={styles.sideDishDescription}>
                            <p>{description}</p>
                          </div>
                          : null}>
                        <div className={styles.sideDishRadioContent}>
                          <SideDishListSvg type={type} active={selectSideDish?.title === title}/>
                          <p className={styles.radioText}>{title}</p>
                        </div>
                      </Popover>
                    </Radio>
                  ))}
                </Radio.Group>
              </ConfigProvider>
            </div>
          </div>
        ) : (
          <div></div>
        )}
        <Button
          icon={<CartSvg color={colorTheme.white} style={{marginLeft: 8}} />}
          iconPosition="right"
          onClick={addHandle}
          disabled={exceptionWeekDays.includes(selectDay)}
        >
          <p>Add to Cart</p>
        </Button>
      </div>
    </div>
  );
};

export default DishPopup;
