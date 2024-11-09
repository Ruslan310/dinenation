import React, {useState} from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./Coupons.module.css";
import Empty from "../../../components/Empty/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';
import AddSvg from "../../../components/svg/AddSvg";
import {Modal} from "antd";
import ProductStatus from "../../../components/ProductStatus/ProductStatus";
import {TStatusType} from "../../../utils/utils";

interface CouponType {
  id: number;
  title: string;
  status: string;
}

const Coupons = () => {
  const [open, setOpen] = useState<CouponType | undefined>();
  const navigate = useNavigate();
  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
        status: true,
      },
    },
  });

  const [_, deleteCoupon] = useTypedMutation((opts: {id: number}) => ({
    deleteCoupon: {
      __args: opts,
    },
  }));
  const deleteItem = async (id: number) => {
    let result = await deleteCoupon({id: id})
    console.log('------result', result)
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
            onClick={() => navigate('/addCoupon')}
          >
            Add new Coupons
          </Button>
        </div>
        {coupons.fetching ?
          <Loading/> :
          coupons.data?.coupons ?
            <div className={styles.itemsContainer}>
              {coupons.data?.coupons.map(coupons => (
                <div
                  onClick={() => navigate(`/updateCoupon/${coupons.id}`)}
                  key={coupons.id}
                  className={styles.productItemBlock}
                >
                  <div className={styles.productItem}>
                    <p>{coupons.title}</p>
                  </div>
                  <div className={styles.priceItem}>
                    <ProductStatus status={coupons.status as TStatusType} />
                    <DeleteOutlined style={{fontSize: 20}} onClick={e => {
                      e.stopPropagation()
                      setOpen(coupons)
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

export default Coupons;
