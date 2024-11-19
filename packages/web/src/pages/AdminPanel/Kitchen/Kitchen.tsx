import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from "./Kitchen.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {Input, Spin, Table} from "antd";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {ColumnsType} from "antd/es/table";
import {DishType, EWEEK_DAY} from "../../../utils/utils";
import {currentDay} from "../../../utils/handle";
import classNames from "classnames";
import checked from "../../../assets/image/checked.svg";

interface KitchenDish {
  name: string;
  dishType: string;
  quantity: number;
  weekDay: EWEEK_DAY;
}

const Kitchen = () => {
  const [boxes, setBoxes] = useState<KitchenDish[]>([]);
  const [selectedDay, setSelectedDay] = useState<EWEEK_DAY>(currentDay as EWEEK_DAY);
  const [searchName, setSearchName] = useState('')
  const daysRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});


  const [orders] = useTypedQuery({
    query: {
      ordersByBox: {
        products: {
          sticker: true,
          type: true,
          week_day: true,
          side_dish: true,
        },
      },
    },
  });

  useEffect(() => {
    const boxesOrder = orders.data?.ordersByBox.flatMap(order =>
      order.products.map(box => box));
    const result = boxesOrder?.reduce((acc, box) => {
      const addOrUpdateDish = (name: string, type: string, weekDay: string) => {
        const existingDish = acc.find(
          (dish) => dish.name === name && dish.weekDay === weekDay
        );

        if (existingDish) {
          existingDish.quantity += 1;
        } else {
          acc.push({
            name,
            dishType: type,
            quantity: 1,
            weekDay: weekDay as EWEEK_DAY,
          });
        }
      };
      addOrUpdateDish(box.sticker, box.type, box.week_day);
      if (box.side_dish) {
        addOrUpdateDish(box.side_dish, DishType.SIDE, box.week_day);
      }

      return acc;
    }, [] as KitchenDish[]);


    if (result) {
      setBoxes(result);
    }
  }, [orders.data?.ordersByBox]);

  const handleSelectDay = useCallback((day: EWEEK_DAY) => {
    setSelectedDay(day);
    const dayRef = daysRefs.current[day];
    if (dayRef) {
      dayRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, []);

  const weekDaysListMobile = Object.values(EWEEK_DAY).map(day => (
    <div
      key={day}
      onClick={() => handleSelectDay(day as EWEEK_DAY)}
      ref={(el) => (daysRefs.current[day] = el)}
      className={classNames(styles.daysBlockMobile,
        {
          [styles.selectDay]: selectedDay === day,
        })}>
      <img src={checked} alt="checked"/>
      <span>{day}</span>
    </div>
  ));

  useEffect(() => {
    const dayRef = daysRefs.current[selectedDay];
    if (dayRef) {
      dayRef.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [selectedDay, daysRefs]);

  const fullNameFilter = (
    <Input
      placeholder="Sticker"
      value={searchName}
      onChange={({target}) => setSearchName(target.value)}
    />
  );

  const columns: ColumnsType<KitchenDish> = [
    {
      title: fullNameFilter,
      dataIndex: 'name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      defaultSortOrder: 'descend',
      width: 90,
      sorter: (a, b) => {
        if (a.quantity < b.quantity) {
          return -1;
        }
        if (a.quantity > b.quantity) {
          return 1;
        }
        return 0;
      }
    },
    {
      title: 'Dish type',
      dataIndex: 'dishType',
      width: 140,
      sorter: (a, b) => {
        if (a.dishType < b.dishType) {
          return -1;
        }
        if (a.dishType > b.dishType) {
          return 1;
        }
        return 0;
      }
    },
  ];

  return (
    <div className={styles.page}>
      <AdminNavbar/>
      <div className={styles.container}>
        <Spin size="large" spinning={orders.fetching}>
          <div className={styles.header}>{weekDaysListMobile}</div>
          <Table
            className={styles.table}
            pagination={false}
            size="middle"
            rowKey="name"
            columns={columns}
            dataSource={boxes
              .filter(box => box.weekDay === selectedDay)
              .filter(box => box.name.toLowerCase().includes(searchName.toLowerCase()))
            }
            scroll={{x: true, y: `calc(100vh - 170px)`}}
          />
        </Spin>
      </div>
    </div>
  );
};

export default Kitchen;
