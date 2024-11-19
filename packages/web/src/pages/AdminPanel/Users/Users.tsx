import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {Input, Table} from "antd";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import styles from "./Users.module.css";
import {ColumnsType} from "antd/es/table";
import dayjs from "dayjs";
import {dateFormat, PageConfig} from "../../../utils/utils";

interface IColumnsType {
  id: React.Key;
  fullName: string;
  email: string;
  date: string;
  coupon: string | null;
}

const Users = () => {
  const navigate = useNavigate();
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');

  const [users] = useTypedQuery({
    query: {
      users: {
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        address: true,
        phone: true,
        date_created: true,
        coupon: {
          id: true,
          title: true,
        },
        role: true,
        image: true,
        is_update: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const userNameFilter = (
    <Input
      placeholder="Full Name"
      value={searchName}
      onChange={e => setSearchName(e.target.value.toLowerCase())}
    />
  );

  const userEmailFilter = (
    <Input
      placeholder="Email"
      value={searchEmail}
      onChange={e => setSearchEmail(e.target.value.toLowerCase())}
    />
  );

  const columns: ColumnsType<IColumnsType> = [
    {
      title: userNameFilter,
      dataIndex: 'fullName',
      key: 'fullName',
      width: 200,
      responsive: ['md']
    },
    {
      title: userEmailFilter,
      dataIndex: 'email',
      key: 'email',
      width: 250,
    },
    {
      title: 'Coupon',
      dataIndex: 'coupon',
      key: 'coupon',
      width: 150,
      render: (coupon) => coupon || 'No Coupon',
      responsive: ['md']
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      width: 150,
      render: (date) => dayjs(date).format(dateFormat.DATE),
      responsive: ['lg']
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (_, record) => (
        <>
          <a className={styles.actionLink} onClick={() => navigate(`${PageConfig.users}/${record.id}`)}>
            Edit
          </a>
        </>
      ),
    },
  ];

  const dataSource = users.data?.users
    .filter(user =>
      `${user.first_name.toLowerCase()} ${user.last_name.toLowerCase()}`.includes(searchName)
    )
    .filter(user => user.email.toLowerCase().includes(searchEmail.toLowerCase()))
    .map(user => ({
      id: user.id,
      fullName: `${user.first_name} ${user.last_name}`,
      email: user.email,
      date: user.date_created,
      coupon: user.coupon?.title || null,
    }));

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Table
        className={styles.container}
        rowKey="id"
        size="middle"
        loading={users.fetching}
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        scroll={{ x: true, y: `calc(100vh - 100px)` }}
      />
    </div>
  );
};

export default Users;
