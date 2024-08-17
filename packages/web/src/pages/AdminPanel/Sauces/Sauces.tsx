import React from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./Sauces.module.css";
import Empty from "../../../components/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';

const Sauces = () => {
  const navigate = useNavigate();
  const [sauces] = useTypedQuery({
    query: {
      sauces: {
        id: true,
        title: true,
      },
    },
  });

  const [_, deleteSauces] = useTypedMutation((opts: {id: number}) => ({
    deleteSauces: {
      __args: opts,
    },
  }));
  const deleteItem = async (id: number) => {
    let result = await deleteSauces({id: id})
    console.log('------result', result)
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div>
        <Button onClick={() => navigate('/addSauces')}>
          Add new Sauces
        </Button>
        {sauces.fetching ?
          <Loading/> :
          sauces.data?.sauces ?
            <>
              {sauces.data?.sauces.map(({id, title}) =>(
                <div key={id} className={styles.sauceItemBlock}>
                  <div onClick={() => navigate(`/updateSauces/${id}`)} className={styles.sauceItem}>
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

export default Sauces;
