import React, {useEffect, useState} from 'react';
import styles from './Users.module.css';
import {Form, FormProps, Input, message, Modal, Select, Switch} from "antd";
import {PageConfig, ROLE} from "../../../utils/utils";
import Button from "../../../components/Button/Button";
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import AdminNavbar from "../../../components/AdminNavbar/AdminNavbar";
import {NotFound} from "../../index";
import {useNavigate, useParams} from "react-router-dom";
import Loading from "../../../components/Loader/Loading";
import {CheckOutlined, CloseOutlined} from "@ant-design/icons";

interface UsersType {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  coupon_id: number;
  phone: string;
  is_update: boolean;
}

interface InitialForm {
  first_name: string;
  last_name: string;
  role: string;
  coupon: number;
  phone: string;
  is_update: boolean;
}

const UpdateUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const currentId= useParams();
  const currentUserId = Number(currentId.id) as number
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState<Partial<InitialForm>>();
  const [open, setOpen] = useState<boolean>(false);

  const isValidId = (id: string | undefined): boolean => {
    return id !== undefined && /^\d+$/.test(id);
  };

  if (!isValidId(currentId.id)) {
    return <NotFound />;
  }

  const [user] = useTypedQuery({
    query: {
      userId: {
        __args: {
          id: currentUserId
        },
        id: true,
        first_name: true,
        last_name: true,
        email: true,
        role: true,
        phone: true,
        is_update: true,
        coupon: {
          id: true,
          title: true,
        },
      },
    },
  });

  const [coupons] = useTypedQuery({
    query: {
      coupons: {
        id: true,
        title: true,
      },
    },
  });

  const [_, updateUser] = useTypedMutation((opts: UsersType) => ({
    updateUser: {
      __args: opts,
      id: true
    },
  }));

  useEffect(() => {
    if (user.data?.userId) {
      const {
        coupon,
        ...rest
      } = user.data?.userId;
      setInitialValues({
        coupon: coupon.id,
        ...rest
      })
    }
  }, [user.data])

  const submit: FormProps<InitialForm>['onFinish'] = async (values) => {
    setLoading(true)
    const {
      coupon,
      ...rest
    } = values

    try {
      if (user.data?.userId) {
        await updateUser({
          id: currentUserId,
          email: user.data?.userId.email,
          coupon_id: coupon,
          ...rest
        })
      }
      message.success({content: 'User data change successfully!', duration: 2});
      setLoading(false)
      form.resetFields()
      navigate(PageConfig.users)
    } catch (err) {
      setLoading(false)
      console.log('----', err)
      message.error({content: 'Failed change!', duration: 2});
    }
  }

  const [_del, deleteUser] = useTypedMutation((opts: {id: number}) => ({
    deleteUser: {
      __args: opts,
    },
  }));

  const handleDelete = async () => {
    try {
      await deleteUser({id: currentUserId})
      setOpen(false)
      navigate(PageConfig.users)
      message.success({content: 'User successfully deleted!', duration: 2});
    } catch (err) {
      console.log('----err', err)
      message.error({content: "Something's wrong..", duration: 2});
    }
  };

  return (
    <div className={styles.page}>
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        width={460}>
        <div className={styles.messageContainer}>
          <h3>Are you sure you want to remove</h3>
          <h3> {user.data?.userId?.email} ?</h3>
          <Button loading={_del.fetching} onClick={handleDelete}>OK</Button>
        </div>
      </Modal>
      <AdminNavbar />
        <div className={styles.container}>
          {initialValues ?
            <Form
              form={form}
              name="basic"
              layout="vertical"
              onFinish={submit}
              autoComplete="off"
              requiredMark={false}
              initialValues={initialValues}
            >
              <div className={styles.header}>
                <p><strong>{user.data?.userId?.email}</strong></p>
                <Button style={{marginLeft: 20}} onClick={() => setOpen(true)} loading={loading} type="button">
                  <p>Delete user</p>
                </Button>
              </div>
              <div className={styles.content}>
                <Form.Item name="first_name" rules={[{required: true, message: 'Please enter first_name!'}]} className={styles.field}>
                  <Input placeholder='Enter first name'/>
                </Form.Item>
                <Form.Item name="last_name" rules={[{required: true, message: 'Please enter last_name!'}]} className={styles.field}>
                  <Input placeholder='Enter last name'/>
                </Form.Item>
                <Form.Item name="role" className={styles.field}>
                  <Select<string, { value: string; children: string }>
                    placeholder="Select role"
                    filterOption={(input, option) =>
                      option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                    }
                  >
                    {Object.values(ROLE)
                      .map(role =>
                        <Select.Option key={role} value={role}>{role}</Select.Option>)}
                  </Select>
                </Form.Item>
                <Form.Item name="coupon" className={styles.field}>
                  <Select<string, { value: string; children: string }>
                    placeholder="Select coupon"
                    filterOption={(input, option) =>
                      option ? option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 : false
                    }
                  >
                    {coupons.data?.coupons
                      .map(({id, title}) =>
                        <Select.Option key={id} value={id}>{title}</Select.Option>)}
                  </Select>
                </Form.Item>
                <Form.Item name="phone" rules={[{required: true, message: 'Please enter phone!'}]} className={styles.field}>
                  <Input placeholder='Enter phone'/>
                </Form.Item>
                <Form.Item label={"Is update"} name="is_update" className={styles.field}>
                  <Switch checkedChildren={<CheckOutlined/>} unCheckedChildren={<CloseOutlined/>}/>
                </Form.Item>
                <Form.Item className={styles.button}>
                  <Button loading={loading} type="submit">
                    <p>Save user</p>
                  </Button>
                </Form.Item>
              </div>
            </Form>
            : <Loading />
          }
        </div>
    </div>
  );
};

export default UpdateUser;
