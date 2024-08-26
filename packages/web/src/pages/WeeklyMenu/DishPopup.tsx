import React, {useContext, useState} from 'react';
import {ConfigProvider, Radio} from 'antd';
import styles from './WeeklyMenu.module.css';
import {EAllergensList, EColorSideDishList, EWEEK_DAY} from '../../utils/utils';
import {SideDishType, ProductForm} from '../../utils/type';
import Button from '../../components/Button/Button';
import CartSvg from '../../components/svg/CartSvg';
import SideDishSvg from '../../components/svg/SideDishSvg';
import AllergensSvg from '../../components/svg/AllergensSvg';
import calories from '../../assets/image/calories.svg';
import {colorSideDishList, colorTheme} from '../../utils/theme';
import {MainContext} from "../../contexts/MainProvider";

const noSauce = 'no sauce';

interface PopoverContentProps {
  data: ProductForm;
  isMain: boolean;
  sideDishes: SideDishType[];
  selectDay: EWEEK_DAY;
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
                                                         selectDay,
                                                         addToCart,
                                                       }) => {
  const [selectSauce, setSelectSauce] = useState<string>('');
  const [selectSideDish, setSideDish] = useState<SideDishType>();
  const [colorSideDish, setColorSideDish] = useState<string>('');
  const {cartList} = useContext(MainContext);

  const isBlockDay = (day: EWEEK_DAY): boolean => cartList.find(list => list.day === day)?.isBlockDay ?? false;

  return (
    <div className={styles.popoverContent}>
      <div className={styles.popoverCategories}>
        <p className={styles.titlePopover}>Categories: {data.categories}</p>
        <p className={styles.subTextPopover}>{data?.description}</p>
        <div className={styles.calories}>
          <img src={calories} alt="" />
          <p>{data.calories || 0} calories</p>
        </div>
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
        {data.sauces && data.sauces.length && isMain && (
          <div className={styles.popoverSauceBlock}>
            <p className={styles.titlePopover}>Choose a Sauce</p>
            <ConfigProvider theme={{ token: { paddingXS: 16, colorPrimary: colorTheme.black } }}>
              <Radio.Group onChange={e => setSelectSauce(e.target.value)} value={selectSauce}>
                {data.sauces?.split(',').map((sauce: string, index: number) => (
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
        {isMain ? (
          <div>
            <p className={styles.titlePopover}>Choose Side Dish</p>
            <div className={styles.sideDishBlock}>
              {/* radio */}
              <ConfigProvider theme={{ token: { colorPrimary: colorSideDish, fontSize: 12 } }}>
                <Radio.Group value={selectSideDish?.title}>
                  {sideDishes.map(({ type, title }) => (
                    <Radio
                      style={{
                        backgroundColor: selectSideDish?.title === title ? colorSideDish : colorTheme.navbar,
                      }}
                      className={styles.sideDishRadioItem}
                      onClick={() => {
                        setColorSideDish(colorSideDishList[type as EColorSideDishList]);
                        setSideDish({
                          title: title,
                          type: type,
                        });
                      }}
                      value={title}
                      key={type}
                    >
                      <div className={styles.sideDishRadioContent}>
                        <SideDishSvg type={type} active={selectSideDish?.title === title} />
                        <span>{title}</span>
                      </div>
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
          icon={<CartSvg color={colorTheme.white} style={{ marginLeft: '8px' }} />}
          iconPosition="right"
          disabled={
            (isMain && (!selectSideDish?.title || (data.sauces.length > 0 && !selectSauce))) ||
            isBlockDay(selectDay)
          }
          onClick={() =>
            addToCart({
              product: data,
              sauce: selectSauce,
              sideDish: selectSideDish,
              isBlockDay: false,
            })
          }
        >
          <p>Add to Cart</p>
        </Button>
      </div>
    </div>
  );
};

export default DishPopup;
