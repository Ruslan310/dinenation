import React, {useState} from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Button from "../../../components/Button/Button";
import styles from './Product.module.css'
import {DeleteOutlined} from "@ant-design/icons";
import {Modal, Input, message, Table} from "antd";
import AddSvg from "../../../components/svg/AddSvg";
import {currency} from "../../../utils/handle";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {PageConfig, TStatusType} from "../../../utils/utils";
import {ColumnsType} from "antd/es/table";
import ProductImage from "../../../components/ProductImage/ProductImage";

interface ProductType {
  id: number;
  title: string;
  price: number;
  categories: string;
  status: string;
  image: string;
  small_img: string;
  week_day: string;
  is_dish: boolean;
  sauces: string | undefined | null;
}

const Product = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<ProductType | undefined>();
  const [searchTitle, setSearchTitle] = useState('');

  const [products] = useTypedQuery({
    query: {
      products: {
        id: true,
        title: true,
        price: true,
        image: true,
        small_img: true,
        categories: true,
        status: true,
        week_day: true,
        is_dish: true,
        sauces: true
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [_, deleteProduct] = useTypedMutation((opts: {id: number}) => ({
    deleteProduct: {
      __args: opts,
      id: true
    },
  }));

  const deleteItem = async (id: number) => {
    try {
      await deleteProduct({id: id})
      setOpen(undefined)
      message.success({content: 'Product successfully deleted!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  }

  const productTitleFilter = (
    <Input
      placeholder="Title"
      value={searchTitle}
      onChange={e => setSearchTitle(e.target.value.toLowerCase())}
    />
  );

  const columns: ColumnsType<ProductType> = [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: (_, record) =>
        <ProductImage image={record.image} placeholder={record.small_img} className={styles.image} />,
      width: 80,
      responsive: ['md']
    },
    {
      title: productTitleFilter,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Sauces',
      dataIndex: 'sauces',
      key: 'sauces',
      width: 70,
      render: (value) => value ? 'sauces' : '---',
      responsive: ['lg']
    },
    {
      title: 'Week day',
      dataIndex: 'week_day',
      key: 'week_day',
      width: 100,
    },
    {
      title: 'Category',
      dataIndex: 'categories',
      key: 'categories',
      width: 150,
      responsive: ['md']
    },
    {
      title: 'Side',
      dataIndex: 'is_dish',
      key: 'is_dish',
      width: 50,
      render: (value) => value ? 'Side' : '---',
      responsive: ['md']
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value) => <ProductStatus status={value as TStatusType} />,
      responsive: ['lg']
    },
    {
      title: 'Total',
      dataIndex: 'price',
      key: 'price',
      width: 80,
      render: (value) => currency(value),
      responsive: ['lg']
    },
    {
      title: 'Action',
      key: 'action',
      width: 120,
      render: (_, record) => (
        <div style={{display: "flex", justifyContent: 'space-around'}}>
          <a className={styles.actionLink} onClick={() => navigate(`${PageConfig.product}/${record.id}`)}>
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
            icon={<AddSvg className={styles.addSwg} />}
            className={styles.buttonTop}
            onClick={() => navigate(`${PageConfig.product}/add`)}
          >
            Add new Product
          </Button>
        </div>
        <Table
          className={styles.table}
          rowKey="id"
          size="middle"
          loading={products.fetching}
          dataSource={products.data?.products
            .filter(product => product.title.toLowerCase().includes(searchTitle.toLowerCase()))
          }
          columns={columns}
          pagination={false}
          scroll={{ x: true, y: `calc(100vh - 170px)` }}
        />
      </div>
    </div>
  );
};

export default Product;
