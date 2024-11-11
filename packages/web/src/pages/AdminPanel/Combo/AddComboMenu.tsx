import React, {useState} from 'react';
import {Button, Collapse, CollapseProps, Form, Input, InputNumber, message, Select} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./Combo.module.css";
import {COMBO_TYPE, ComponentType, PageConfig, ProductStatus, WeekDay} from "../../../utils/utils";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import SelectComboProduct from "../../../components/Form/SelectComboProduct";
import UploadPicture from "../../../components/Form/UploadPicture";

const {TextArea} = Input;


interface ComboForm {
  title: string;
  price: number;
  type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
  products: ComboProductForm[]
}

export interface ComboProductForm {
  product_id: number;
  price: number;
  dish_type: ComponentType;
}

const key = 'updatable';


const AddComboMenu = () => {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState('');
  const [isLoadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();

  const [_, addCombo] = useTypedMutation((opts: ComboForm) => ({
    addCombo: {
      __args: opts,
      id: true,
    },
  }));

  const [{data}] = useTypedQuery({
    query: {
      products: {
        id: true,
        title: true,
      },
    },
  });

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: 'Main Products',
      children: (
        <SelectComboProduct
          name="mainProducts"
          arr={data?.products || []}
          placeholder={"Product name"}
          buttonText='Add Main Products'
        />
      ),
    },
    {
      key: '2',
      label: 'Second Products',
      children: (
        <SelectComboProduct
          name="secondProducts"
          arr={data?.products || []}
          placeholder={"Product name"}
          buttonText='Add Side Products'
        />
      ),
    },
    {
      key: '3',
      label: 'Dessert Products',
      children: (
        <SelectComboProduct
          name="dessertProducts"
          arr={data?.products || []}
          placeholder={"Product name"}
          buttonText='Add Desser Products'
        />
      ),
    },
  ];


  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form className={styles.form} layout="horizontal" form={form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter product name'/>
        </Form.Item>
        <Form.Item className={styles.field} name="price" rules={[{required: true, message: 'Please enter price!'}]}>
          <InputNumber min={0} className={styles.numberField} placeholder='Price'/>
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{required: true, message: 'Please select categories type!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select package type"
            filterOption={(input, option) =>
              option ? option?.children?.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(COMBO_TYPE)
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
            placeholder="Select combo status"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(ProductStatus)
              .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
          </Select>
        </Form.Item>
        <Collapse bordered={false} className={styles.collapse} items={items} />
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {
                title,
                price,
                type,
                description,
                week_day,
                status,
                mainProducts,
                secondProducts,
                dessertProducts
              } = form.getFieldsValue();

              const products = [
                ...mainProducts?.map(({ product_id, price }: { product_id: number; price: number }) => ({
                  product_id,
                  price,
                  dish_type: ComponentType.MAIN,
                })) || [],
                ...secondProducts?.map(({ product_id, price }: { product_id: number; price: number }) => ({
                  product_id,
                  price,
                  dish_type: ComponentType.SECOND,
                })) || [],
                ...dessertProducts?.map(({ product_id, price }: { product_id: number; price: number }) => ({
                  product_id,
                  price,
                  dish_type: ComponentType.DESSERT,
                })) || [],
              ];

              const res = await addCombo({
                title,
                price,
                type,
                image: picture,
                description,
                week_day,
                status,
                products,
              });

              message.success({content: 'Combo successfully saved!', key, duration: 2});
              res.data && navigate(PageConfig.combo)
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Create Combo
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddComboMenu;
