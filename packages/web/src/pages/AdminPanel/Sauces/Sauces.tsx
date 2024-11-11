import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./Sauces.module.css";
import Empty from "../../../components/Empty/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import AddSvg from "../../../components/svg/AddSvg";
import {Input, message, Modal} from "antd";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {DishType, PageConfig, TStatusType} from "../../../utils/utils";
import {useResize} from "../../../hooks/useResize";

const {Search} = Input;

interface SaucesType {
  id: number;
  title: string;
  status: string;
}

const Sauces = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<SaucesType | undefined>();
  const [searchText, setSearchText] = useState<string>('');
  const {isScreenSm} = useResize();

  const [sauces] = useTypedQuery({
    query: {
      sauces: {
        id: true,
        title: true,
        status: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [_, deleteSauces] = useTypedMutation((opts: {id: number}) => ({
    deleteSauces: {
      __args: opts,
    },
  }));
  const deleteItem = async (id: number) => {
    try {
      await deleteSauces({id: id})
      setOpen(undefined)
      message.success({content: 'Sauce successfully deleted!', duration: 2});
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
            onClick={() => navigate(`${PageConfig.sauces}/add`)}
          >
            {isScreenSm ? 'Add' : `Add new ${DishType.SAUCE}`}
          </Button>
          <Search
            className={styles.search}
            placeholder="Search sauce"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={setSearchText}
          />
        </div>
        {sauces.fetching ?
          <Loading/> :
          sauces.data?.sauces ?
            <div className={styles.itemsContainer}>
              {sauces.data?.sauces
                .filter(sauce => sauce.title.toLowerCase().includes(searchText.toLowerCase()))
                .map(sauces => (
                <div
                  onClick={() => navigate(`${PageConfig.sauces}/${sauces.id}`)}
                  key={sauces.id}
                  className={styles.productItemBlock}
                >
                  <div className={styles.productItem}>
                    <p>{sauces.title}</p>
                  </div>
                  <div className={styles.priceItem}>
                    <ProductStatus status={sauces.status as TStatusType} />
                    <DeleteOutlined style={{fontSize: 20}} onClick={e => {
                      e.stopPropagation()
                      setOpen(sauces)
                    }}/>
                  </div>
                </div>
              ))}
            </div>
            : <Empty>&#10024; Sauces list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default Sauces;
