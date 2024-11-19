import React, {useEffect, useState} from 'react';
import styles from "./Orders.module.css";
import {Input, Select, Table, Pagination} from "antd";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {dateFormat, EStatusType, PageConfig, TStatusType} from "../../../utils/utils";
import {currency} from "../../../utils/handle";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import OrderStatus from "../../../components/OrderStatus/OrderStatus";
import {useNavigate} from "react-router-dom";
import {RedoOutlined} from "@ant-design/icons";
import Button from "../../../components/Button/Button";

interface IColumnsType {
  id: React.Key;
  number: string;
  date_created: string;
  status: string;
  coupon: {
    id: number
    title: string
  },
  customer: {
    first_name: string,
    last_name: string,
    email: string,
  },
}

const Orders = () => {
  const navigate = useNavigate();
  const [searchNumber, setSearchNumber] = useState('')
  const [searchEmail, setSearchEmail] = useState('')
  const [status, setStatus] = useState(EStatusType.PROCESSING)
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // Количество заказов на странице

  const [orders, refetchOrders] = useTypedQuery({
    query: {
      ordersByStatus: {
        __args: {
          status,
          limit: pageSize,
          offset: (currentPage - 1) * pageSize,
        },
        id: true,
        number: true,
        status: true,
        price: true,
        coupon: {
          id: true,
          title: true,
        },
        customer: {
          first_name: true,
          last_name: true,
          email: true,
        },
        date_created: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [countPage, refetchCount] = useTypedQuery({
    query: {
      totalCount: {
        __args: {
          status,
        },
      },
    },
    pause: !status,
    requestPolicy: 'cache-and-network',
  });

  const handleReload = () => {
    refetchOrders({requestPolicy: 'network-only'});
    refetchCount();
  }

  const columns: ColumnsType<IColumnsType> = [
    {
      title: "Order #",
      dataIndex: 'number',
      key: 'number',
      width: 120,
    },
    {
      title: 'Date',
      dataIndex: 'date_created',
      key: 'date_created',
      responsive: ['xl'],
      render: (value: TStatusType) => dayjs(value).format(dateFormat.DATE_TIME),
    },
    {
      title: 'Coupon',
      dataIndex: 'coupon',
      key: 'coupon',
      width: 100,
      responsive: ['md'],
      render: (value) => value.title,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (value: TStatusType) => <OrderStatus status={value}/>,
    },
    {
      title: "Email",
      dataIndex: 'customer',
      key: 'customer',
      width: 250,
      responsive: ['lg'],
      render: (value) => value.email,
    },
    {
      title: 'Total',
      dataIndex: 'price',
      key: 'price',
      width: 100,
      responsive: ['md'],
      render: (value) => currency(value),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (value) =>
        <>
          <a className={styles.actionLink} style={{marginRight: 20}} onClick={() => navigate(`${PageConfig.orders}/${value.id}`)}>
            View
          </a>
          {/*<a className={styles.actionLink} onClick={() => navigate(`${PageConfig.orders}/add`)}>*/}
          {/*  Edit*/}
          {/*</a>*/}
        </>
    },
  ];

  return (
    <div className={styles.page}>
      <AdminNavbar/>
      <div className={styles.container}>
        <div className={styles.header}>
          <Select<string, { value: string; children: string }>
            className={styles.select}
            value={status}
            onChange={value => {
              setStatus(value as EStatusType)
              handleReload()
            }}
            placeholder="Select status"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(EStatusType)
              .map((title) => <Select.Option key={title} value={title}>{title}</Select.Option>
              )}
          </Select>
          <h2>( {countPage.data?.totalCount || 0} )</h2>
          <Button onClick={handleReload} className={styles.reload}>
            <RedoOutlined />
          </Button>

        </div>
        <div className={styles.content}>
          <Table
            className={styles.table}
            rowKey="id"
            size="middle"
            loading={orders.fetching || countPage.fetching}
            dataSource={orders.data?.ordersByStatus
              .filter(order => order.number.toLowerCase().includes(searchNumber.toLowerCase()))
              .filter(order => order.customer.email.toLowerCase().includes(searchEmail.toLowerCase()))
            }
            columns={columns}
            scroll={{x: true, y: `calc(100vh - 200px)`}}
            pagination={false}
          />
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            className={styles.pagination}
            total={countPage.data?.totalCount}
            onChange={(page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
              refetchOrders();
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Orders;
