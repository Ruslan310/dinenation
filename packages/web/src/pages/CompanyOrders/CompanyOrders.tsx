import React, {useContext} from 'react';
import styles from "./CompanyOrder.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Table} from "antd";
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
  customer: {
    first_name: string,
    last_name: string,
    email: string,
  }
}


const CompanyOrders = () => {
  const navigate = useNavigate();
  const {userData} = useContext(MainContext);

  const hidePrice = userData?.coupon.hide_price
  const [orders] = useTypedQuery({
    query: {
      ordersByCoupon: {
        __args: {
          coupon_id: userData?.coupon.id || 0
        },
        id: true,
        number: true,
        status: true,
        price: true,
        address: true,
        date_created: true,
        customer: {
          first_name: true,
          last_name: true,
          email: true,
        }
      },
    },
    pause: !userData,
    requestPolicy: 'cache-and-network',
  });

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'Order',
      dataIndex: 'number',
      key: 'number',
      width: 110,
      sorter: (a, b) => {
        if (a.number && b.number) {
          if (a.number < b.number) {
            return -1;
          }
          if (a.number > b.number) {
            return 1;
          }
          return 0;
        } else {
          return 0;
        }
      }
    },
    {
      title: 'Date',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 250,
      responsive: ['lg'],
      sorter: (a, b) => {
        if (a.date_created && b.date_created) {
          if (a.date_created < b.date_created) {
            return -1;
          }
          if (a.date_created > b.date_created) {
            return 1;
          }
          return 0;
        } else {
          return 0;
        }
      },
      render: (value) => dayjs(value).format(dateFormat.DATE_TIME),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: TStatusType) => <OrderStatus status={value}/>,
      sorter: (a, b) => {
        if (a.status && b.status) {
          if (a.status < b.status) {
            return -1;
          }
          if (a.status > b.status) {
            return 1;
          }
          return 0;
        } else {
          return 0;
        }
      }
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
