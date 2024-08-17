import React from 'react';
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Button from "../../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import styles from './Combo.module.css'
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import Empty from "../../../components/Empty";
import {DeleteOutlined} from "@ant-design/icons";

const Combo = () => {
  const navigate = useNavigate();

  const [combos] = useTypedQuery({
    query: {
      combosList: {
        id: true,
        coupon_id: true,
        title: true,
        description: true,
        price: true,
        image: true,
        week_day: true,
        type: true,
        products: {
          id: true,
          title: true,
        },
      },
    },
  });

  const [_, deleteCombo] = useTypedMutation((opts: {id: number}) => ({
    deleteCombo: {
      __args: opts,
      id: true
    },
  }));

  const deleteItem = async (id: number) => {
    let result = await deleteCombo({id: id})
    console.log('------result', result)
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div>
        <Button onClick={() => navigate('/addCombo')}>
          Add new Combo
        </Button>
        {combos.fetching ?
          <Loading/> :
          combos.data?.combosList ?
            <>
              {combos.data?.combosList.map(combo => (
                <div key={combo.id} className={styles.comboItemBlock}>
                  <div onClick={() => navigate(`/updateCombo/${combo.id}`)} className={styles.comboItem}>
                    <p>{combo.title}</p>
                    <p>{combo.price}</p>
                  </div>
                  <DeleteOutlined style={{fontSize: 20}} onClick={() => deleteItem(combo.id)}/>
                </div>
              ))}
            </>
            : <Empty>&#10024; Combo list is empty &#10024;</Empty>
        }
      </div>
    </div>
)
  ;
};

export default Combo;
