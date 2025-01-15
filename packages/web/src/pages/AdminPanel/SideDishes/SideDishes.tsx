import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./SideDishes.module.css";
import Empty from "../../../components/Empty/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import {message, Modal} from "antd";
import AddSvg from "../../../components/svg/AddSvg";
import SideDishListSvg from "../../../components/svg/SideDishListSvg";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {DishType, PageConfig, TStatusType} from "../../../utils/utils";

interface SideDishType {
  id: number;
  title: string;
  type: string;
  status: string;
}

const SideDishes = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<SideDishType | undefined>();

  const [dishes] = useTypedQuery({
    query: {
      sideDishes: {
        id: true,
        title: true,
        type: true,
        status: true,
      },
    },
    requestPolicy: 'cache-and-network',
  });

  const [_, deleteDishes] = useTypedMutation((opts: {id: number}) => ({
    deleteSideDish: {
      __args: opts,
    },
  }));

  const deleteItem = async (id: number) => {
    try {
      await deleteDishes({id: id})
      setOpen(undefined)
      message.success({content: 'Dish successfully deleted!', duration: 2});
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
          <h3> {open?.title} ?</h3>
          <Button loading={_.fetching} onClick={() => open && deleteItem(open?.id)}>OK</Button>
        </div>
      </Modal>
      <AdminNavbar />
      <div className={styles.container}>
        <div className={styles.header}>
          <Button
            icon={<AddSvg className={styles.addSwg}/>}
            className={styles.buttonTop}
            onClick={() => navigate(`${PageConfig.side_dishes}/add`)}
          >
            Add new {DishType.SIDE}
          </Button>
        </div>
        {dishes.fetching ?
          <Loading/> :
          dishes.data?.sideDishes ?
            <div className={styles.itemsContainer}>
              {dishes.data?.sideDishes.map(sideDish => (
                <div
                  onClick={() => navigate(`${PageConfig.side_dishes}/${sideDish.id}`)}
                  key={sideDish.id}
                  className={styles.productItemBlock}
                >
                  <div className={styles.productItem}>
                    <SideDishListSvg type={sideDish.type} className={styles.img} />
                    <h3>{sideDish.title}</h3>
                  </div>
                  <div className={styles.priceItem}>
                    <ProductStatus status={sideDish.status as TStatusType} />
                    <DeleteOutlined style={{fontSize: 20}} onClick={e => {
                      e.stopPropagation()
                      setOpen(sideDish)
                    }}/>
                  </div>
                </div>
              ))}
            </div>
            : <Empty>&#10024; Dishes list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default SideDishes;
