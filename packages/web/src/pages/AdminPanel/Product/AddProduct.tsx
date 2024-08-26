import React, {useState} from 'react';
import styles from "./Product.module.css";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, InputNumber, Form, Input, message, Select, Upload} from 'antd';
import {CATEGORIES_TYPE, ComponentType, EAllergensList, ProductStatus, WeekDay} from "../../../utils/utils";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import UploadPicture from "../../../components/Form/UploadPicture";
const {TextArea} = Input;

interface ProductForm {
  title: string;
  price: number;
  allergens: string;
  sauces: string;
  categories: string;
  dish_type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
  calories: string;
}

const key = 'updatable';

export default function AddProduct() {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState('');
  const [isLoadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();
  const [_, addProduct] = useTypedMutation((opts: ProductForm) => ({
    createProduct: {
      __args: opts,
      id: true,
    },
  }));

  const [sauces] = useTypedQuery({
    query: {
      sauces: {
        id: true,
        title: true,
      },
    },
  });
  console.log('-----picture', picture)

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form className={styles.form} layout="horizontal" form={form}>
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
          rules={[{required: true, message: 'Please enter categories!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select categories"
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
          <InputNumber placeholder='Calories'/>
        </Form.Item>
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {title, price, allergens, categories, description, week_day, status, calories, sauces, dish_type} = form.getFieldsValue();
              const {data} = await addProduct({
                title,
                price,
                allergens: allergens?.join(','),
                sauces: sauces?.join(','),
                categories,
                dish_type,
                image: picture,
                description,
                week_day,
                status,
                calories: calories.toString(),
              });
              message.success({content: 'Product successfully saved!', key, duration: 2});
              data && navigate('/product')
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
