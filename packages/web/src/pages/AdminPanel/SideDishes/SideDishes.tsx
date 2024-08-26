import React from 'react';
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Loading from "../../../components/Loader/Loading";
import styles from "./SideDishes.module.css";
import Empty from "../../../components/Empty";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {DeleteOutlined} from '@ant-design/icons';

const SideDishes = () => {
  const navigate = useNavigate();
  const [dishes] = useTypedQuery({
    query: {
      sideDishes: {
        id: true,
        title: true,
      },
    },
  });

  const [_, deleteDishes] = useTypedMutation((opts: {id: number}) => ({
    deleteSideDish: {
      __args: opts,
    },
  }));

  const deleteItem = async (id: number) => {
    try {
      let result = await deleteDishes({id: id})
      console.log('------result', result)
    } catch (err) {
      console.log('---err', err)
    }
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div>
        <Button onClick={() => navigate('/addSideDish')}>
          Add new Dishes
        </Button>
        {dishes.fetching ?
          <Loading/> :
          dishes.data?.sideDishes ?
            <>
              {dishes.data?.sideDishes.map(({id, title}) =>(
                <div key={id} className={styles.sauceItemBlock}>
                  <div onClick={() => navigate(`/updateSideDish/${id}`)} className={styles.sauceItem}>
                    <p>{title}</p>
                  </div>
                  <DeleteOutlined style={{fontSize: 20}} onClick={() => deleteItem(id)}/>
                </div>
              ))}
            </>
            : <Empty>&#10024; Dishes list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default SideDishes;
