import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Domains.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import AddSvg from "../../../components/svg/AddSvg";
import {Input, message, Modal, Table} from "antd";
import {useResize} from "../../../hooks/useResize";
import {PageConfig} from "../../../utils/utils";
import {ColumnsType} from "antd/es/table";


interface DomainType {
  id: number;
  title: string;
}

interface IColumnsType {
  id: React.Key;
  title: string;
  combos: {
    title: string;
  }[]
}

const Domains = () => {
  const [open, setOpen] = useState<DomainType | undefined>();
  const [searchText, setSearchText] = useState<string>('');
  const navigate = useNavigate();
  const {isScreenSm} = useResize();

  const [domains] = useTypedQuery({
    query: {
      domains: {
        id: true,
        title: true,
        combos: {
          title: true
        }
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [_, deleteDomain] = useTypedMutation((opts: {id: number}) => ({
    deleteDomain: {
      __args: opts,
    },
  }));

  const deleteItem = async (id: number) => {
    try {
      await deleteDomain({id: id})
      setOpen(undefined)
      message.success({content: 'Domain successfully deleted!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  }

  const domainTitleFilter = (
    <Input
      placeholder="Title"
      value={searchText}
      onChange={e => setSearchText(e.target.value.toLowerCase())}
    />
  );

  const columns: ColumnsType<IColumnsType> = [
    {
      title: domainTitleFilter,
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: "Combos",
      dataIndex: 'combos',
      key: 'combos',
      render: (value, record) =>
        <div>
          {record.combos.map((combo, index) => <p key={`${index+combo.title}`}>{index+1}. {combo.title}</p>)}
        </div>
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      render: (value) =>
        <div style={{width: 100, display: "flex", justifyContent: 'space-between'}}>
          <DeleteOutlined style={{fontSize: 20}} onClick={e => {
              e.stopPropagation()
              setOpen(value)
            }}/>
          <a className={styles.actionLink} style={{marginRight: 20}} onClick={() => navigate(`${PageConfig.domains}/${value.id}`)}>
            View
          </a>
        </div>
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
      <AdminNavbar/>
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            icon={<AddSvg className={styles.addSwg}/>}
            className={styles.buttonTop}
            onClick={() => navigate(`${PageConfig.domains}/add`)}
          >
            {isScreenSm ? 'Add' : 'Add new Domain'}
          </Button>
        </div>
        <Table
          className={styles.table}
          rowKey="id"
          size="middle"
          loading={domains.fetching}
          dataSource={domains.data?.domains
            .filter(domain => domain.title.toLowerCase().includes(searchText.toLowerCase()))
          }
          columns={columns}
          scroll={{x: true, y: `calc(100vh - 200px)`}}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default Domains;
