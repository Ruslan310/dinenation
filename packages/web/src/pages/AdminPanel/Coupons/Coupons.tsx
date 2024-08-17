import React from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./Coupons.module.css";
import Empty from "../../../components/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';

const Coupons = () => {
  const navigate = useNavigate();
  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
      },
    },
  });

  const [_, deleteCoupon] = useTypedMutation((opts: {id: number}) => ({
    deleteCoupon: {
      __args: opts,
      id: true,
    },
  }));
  const deleteItem = async (id: number) => {
    let result = await deleteCoupon({id: id})
    console.log('------result', result)
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div>
        <Button onClick={() => navigate('/addCoupons')}>
          Add new Coupons
        </Button>
        {coupons.fetching ?
          <Loading/> :
          coupons.data?.coupons ?
            <>
              {coupons.data?.coupons.map(({id, title}) =>(
                <div key={id} className={styles.sauceItemBlock}>
                  <div onClick={() => navigate(`/updateCoupons/${id}`)} className={styles.sauceItem}>
                    <p>{title}</p>
                  </div>
                  <DeleteOutlined style={{fontSize: 20}} onClick={() => deleteItem(id)}/>
                </div>
              ))}
            </>
            : <Empty>&#10024; Sauces list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default Coupons;
