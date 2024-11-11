import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Boxes.module.css';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {BoxStatus, EWEEK_DAY} from "../../../utils/utils";
import {Input, Table, Modal, Spin, message} from "antd";
import {currentDay} from "../../../utils/handle";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import classNames from "classnames";
import checked from "../../../assets/image/checked.svg";
import dayjs from "dayjs";
import {ColumnsType} from "antd/es/table";
import {ExclamationCircleOutlined} from "@ant-design/icons";
import {colorTheme} from "../../../utils/theme";
import HandleBox from "./HandleBox";

export interface IBoxes {
  id: number;
  sticker: string;
  type: string;
  week_day: string;
  office: string | undefined | null;
  side_dish: string | undefined | null;
  sauce: string | undefined | null;
  combo_id: number;
  status: string;
  number: string;
  customer: string;
  coupon: string;
  comment: string | undefined | null;
  date_updated: string;
}

const Boxes = () => {
  const [selectedDay, setSelectedDay] = useState<EWEEK_DAY>(currentDay as EWEEK_DAY);
  const [boxes, setBoxes] = useState<IBoxes[]>([]);
  const [searchName, setSearchName] = useState('')
  const [searchOrderNumber, setSearchOrderNumber] = useState('')
  const daysRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const [generatingStickers, setGeneratingStickers] = useState(false)
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement | null>(null);

  const [orders, refetchOrders] = useTypedQuery({
    query: {
      ordersByBox: {
        number: true,
        comment: true,
        coupon: {
          title: true,
        },
        customer: {
          first_name: true,
          last_name: true,
        },
        products: {
          id: true,
          sticker: true,
          type: true,
          week_day: true,
          office: true,
          side_dish: true,
          sauce: true,
          combo_id: true,
          status: true,
          date_updated: true,
        },
      },
    },
    pause: !selectedDay,
    requestPolicy: 'network-only',
  });

  const [updateBox, updateBoxList] = useTypedMutation((opts: {list: number[]}) => ({
    updateBoxList: {
      __args: opts
    },
  }));

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

  const weekDaysListMobile = Object.values(EWEEK_DAY).map(day => {
    const filteredBoxes = boxes.filter((box) => box.week_day === day);
    const countOrders = Array.from(
      new Map(filteredBoxes.map((item) => [item.number, item])).values()
    );
    const countComment = filteredBoxes.filter(box => box.comment);

    return (
      <div
        key={day}
        onClick={() => handleSelectDay(day as EWEEK_DAY)}
        ref={(el) => (daysRefs.current[day] = el)}
        className={classNames(styles.daysBlockMobile,
          {
            [styles.selectDay]: selectedDay === day,
          })}>
        <img src={checked} alt="checked"/>
        <span>{day} ( {filteredBoxes?.length} / {countComment?.length} ), people ( {countOrders.length} )</span>
      </div>
    )
  });

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


  useEffect(() => {
    const boxesOrder = orders.data?.ordersByBox.flatMap(order =>
      order.products.map(box => ({
        ...box,
        number: order.number,
        comment: order.comment,
        coupon: order.coupon.title,
        customer: `${order.customer.first_name} ${order.customer.last_name}`,
      }))
    );
    if (boxesOrder) {
      setBoxes(boxesOrder);
    }
  }, [orders.data?.ordersByBox]);

  const fullNameFilter = (
    <Input
      placeholder="Sticker"
      value={searchName}
      onChange={({target}) => setSearchName(target.value)}
    />
  );
  const ordersFilter = (
    <Input
      placeholder="Order #"
      value={searchOrderNumber}
      onChange={({target}) => setSearchOrderNumber(target.value)}
    />
  );

  const columns: ColumnsType<IBoxes> = [
    {
      title: fullNameFilter,
      dataIndex: 'sticker',
    },
    {
      title: 'Date Updated',
      dataIndex: 'date_updated',
      width: 120,
      responsive: ['lg'],
      render: (value, record) =>
        record.status === BoxStatus.PRINTED
          ? dayjs(value).format("HH:mm DD-MM")
          : null,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      defaultSortOrder: 'descend',
      width: 80,
      sorter: (a) => {
        if (a.status === BoxStatus.PRINTED) {
          return -1;
        } else {
          return 1;
        }
      }
    },
    {
      title: 'Office',
      dataIndex: 'office',
      responsive: ['lg'],
      width: 100,
    },
    {
      title: ordersFilter,
      dataIndex: 'number',
      width: 110,
    },
  ];

  const changeNewToPrinted = async () => {
    try {
      const list = boxes
        .filter(box => box.week_day === selectedDay && box.status === BoxStatus.NEW)
        .map(box => box.id);
      await updateBoxList({list})
      refetchOrders()
      message.success({content: 'Boxes successfully update!', duration: 2});
      setOpen(false)
    } catch (err) {
      console.log('-----err', err)
      message.error({content: "Something's wrong..", duration: 2});
      setOpen(false)
    }
  }

  return (
    <Spin size="large" spinning={orders.fetching || generatingStickers || updateBox.fetching}>
      <div className={styles.page}>
        <Modal
          closeIcon={false}
          open={open}
          onCancel={() => setOpen(false)}
          width={400}
          centered
          onOk={changeNewToPrinted}
        >
          <>
            <h3>
              <ExclamationCircleOutlined style={{color: colorTheme.primary, marginRight: 10}}/>
              Do you want to update these items?
            </h3>
            <p style={{paddingLeft: 27}}>
              Are you sure you printed all new stickers?
            </p>
            <p style={{paddingLeft: 27}}>
              You cannot undo this!!!
            </p>
          </>
        </Modal>
        <AdminNavbar/>
        <div className={styles.container}>
          <div className={styles.header}>{weekDaysListMobile}</div>
          <HandleBox ref={ref} boxes={boxes} selectedDay={selectedDay} setOpen={setOpen} setGeneratingStickers={setGeneratingStickers}/>
          <Table
            className={styles.table}
            pagination={false}
            size="middle"
            rowKey="id"
            columns={columns}
            dataSource={boxes
              .filter(box => box.week_day === selectedDay)
              .filter(box => box.sticker.toLowerCase().includes(searchName.toLowerCase()))
              .filter(box => box.number && box.number.toLowerCase().includes(searchOrderNumber.toLowerCase()))
            }
            scroll={{ x: true, y: `calc(100vh - ${180 + (ref.current?.offsetHeight || 0)}px)` }}
          />
        </div>
      </div>
    </Spin>
  );
};

export default Boxes;
