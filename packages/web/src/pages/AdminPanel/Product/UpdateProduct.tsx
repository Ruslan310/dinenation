import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import styles from "./Product.module.css";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import { useNavigate } from "react-router-dom";
import {Button, InputNumber, Form, Input, message, Select, Switch} from 'antd';
import {
  CATEGORIES_TYPE,
  ComponentType,
  EAllergensList, PageConfig,
  ProductStatus,
  WeekDay
} from "../../../utils/utils";
import Loading from "../../../components/Loader/Loading";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import UploadPictureProduct, {ImgType} from "../../../components/Form/UploadPictureProduct";
import {NotFound} from "../../index";
import {ProductForm} from "../../../utils/type";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const {TextArea} = Input;



export interface ProductData {
  id: number;
  title: string;
  price: number;
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
  const [picture, setPicture] = useState<ImgType>();
  const [initialValues, setInitialValues] = useState<Partial<ProductData>>();
  const [isLoadingImage, setLoadingImage] = useState<boolean>(false);
  const navigate = useNavigate();
  const currentId= useParams();
  const currentProductId = Number(currentId.id) as number

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const [_, updateProduct] = useTypedMutation((opts: ProductForm) => ({
    updateProduct: {
      __args: opts,
      id: true,
    },
  }));

  const [data] = useTypedQuery({
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
        small_img: true,
        description: true,
        week_day: true,
        status: true,
        calories: true,
        is_dish: true,
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
    if (data?.data) {
      const {
        allergens,
        sauces,
        image,
        small_img,
        ...rest
      } = data?.data.product;
      setPicture({
        img: image,
        imgSmall: small_img,
      })
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
          <div className={styles.switch}>
            <Form.Item className={styles.field} name="price" rules={[{required: true, message: 'Please enter price!'}]}>
              <InputNumber placeholder='Price' min={0} className={styles.numberField}/>
            </Form.Item>
            <Form.Item label={"Has side"} name="is_dish" className={styles.field}>
              <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
            </Form.Item>
          </div>
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
          <UploadPictureProduct
            picture={picture?.img || ''}
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
          <Form.Item name="calories" className={styles.field}>
            <Input maxLength={30} placeholder='Enter calories'/>
          </Form.Item>
          <Form.Item className={styles.button}>
            <Button onClick={async () => {
              try {
                await form.validateFields();
                message.loading({content: 'Saving product...', key});
                const {
                  title,
                  price,
                  allergens,
                  sauces,
                  is_dish,
                  categories,
                  dish_type,
                  description,
                  week_day,
                  status,
                  calories
                } = form.getFieldsValue();
                const {data} = await updateProduct({
                  id: currentProductId,
                  title,
                  price,
                  is_dish,
                  allergens: allergens?.join(',').trim(),
                  sauces: sauces?.join(',').trim(),
                  categories,
                  dish_type,
                  image: picture?.img || '',
                  small_img: picture?.imgSmall || '',
                  description,
                  week_day,
                  status,
                  calories,
                });
                message.success({content: 'Product successfully saved!', key, duration: 2});
                data && navigate(PageConfig.product)
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Product
            </Button>
          </Form.Item>
        </Form>
        : <Loading/>
      }
    </div>
  );
};
