import React from 'react';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {useNavigate} from "react-router-dom";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import Button from "../../../components/Button/Button";
import styles from './Product.module.css'
import Loading from "../../../components/Loader/Loading";
import Empty from "../../../components/Empty";
import {DeleteOutlined} from "@ant-design/icons";

const Product = () => {
  const navigate = useNavigate();

  const [products] = useTypedQuery({
    query: {
      products: {
        id: true,
        title: true,
        price: true,
      },
    },
  });

  const [_, deleteProduct] = useTypedMutation((opts: {id: number}) => ({
    deleteProduct: {
      __args: opts,
    },
  }));

  const deleteItem = async (id: number) => {
    let result = await deleteProduct({id: id})
    console.log('------result', result)
  }

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <div>
        <Button className={styles.buttonTop} onClick={() => navigate('/addProduct')}>
          Add new Product
        </Button>
        {products.fetching ?
          <Loading /> :
          products.data?.products ?
            <>
              {products.data?.products.map(product => (
                <div key={product.id} className={styles.productItemBlock}>
                  <div onClick={() => navigate(`/updateProduct/${product.id}`)} className={styles.productItem}>
                    <p>{product.title}</p>
                    <p>{product.price}</p>
                  </div>
                  <DeleteOutlined style={{fontSize: 20}} onClick={() => deleteItem(product.id)}/>
                </div>
              ))}
            </>
            : <Empty>&#10024; Product list is empty &#10024;</Empty>
        }
      </div>
    </div>
  );
};

export default Product;
