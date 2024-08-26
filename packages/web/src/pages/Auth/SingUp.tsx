import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import {EyeOutlined} from "@ant-design/icons";
import closeEye from "../../assets/image/eyeClosed.svg";
import Button from "../../components/Button/Button";
import smile from "../../assets/image/smile.svg";

export type FieldTypeSingUp = {
  coupon: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

const SingUp = ({submit, loading}: {submit: (value: FieldTypeSingUp) => void, loading: boolean}) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeSingUp>
        label="Your coupon"
        name="coupon"
        rules={[{ required: true, message: 'Please input your coupon!' }]}
      >
        <Input className={styles.input} placeholder="Enter your coupon" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="First Name"
        name="first_name"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input className={styles.input} placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Last Name"
        name="last_name"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input className={styles.input} placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Email address"
        name="email"
        rules={[
          {required: true, message: 'Please input your email!'},
          {
            type: 'email',
            message: 'The input is not a valid email!',
          },
        ]}
      >
        <Input className={styles.input} placeholder="Your email" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Telephone"
        name="phone"
        rules={[
          { required: true, message: 'Please input your phone number!' },
          {
            pattern: /^\+?[0-9]{10,15}$/,
            message: 'Please enter a valid phone number!',
          },
        ]}
      >
        <Input className={styles.input} placeholder="+357" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Password"
        name="password"
        rules={[
          {required: true, message: 'Please input your password!' },
          {min: 8, message: 'Password must be at least 8 characters!'},
        ]}
      >
        <Input.Password
          placeholder="Create password"
          iconRender={(visible) => (visible ? <EyeOutlined /> : <img style={{cursor: "pointer"}} src={closeEye} alt='' />)}
        />
      </Form.Item>
    </div>
    <Form.Item>
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <img src={smile} alt='' className={styles.logoImg}/>
        <p>Registration</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SingUp;
