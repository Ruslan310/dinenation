import React from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import styles from './ProductReviews.module.css'
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {Rate, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import rateSvg from "../../../assets/image/rateSvg.svg";

interface IColumnsType {
  review: string;
  rate: number;
  dish_name: string;
  user: {
    email: string,
  },
}

const ProductReviews = () => {
  const [reviews] = useTypedQuery({
    query: {
      reviews: {
        id: true,
        user: {
          email: true,
        },
        review: true,
        rate: true,
        dish_name: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [_, deleteSauces] = useTypedMutation((opts: {id: number}) => ({
    deleteReview: {
      __args: opts,
    },
  }));

  const columns: ColumnsType<IColumnsType> = [
    {
      title: 'Email',
      dataIndex: 'user',
      key: 'user',
      responsive: ["md"],
      render: (value) => value.email,
    },
    {
      title: 'Dish',
      dataIndex: 'dish_name',
      key: 'dish_name',
    },
    {
      title: 'Review',
      dataIndex: 'review',
      key: 'review',
      responsive: ["lg"],
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      key: 'rate',
      width: 130,
      render: (value) => <Rate character={<img src={rateSvg} alt=''/>} disabled count={value}/>,
    },
  ];

  return (
    <div className={styles.page}>
      <AdminNavbar/>
      <Table
        className={styles.container}
        rowKey="id"
        size={"middle"}
        loading={reviews.fetching}
        dataSource={reviews.data?.reviews}
        columns={columns}
        pagination={false}
        scroll={{x: true, y: `calc(100vh - 100px)`}}
      />
    </div>
  );
};

export default ProductReviews;
