import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, message, Select} from "antd";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./Sauces.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import {ProductStatus} from "../../../utils/utils";

interface SauceForm {
  id: number;
  title: string;
  status: string;
}

const key = 'updatable';


const UpdateSauces = () => {
  const currentId= useParams();
  const currentSauceId = Number(currentId?.id) as number
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [sauce] = useTypedQuery({
    query: {
      sauce: {
        __args: {
          id: currentSauceId
        },
        id: true,
        title: true,
        status: true,
      },
    },
  });
  const [_, updateSauces] = useTypedMutation((opts: SauceForm) => ({
    updateSauces: {
      __args: opts,
      id: true,
    },
  }));

  return (
    <div className={styles.page}>
      <AdminNavbar />
      {sauce.data?.sauce ?
        <Form layout="horizontal" className={styles.form} form={form} initialValues={sauce.data?.sauce}>
          <Form.Item
            name="title"
            rules={[{required: true, message: 'Please enter name!'}]}
            className={styles.field}>
            <Input placeholder='Enter sauces name'/>
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
          <Form.Item className={styles.button}>
            <Button onClick={async () => {
              try {
                await form.validateFields();
                message.loading({content: 'Saving component...', key});
                const {data} = await updateSauces({
                  id: currentSauceId,
                  ...form.getFieldsValue(),
                });
                message.success({content: 'Sauces successfully saved!', key, duration: 2});
                data && navigate('/sauces')
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Sauces
            </Button>
          </Form.Item>
        </Form>
        : <Loading/>
      }
    </div>
  );
};

export default UpdateSauces;
