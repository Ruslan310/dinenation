import React, {useState} from 'react';
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import styles from './Combo.module.css'
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from "@ant-design/icons";
import {Input, message, Modal, Table} from "antd";
import AddSvg from "../../../components/svg/AddSvg";
import {currency} from "../../../utils/handle";
import {PageConfig, TStatusType} from "../../../utils/utils";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {ColumnsType} from "antd/es/table";

interface ComboType {
  id: number;
  title: string;
  price: number;
  image: string;
  week_day: string;
  status: string;
}

const Combo = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<ComboType | undefined>();
  const [searchTitle, setSearchTitle] = useState('');

  const [combos] = useTypedQuery({
    query: {
      combosList: {
        id: true,
        title: true,
        price: true,
        image: true,
        week_day: true,
        type: true,
        status: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });


  const [_, deleteCombo] = useTypedMutation((opts: {id: number}) => ({
    deleteCombo: {
      __args: opts,
      id: true
    },
  }));

  const deleteItem = async (id: number) => {
    try {
      await deleteCombo({id: id})
      setOpen(undefined)
      message.success({content: 'Combo successfully deleted!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  }

  const comboTitleFilter = (
    <Input
      placeholder="Title"
      value={searchTitle}
      onChange={e => setSearchTitle(e.target.value.toLowerCase())}
    />
  );

  const columns: ColumnsType<ComboType> = [
    {
      title: '',
      dataIndex: 'image',
      key: 'image',
      render: (value) => <img src={value} className={styles.img} alt='item'/>,
      width: 80,
      responsive: ['md']
    },
    {
      title: comboTitleFilter,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Week day',
      dataIndex: 'week_day',
      key: 'week_day',
      width: 90,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value) => <ProductStatus className={styles.statusBlock} status={value as TStatusType} />,
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
          <a className={styles.actionLink} onClick={() => navigate(`${PageConfig.combo}/${record.id}`)}>
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
            onClick={() => navigate(`${PageConfig.combo}/add`)}
          >
            Add new Combo
          </Button>
        </div>
        <Table
          className={styles.table}
          rowKey="id"
          size="middle"
          loading={combos.fetching}
          dataSource={combos.data?.combosList
            .filter(combo => combo.title.toLowerCase().includes(searchTitle.toLowerCase()))
          }
          columns={columns}
          pagination={false}
          scroll={{ x: true, y: `calc(100vh - 170px)` }}
        />
      </div>
    </div>
  );
};

export default Combo;
