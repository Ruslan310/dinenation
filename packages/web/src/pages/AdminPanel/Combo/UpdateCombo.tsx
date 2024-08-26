import React, {useEffect, useState} from 'react';
import {Button, Collapse, CollapseProps, Form, Input, InputNumber, message, Select} from "antd";
import {useNavigate, useParams} from "react-router-dom";
import styles from "./Combo.module.css";
import {CATEGORIES_TYPE, ComponentType, ProductStatus, WeekDay} from "../../../utils/utils";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import SelectComboProduct from "../../../components/Form/SelectComboProduct";
import UploadPicture from "../../../components/Form/UploadPicture";
import {NotFound} from "../../index";

const {TextArea} = Input;

export interface ComboForm {
  id: number;
  title: string;
  domain_id: number;
  price: number;
  type: string;
  image: string;
  description: string;
  week_day: string;
  status: string;
}

export interface ComboFormInitial {
  id: number;
  title: string;
  domain_id: number;
  price: number;
  type: string;
  image: string;
  description: string | null | undefined;
  week_day: string;
  status: string;
  mainProducts: ComboProductForm[];
  secondProducts: ComboProductForm[];
  dessertProducts: ComboProductForm[];
}

interface ComboProductForm {
  product_id: number;
  combo_id: number;
  price: number;
  dish_type: ComponentType;
}

const key = 'updatable';

const UpdateCombo = () => {
  const [form] = Form.useForm();
  const currentId= useParams();
  const currentComboId = Number(currentId.id) as number
  const [picture, setPicture] = useState('');
  const [isLoadingImage, setLoadingImage] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<ComboFormInitial>>();

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const navigate = useNavigate();
  const [combo] = useTypedQuery({
    query: {
      comboById: {
        __args: {
          id: currentComboId
        },
        id: true,
        title: true,
        domain_id: true,
        price: true,
        type: true,
        image: true,
        description: true,
        week_day: true,
        status: true,
        products: {
          id: true,
          title: true,
          price: true,
          dish_type: true,
        },
      },
    },
  });

  const [combo_prod, addComboProducts] = useTypedMutation((opts: ComboProductForm) => ({
    addComboProducts: {
      __args: opts,
      product_id: true,
    },
  }));

  const [products] = useTypedQuery({
    query: {
      products: {
        id: true,
        title: true,
      },
    },
  });

  useEffect(() => {
    if (combo.data?.comboById.image) {
      setPicture(combo.data?.comboById.image);
    }
  }, [combo]);

  useEffect(() => {
    if (combo.data?.comboById) {
      const {
        products,
        image,
        ...rest
      } = combo.data?.comboById;
      setPicture(combo.data?.comboById.image);
      setInitialValues({
        ...rest,
        mainProducts: products.filter(product => product.dish_type === ComponentType.MAIN).map(product => ({
          product_id: product.id,
          combo_id: currentComboId,
          price: product.price,
          dish_type: ComponentType.MAIN,
        })),
        secondProducts: products.filter(product => product.dish_type === ComponentType.SECOND).map(product => ({
          product_id: product.id,
          combo_id: currentComboId,
          price: product.price,
          dish_type: ComponentType.SECOND,
        })),
        dessertProducts: products.filter(product => product.dish_type === ComponentType.DESSERT).map(product => ({
          product_id: product.id,
          combo_id: currentComboId,
          price: product.price,
          dish_type: ComponentType.DESSERT,
        })),
      });
    }
  }, [combo.data]);

  const [up, updateCombo] = useTypedMutation((opts: ComboForm) => ({
    updateCombo: {
      __args: opts,
      id: true,
    },
  }));

  const [del, deleteComboProduct] = useTypedMutation((opts: {combo_id: number}) => ({
    deleteComboProduct: {
      __args: opts,
    },
  }));

  const [domains] = useTypedQuery({
    query: {
      domains: {
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
          arr={products.data?.products || []}
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
          arr={products.data?.products || []}
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
          arr={products.data?.products || []}
          placeholder={"Product name"}
          buttonText='Add Dessert Products'
        />
      ),
    },
  ];

  return (
    <div className={styles.page}>
      <AdminNavbar />
      {initialValues && domains.data?.domains ?
        <Form className={styles.form} layout="horizontal" form={form} initialValues={initialValues}>
          <Form.Item name="title" rules={[{ required: true, message: 'Please enter name!' }]} className={styles.field}>
            <Input placeholder='Enter product name' />
          </Form.Item>
          <Form.Item
            name="domain_id"
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
              {domains.data?.domains
                .map(({id, title}) => <Select.Option key={id} value={id}>{title}</Select.Option>)}
            </Select>
          </Form.Item>
          <Form.Item className={styles.field} name="price" rules={[{ required: true, message: 'Please enter price!' }]}>
            <InputNumber placeholder='Price' min={0} className={styles.numberField} />
          </Form.Item>
          <Form.Item
            name="type"
            rules={[{ required: true, message: 'Please enter categories type!' }]}
            style={{ display: 'inline-block' }}
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
          <UploadPicture
            picture={picture}
            setPicture={setPicture}
            load={isLoadingImage}
            setLoad={setLoadingImage}
          />
          <Form.Item name="description" className={styles.field}>
            <TextArea placeholder='Enter description' />
          </Form.Item>
          <Form.Item
            name="week_day"
            rules={[{ required: true, message: 'Please select week day!' }]}
            style={{ display: 'inline-block' }}
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
            rules={[{ required: true, message: 'Please select order status!' }]}
            style={{ display: 'inline-block' }}
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
                message.loading({ content: 'Saving component...', key });
                const {
                  title,
                  domain_id,
                  price,
                  type,
                  description,
                  week_day,
                  status,
                  mainProducts,
                  secondProducts,
                  dessertProducts
                } = form.getFieldsValue();
                const { data } = await updateCombo({
                  id: currentComboId,
                  title,
                  domain_id,
                  price,
                  type,
                  image: picture,
                  description,
                  week_day,
                  status,
                });

                await deleteComboProduct({combo_id: currentComboId});
                const addMainProducts = mainProducts?.map(({id, price}: {id: number, price: number}) =>
                  addComboProducts({
                    combo_id: currentComboId,
                    product_id: id,
                    price,
                    dish_type: ComponentType.MAIN,
                  })
                );

                const addSecondProducts = secondProducts?.map(({id, price}: {id: number, price: number}) =>
                  addComboProducts({
                    combo_id: currentComboId,
                    product_id: id,
                    price,
                    dish_type: ComponentType.SECOND,
                  })
                );

                const addDessertProducts = dessertProducts?.map(({id, price}: {id: number, price: number}) =>
                  addComboProducts({
                    combo_id: currentComboId,
                    product_id: id,
                    price,
                    dish_type: ComponentType.DESSERT,
                  })
                );

                await Promise.all([...addMainProducts, ...addSecondProducts, ...addDessertProducts]);
                message.success({content: 'Combo successfully saved!', key, duration: 2});
                data && navigate('/combo');
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Combo
            </Button>
          </Form.Item>
        </Form>
        : <Loading />
      }
    </div>
  );
};

export default UpdateCombo;
