import React, {useState} from 'react';
import styles from "./Product.module.css";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, InputNumber, Form, Input, message, Select, Switch} from 'antd';
import {CATEGORIES_TYPE, ComponentType, EAllergensList, PageConfig, ProductStatus, WeekDay} from "../../../utils/utils";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import UploadPictureProduct, {ImgType} from "../../../components/Form/UploadPictureProduct";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

const {TextArea} = Input;

interface ProductForm {
  title: string;
  price: number;
  allergens: string;
  sauces: string;
  is_dish: boolean;
  categories: string;
  dish_type: string;
  image: string;
  small_img: string;
  description: string;
  week_day: string;
  status: string;
  calories: string;
}



const key = 'updatable';

export default function AddProduct() {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState<ImgType>();
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

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form className={styles.form} layout="horizontal" form={form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter product name'/>
        </Form.Item>
        <div className={styles.switch}>
          <Form.Item className={styles.field} name="price" rules={[{required: true, message: 'Please enter price!'}]}>
            <InputNumber placeholder='Price' min={0} className={styles.numberField}/>
          </Form.Item>
          <Form.Item initialValue={true} label={"Has side"} name="is_dish" className={styles.field}>
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
          <Input maxLength={30} placeholder='Calories'/>
        </Form.Item>
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {
                title,
                price,
                allergens,
                categories,
                description,
                week_day,
                status,
                calories,
                sauces,
                is_dish,
                dish_type
              } = form.getFieldsValue();
              const {data} = await addProduct({
                title,
                price,
                allergens: allergens?.join(','),
                sauces: sauces?.join(','),
                is_dish,
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
            Add Product
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
