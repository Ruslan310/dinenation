import React, {useState} from 'react';
import {Button, Collapse, CollapseProps, Form, Input, InputNumber, message, Select} from "antd";
import {useNavigate} from "react-router-dom";
import styles from "./Combo.module.css";
import {COMBO_TYPE, ComponentType, ProductStatus, WeekDay} from "../../../utils/utils";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import SelectComboProduct from "../../../components/Form/SelectComboProduct";
import UploadPicture from "../../../components/Form/UploadPicture";

const {TextArea} = Input;


interface ComboForm {
  title: string;
  coupon_id: string;
  price: string;
  type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
}

interface ComboProductForm {
  product_id: number;
  combo_id: number;
  price: string;
  dish_type: ComponentType;
}

const key = 'updatable';


const AddComboMenu = () => {
  const [form] = Form.useForm();
  const [picture, setPicture] = useState('');
  const [isLoadingImage, setLoadingImage] = useState(false);
  const navigate = useNavigate();

  const [combo, addCombo] = useTypedMutation((opts: ComboForm) => ({
    addCombo: {
      __args: opts,
      id: true,
    },
  }));

  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
      },
    },
  });

  const [{data}] = useTypedQuery({
    query: {
      products: {
        id: true,
        title: true,
      },
    },
  });

  const [_, addComboProducts] = useTypedMutation((opts: ComboProductForm) => ({
    addComboProducts: {
      __args: opts,
      product_id: true
    },
  }));

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
      label: 'Side Products',
      children: (
        <SelectComboProduct
          name="sideProducts"
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
      <Form className={styles.form} onChange={() => console.log(form.getFieldsValue())} layout="horizontal" form={form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter product name'/>
        </Form.Item>
        <Form.Item
          name="coupon_id"
          rules={[{required: true, message: 'Select coupon!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select package type"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {coupons.data?.coupons
              .map(({id, title}) => <Select.Option key={id} value={id}>{title}</Select.Option>)}
          </Select>
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
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
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
                coupon_id,
                price,
                type,
                description,
                week_day,
                status,
                mainProducts,
                sideProducts,
                dessertProducts
              } = form.getFieldsValue();
              const res = await addCombo({
                title,
                coupon_id,
                price: price.toString(),
                type,
                image: picture,
                description,
                week_day,
                status,
              });
              if (res.data && res.data.addCombo.id) {
                const comboId = res.data.addCombo.id

                const addMainProducts = mainProducts?.map(({id, price}: { id: number, price: string }) =>
                  addComboProducts({
                    combo_id: comboId,
                    product_id: id,
                    price: price.toString(),
                    dish_type: ComponentType.MAIN,
                  })
                );

                const addSideProducts = sideProducts?.map(({id, price}: { id: number, price: string }) =>
                  addComboProducts({
                    combo_id: comboId,
                    product_id: id,
                    price: price.toString(),
                    dish_type: ComponentType.SECOND,
                  })
                );

                const addDessertProducts = dessertProducts?.map(({id, price}: { id: number, price: string }) =>
                  addComboProducts({
                    combo_id: comboId,
                    product_id: id,
                    price: price.toString(),
                    dish_type: ComponentType.DESSERT,
                  })
                );
                await Promise.all([...addMainProducts, ...addSideProducts, ...addDessertProducts]);
              }
              message.success({content: 'Combo successfully saved!', key, duration: 2});
              res.data && navigate('/combo')
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
