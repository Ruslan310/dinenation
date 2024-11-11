import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Coupons.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import AddSvg from "../../../components/svg/AddSvg";
import {Input, message, Modal, Table} from "antd";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {PageConfig, TStatusType} from "../../../utils/utils";
import {useResize} from "../../../hooks/useResize";
import {ColumnsType} from "antd/es/table";

interface CouponType {
  id: number;
  title: string;
  status: string;
  check_order: boolean;
  hide_price: boolean;
  address: string | undefined | null;
  domain: {
    title: string;
  }
}

const Coupons = () => {
  const [open, setOpen] = useState<CouponType | undefined>();
  const [searchTitle, setSearchTitle] = useState('');
  const navigate = useNavigate();
  const {isScreenSm} = useResize();

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

  const [_, deleteCoupon] = useTypedMutation((opts: {id: number}) => ({
    deleteCoupon: {
      __args: opts,
      id: true
    },
  }));
  const deleteItem = async (id: number) => {
    try {
      await deleteCoupon({id: id})
      setOpen(undefined)
      message.success({content: 'Coupon successfully deleted!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  }

  const couponTitleFilter = (
    <Input
      placeholder="Title"
      value={searchTitle}
      onChange={e => setSearchTitle(e.target.value.toLowerCase())}
    />
  );

  const columns: ColumnsType<CouponType> = [
    {
      title: couponTitleFilter,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      responsive: ['lg']
    },
    {
      title: 'Hide price',
      dataIndex: 'hide_price',
      key: 'hide_price',
      width: 70,
      render: (value) => value ? 'Hide' : '----',
      responsive: ['lg']
    },
    {
      title: 'Check order',
      dataIndex: 'check_order',
      key: 'check_order',
      width: 70,
      render: (value) => value ? 'check' : '----',
      responsive: ['lg']
    },
    {
      title: 'Domain',
      dataIndex: 'domain',
      key: 'domain',
      width: 150,
      render: (_, record) => record.domain.title,
      responsive: ['md']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (_, record) => <ProductStatus status={record.status as TStatusType} />,
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <div style={{display: "flex", justifyContent: 'space-around'}}>
          <a className={styles.actionLink} onClick={() => navigate(`${PageConfig.coupons}/${record.id}`)}>
            Edit
          </a>
          <DeleteOutlined style={{fontSize: 20}} onClick={e => {
            e.stopPropagation()
            setOpen(record)
          }}/>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <Modal
        open={!!open}
        onCancel={() => setOpen(undefined)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>Are you sure you want to remove</h3>
          <h3>{open?.title} ?</h3>
          <Button loading={_.fetching} onClick={() => open && deleteItem(open?.id)}>OK</Button>
        </div>
      </Modal>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            icon={<AddSvg className={styles.addSwg}/>}
            className={styles.buttonTop}
            onClick={() => navigate(`${PageConfig.coupons}/add`)}
          >
            {isScreenSm ? 'Add' : 'Add new Coupons'}
          </Button>
        </div>
        <Table
          className={styles.table}
          rowKey="id"
          size="middle"
          loading={coupons.fetching}
          dataSource={coupons.data?.coupons
            .filter(coupon => coupon.title.toLowerCase().includes(searchTitle.toLowerCase()))
          }
          columns={columns}
          pagination={false}
          scroll={{ x: true, y: `calc(100vh - 170px)` }}
        />
      </div>
    </div>
  );
};

export default Coupons;
