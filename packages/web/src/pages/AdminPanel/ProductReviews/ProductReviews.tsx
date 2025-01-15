import React, {useState} from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import styles from './ProductReviews.module.css'
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {Modal, Rate, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import rateSvg from "../../../assets/image/rateSvg.svg";
import {dateFormat, PageConfig} from "../../../utils/utils";
import {DeleteOutlined} from "@ant-design/icons";
import closeImage from "../../../assets/image/closeImage.svg";
import dayjs from "dayjs";

interface IColumnsType {
  review: string;
  rate: number;
  dish_name: string;
  user: {
    email: string,
  },
  img: string
}

const ProductReviews = () => {
  const [showImg, setShowImg] = useState<string>('')
  const [reviews] = useTypedQuery({
    query: {
      reviews: {
        id: true,
        user: {
          email: true,
        },
        img: true,
        review: true,
        rate: true,
        dish_name: true,
        date_created: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

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
    {
      title: 'Date',
      dataIndex: 'date_created',
      key: 'date_created',
      width: 130,
      responsive: ['md'],
      render: (value) => dayjs(value).format(dateFormat.DATE_TIME),
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (value, record) => (
        <div style={{display: "flex", justifyContent: 'space-around'}}>
          {record?.img &&
            <a className={styles.actionLink} onClick={() => setShowImg(record?.img)}>
              Show Img
            </a>
          }
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <Modal
        closeIcon={<img src={closeImage} alt="close"/>}
        open={!!showImg}
        onCancel={() => setShowImg('')}
        footer={null}
        centered
        styles={{
          content: {padding: 0},
          body: {lineHeight: 0}
        }}
      >
        <img
          src={showImg}
          alt="full screen"
          style={{
            borderRadius: 8,
            width: '100%',
            height: 'auto',
            maxHeight: '90vh',
          }}
        />
      </Modal>
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
