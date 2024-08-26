import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import {EyeOutlined} from "@ant-design/icons";
import closeEye from "../../assets/image/eyeClosed.svg";
import Button from "../../components/Button/Button";
import smile from "../../assets/image/smile.svg";

export type FieldTypeSingOut = {
  coupon: string;
  full_name: string;
  email: string;
  phone: string;
  password: string;
};

const SingIn = ({submit}: {submit: (value: FieldTypeSingOut) => void}) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeSingOut>
        label="Your coupon"
        name="coupon"
        rules={[{ required: true, message: 'Please input your coupon!' }]}
      >
        <Input className={styles.input} placeholder="Enter your coupon" />
      </Form.Item>
      <Form.Item<FieldTypeSingOut>
        label="Full Name"
        name="full_name"
        rules={[{ required: true, message: 'Please input your full name!' }]}
      >
        <Input className={styles.input} placeholder="Enter your full name" />
      </Form.Item>
      <Form.Item<FieldTypeSingOut>
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
      <Form.Item<FieldTypeSingOut>
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
      <Form.Item<FieldTypeSingOut>
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
    <Form.Item >
      <Button className={styles.submitButton} type="submit">
        <img src={smile} alt='' className={styles.logoImg}/>
        <p>Registration</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SingIn;
