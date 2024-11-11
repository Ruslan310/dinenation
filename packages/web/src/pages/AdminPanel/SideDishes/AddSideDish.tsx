import React from 'react';
import styles from './SideDishes.module.css'
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import {useNavigate} from "react-router-dom";
import {Button, Form, Input, message, Select} from 'antd';
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {EColorSideDishList, PageConfig, ProductStatus} from "../../../utils/utils";

interface SideDishForm {
  title: string;
  type: string;
  status: string;
}

const key = 'updatable';

const AddSideDish = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [_, addDish] = useTypedMutation((opts: SideDishForm) => ({
    addSideDish: {
      __args: opts,
      id: true,
    },
  }));

  return (
    <div className={styles.page}>
      <AdminNavbar />
      <Form layout="horizontal" form={form} className={styles.form}>
        <Form.Item name="title" rules={[{required: true, message: 'Please enter name!'}]} className={styles.field}>
          <Input placeholder='Enter dishes name'/>
        </Form.Item>
        <Form.Item
          name="type"
          rules={[{required: true, message: 'Please enter type!'}]}
          style={{display: 'inline-block'}}
          className={styles.field}
        >
          <Select<string, { value: string; children: string }>
            placeholder="Select dishes type"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(EColorSideDishList)
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
            placeholder="Select dishes status"
            filterOption={(input, option) =>
              option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
            }
          >
            {Object.values(ProductStatus)
              .map((type) => <Select.Option key={type} value={type}>{type}</Select.Option>)}
          </Select>
        </Form.Item>
        <Form.Item className={styles.button}>
          <Button onClick={async () => {
            try {
              await form.validateFields();
              message.loading({content: 'Saving component...', key});
              const {data} = await addDish(form.getFieldsValue());
              message.success({content: 'Sauces successfully saved!', key, duration: 2});
              data && navigate(PageConfig.side_dishes)
            } catch (e) {
              console.log('validations errors: ', e);
            }
          }} type="primary" htmlType="submit">
            Add Side Dish
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddSideDish;
