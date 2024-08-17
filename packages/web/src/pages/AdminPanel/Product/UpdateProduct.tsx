import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from "./Product.module.css";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import { useNavigate } from "react-router-dom";
import {Button, InputNumber, Form, Input, message, Select} from 'antd';
import {
  CATEGORIES_TYPE,
  ComponentType,
  EAllergensList,
  ProductStatus,
  WeekDay
} from "../../../utils/utils";
import Loading from "../../../components/Loader/Loading";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import UploadPicture from "../../../components/Form/UploadPicture";
const {TextArea} = Input;

export interface ProductForm {
  id: number
  title: string;
  price: string;
  allergens: EAllergensList;
  sauces: string;
  categories: string;
  dish_type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
  calories: string;
}

interface ProductData {
  id: number;
  title: string;
  price: string;
  categories: string;
  dish_type: string;
  description: string;
  allergens: string[];
  sauces: string[];
  week_day: string;
  status: string;
  calories: string;
}

const key = 'updatable';

export default function UpdateProduct() {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState<string>('');
  const [initialValues, setInitialValues] = useState<Partial<ProductData>>();
  const [isLoadingImage, setLoadingImage] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentId= useParams();
  const currentProductId = Number(currentId.id) as number
  const [_, updateProduct] = useTypedMutation((opts: ProductForm) => ({
    updateProduct: {
      __args: opts,
      id: true,
    },
  }));

  const [{data}] = useTypedQuery({
    query: {
      product: {
        __args: {
          id: currentProductId
        },
        id: true,
        title: true,
        price: true,
        allergens: true,
        sauces: true,
        categories: true,
        dish_type: true,
        image: true,
        description: true,
        week_day: true,
        status: true,
        calories: true,
      },
    },
  });

  const [sauces] = useTypedQuery({
    query: {
      sauces: {
        id: true,
        title: true,
      },
    },
  });

  useEffect(() => {
    if (data?.product) {
      const {
        allergens,
        sauces,
        image,
        ...rest
      } = data?.product;
      setPicture(data?.product.image)
      setInitialValues({
        ...rest,
        allergens: allergens !== '' ? allergens?.split(',') : [],
        sauces: sauces !== '' ? sauces?.split(',') : [],
      } as ProductData);
    }
  }, [data])

  return (
    <div className={styles.page}>
      <AdminNavbar />
      {initialValues ?
        <Form className={styles.form} layout="horizontal" form={form} initialValues={initialValues}>
          <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
            <Input placeholder='Enter product name'/>
          </Form.Item>
          <Form.Item className={styles.field} name="price" rules={[{required: true, message: 'Please enter price!'}]}>
            <InputNumber placeholder='Price' min={0} className={styles.numberField}/>
          </Form.Item>
          <Form.Item name="allergens" className={styles.field}>
            <Select<string, { value: string; children: string }>
              placeholder="Select allergens"
              mode={'multiple'}
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(EAllergensList)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="sauces" className={styles.field}>
            <Select<string, { value: string; children: string }>
              placeholder="Select sauces"
              mode={'multiple'}
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {sauces.data?.sauces
                .map(({id, title}) =>
                  <Select.Option key={id} value={title}>{title}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="categories"
            rules={[{required: true, message: 'Please enter categories type!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              placeholder="Select package type"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(CATEGORIES_TYPE)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="dish_type"
            rules={[{required: true, message: 'Please enter dish type!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              placeholder="Select dish type"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(ComponentType)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <UploadPicture
            picture={picture}
            setPicture={setPicture}
            load={isLoadingImage}
            setLoad={setLoadingImage}
          />
          <Form.Item name="description" className={styles.field}>
            <TextArea placeholder='Enter description'/>
          </Form.Item>
          <Form.Item
            name="week_day"
            rules={[{required: true, message: 'Please select week day!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              placeholder="Select week day"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(WeekDay)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item
            name="status"
            rules={[{required: true, message: 'Please select order status!'}]}
            style={{display: 'inline-block'}}
            className={styles.field}
          >
            <Select<string, { value: string; children: string }>
              placeholder="Select product status"
              filterOption={(input, option) =>
                option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
              }
            >
              {Object.values(ProductStatus)
                .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item name="calories" rules={[{required: true, message: 'Please enter calories!'}]} className={styles.field}>
            <InputNumber placeholder='Enter calories'/>
          </Form.Item>
          <Form.Item className={styles.button}>
            <Button onClick={async () => {
              try {
                await form.validateFields();
                message.loading({content: 'Saving component...', key});
                const {title, price, allergens, sauces, categories, dish_type, description, week_day, status, calories} = form.getFieldsValue();
                const {data} = await updateProduct({
                  id: currentProductId,
                  title,
                  price: price.toString(),
                  allergens: allergens?.join(',').trim(),
                  sauces: sauces?.join(',').trim(),
                  categories,
                  dish_type,
                  image: picture,
                  description,
                  week_day,
                  status,
                  calories: calories.toString(),
                });
                message.success({content: 'Product successfully saved!', key, duration: 2});
                data && navigate(`/product`)
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
        : <Loading />
      }
    </div>
  );
};
