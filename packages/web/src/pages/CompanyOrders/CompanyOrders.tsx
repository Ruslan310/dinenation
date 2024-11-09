import React, {useContext} from 'react';
import styles from "./CompanyOrder.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {MainContext} from "../../contexts/MainProvider";
import dayjs from "dayjs";
import {TStatusType} from "../../utils/utils";
import {currency} from "../../utils/handle";
import {useNavigate} from "react-router-dom";
import OrderStatus from "../../components/OrderStatus/OrderStatus";

interface IColumnsType {
  id: React.Key;
  number: string;
  date_created: string;
  status: string;
  address: string | null | undefined;
}


const CompanyOrder = () => {
  const navigate = useNavigate();
  const {userData} = useContext(MainContext);

  const hidePrice = userData?.coupon.hide_price
  const [orders] = useTypedQuery({
    query: {
      ordersByCustomerId: {
        __args: {
          customer_id: userData?.id || 0
        },
        id: true,
        number: true,
        status: true,
        price: true,
        address: true,
        date_created: true,
      },
    },
  });

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'Order',
      dataIndex: 'number',
      key: 'number',
      width: '110px',
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
      responsive: ['md'],
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
      render: (value: TStatusType) => <span>{dayjs(value).format('YYYY-MM-DD HH:mm')}</span>,
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: '250px',
      responsive: ['lg']
    },
  ];

  if (hidePrice) {
    columns.push(
      {
        title: 'Action',
        key: 'action',
        width: '60px',
        render: (value) =>
          <a style={{color: '#409EFF'}} onClick={() => navigate(`/history/${value.id}`)}>
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
        render: (value) => <span>{currency(value, userData?.coupon.hide_price)}</span>,
        responsive: ['md'],
      },
      {
        title: 'Action',
        key: 'action',
        width: '60px',
        render: (value) =>
          <a style={{color: '#409EFF'}} onClick={() => navigate(`/history/${value.id}`)}>
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
        rowClassName={'tableRow'}
        loading={orders.fetching}
        dataSource={orders.data?.ordersByCustomerId}
        columns={columns}
        pagination={false}
        scroll={{ x: true, y: `calc(100vh - 88px)` }}
      />
    </div>
  );
};

export default CompanyOrder;
