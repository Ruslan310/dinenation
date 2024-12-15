import React, {useContext, useEffect, useMemo, useState} from 'react';
import styles from "./CompanyOrder.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Input, Select, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import dayjs from "dayjs";
import {dateFormat, PageConfig, TStatusType} from "../../utils/utils";
import {currency} from "../../utils/handle";
import {useNavigate} from "react-router-dom";
import OrderStatus from "../../components/OrderStatus/OrderStatus";
import {colorTheme} from "../../utils/theme";

interface IColumnsType {
  id: React.Key;
  number: string;
  date_created: string;
  status: string;
  address: string | null | undefined;
  coupon: {
    id: number,
    title: string
  }
  customer: {
    first_name: string,
    last_name: string,
    email: string,
  }
}



const appariRemonovoCoupons = ['appari', 'remonovo'];


const CompanyOrders = () => {
  const navigate = useNavigate();
  const {userData} = useContext(MainContext);
  const [selectCoupon, setSelectCoupon] = useState(userData?.coupon.id || 0)
  const hidePrice = useMemo(() => userData?.coupon.hide_price, [userData])
  const isAppariRemonovo = useMemo(() => {
    return appariRemonovoCoupons.includes(userData?.coupon.title?.toLowerCase() || '');
  }, [userData]);

  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
        status: true,
        check_order: true,
        hide_price: true,
        address: true,
        domain: {
          title: true
        }
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [orders, refetchOrders] = useTypedQuery({
    query: {
      ordersByCoupon: {
        __args: {
          coupon_id: selectCoupon
        },
        id: true,
        number: true,
        status: true,
        price: true,
        address: true,
        date_created: true,
        coupon: {
          id: true,
          title: true,
        },
        customer: {
          first_name: true,
          last_name: true,
          email: true,

        }
      },
    },
    pause: !userData || !selectCoupon,
    requestPolicy: 'cache-and-network',
  });

  const couponSelect = (
    <Select<number, { value: number; children: string }>
      value={selectCoupon}
      onChange={value => {
        setSelectCoupon(value)
        refetchOrders()
      }}
      placeholder="Select domain"
      filterOption={(input, option) =>
        option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
      }
    >
      {coupons.data?.coupons
        .filter(coupon => appariRemonovoCoupons.includes(coupon.title.toLowerCase()))
        .map(({id, title}) => <Select.Option key={id} value={id}>{title}</Select.Option>)}
    </Select>
  );

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'Order',
      dataIndex: 'number',
      key: 'number',
      width: 110,
    },
    {
      title: 'Date',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 150,
      responsive: ['lg'],
      render: (value) => dayjs(value).format(dateFormat.DATE_TIME),
    },
    {
      title: isAppariRemonovo ? couponSelect : 'Coupon',
      dataIndex: 'coupon',
      key: 'coupon',
      width: 120,
      render: (value) => value.title,
    },
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
      width: 250,
      responsive: ['md'],
      render: (value) => `${value.first_name} ${value.last_name}`,
    },
    {
      title: 'Email',
      dataIndex: 'customer',
      key: 'customer',
      width: 250,
      responsive: ['lg'],
      render: (value) => value.email,
    },
  ];

  if (hidePrice) {
    columns.push(
      {
        title: 'Action',
        key: 'action',
        width: 80,
        render: (value) =>
          <a style={{color: colorTheme.link}} onClick={() => navigate(`${PageConfig.company_orders}/${value.id}`)}>
            View
          </a>,
      },
    )
  } else {
    columns.push(
      {
        title: 'Total',
        dataIndex: 'price',
        key: 'price',
        render: (value) => currency(value, userData?.coupon.hide_price),
        responsive: ['md'],
        width: 80,
      },
      {
        title: 'Action',
        key: 'action',
        width: 80,
        render: (value) =>
          <a style={{color: colorTheme.link}} onClick={() => navigate(`${PageConfig.company_orders}/${value.id}`)}>
            View
          </a>,
      },
    )
  }


  return (
    <div className={styles.page}>
      <Navbar />
      <Table
        className={styles.table}
        rowKey="id"
        size={"middle"}
        loading={orders.fetching}
        dataSource={orders.data?.ordersByCoupon}
        columns={columns}
        pagination={false}
        scroll={{ x: true, y: `calc(100vh - 88px)` }}
      />
    </div>
  );
};

export default CompanyOrders;
