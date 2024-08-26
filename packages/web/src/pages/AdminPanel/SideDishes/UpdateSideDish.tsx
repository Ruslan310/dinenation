import React from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Button, Form, Input, message, Select} from "antd";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import styles from "./SideDishes.module.css";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import Loading from "../../../components/Loader/Loading";
import {EColorSideDishList, ProductStatus} from "../../../utils/utils";
import {NotFound} from "../../index";

interface SideDishForm {
  id: number;
  title: string;
  type: string;
  status: string;
}

const key = 'updatable';


const UpdateSideDish = () => {
  const currentId = useParams();
  const currentDishId = Number(currentId?.id) as number
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const [sideDish] = useTypedQuery({
    query: {
      sideDish: {
        __args: {
          id: currentDishId
        },
        id: true,
        title: true,
        type: true,
        status: true,
      },
    },
  });
  const [_, updateSideDish] = useTypedMutation((opts: SideDishForm) => ({
    updateSideDish: {
      __args: opts,
      id: true,
    },
  }));

  return (
    <div className={styles.page}>
      <AdminNavbar />
      {sideDish.data?.sideDish ?
        <Form layout="horizontal" className={styles.form} form={form} initialValues={sideDish.data?.sideDish}>
          <Form.Item
            name="title"
            rules={[{required: true, message: 'Please enter name!'}]}
            className={styles.field}>
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
            rules={[{required: true, message: 'Please dishes status!'}]}
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
                const {data} = await updateSideDish({
                  id: currentDishId,
                  ...form.getFieldsValue(),
                });
                message.success({content: 'Sauces successfully saved!', key, duration: 2});
                data && navigate('/sideDishes')
              } catch (e) {
                console.log('validations errors: ', e);
              }
            }} type="primary" htmlType="submit">
              Update Dishes
            </Button>
          </Form.Item>
        </Form>
        : <Loading/>
      }
    </div>
  );
};

export default UpdateSideDish;
