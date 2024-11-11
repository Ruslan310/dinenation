import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import Loading from "../../../components/Loader/Loading";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Domains.module.css";
import Empty from "../../../components/Empty/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import AddSvg from "../../../components/svg/AddSvg";
import {Input, message, Modal} from "antd";
import {useResize} from "../../../hooks/useResize";
import {PageConfig} from "../../../utils/utils";

const {Search} = Input;

interface DomainType {
  id: number;
  title: string;
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
            onClick={() => navigate(`${PageConfig.domains}/add`)}
          >
            {isScreenSm ? 'Add' : 'Add new Domain'}
          </Button>
          <Search
            className={styles.search}
            placeholder="Search domain"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={setSearchText}
          />
        </div>
        {domains.fetching ?
          <Loading/> :
          domains.data?.domains ?
            <div className={styles.itemsContainer}>
              {domains.data?.domains
                .filter(domain => domain.title.toLowerCase().includes(searchText.toLowerCase()))
                .map(domain => (
                <div
                  onClick={() => navigate(`${PageConfig.domains}/${domain.id}`)}
                  key={domain.id}
                  className={styles.productItemBlock}
                >
                  <div className={styles.productItem}>
                    <p>{domain.title}</p>
                  </div>
                  <DeleteOutlined style={{fontSize: 20}} onClick={e => {
                    e.stopPropagation()
                    setOpen(domain)
                  }}/>
                </div>
              ))}
            </div>
            : <Empty>&#10024; Domain list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default Domains;
