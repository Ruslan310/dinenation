import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
import SmileSvg from "../../components/svg/SmileSvg";

export type FieldTypeSingUp = {
  coupon: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
};

interface Props {
  submit: (value: FieldTypeSingUp) => void
  loading: boolean;
}

const SingUp = ({submit, loading}: Props) => (
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
        className={styles.input}
        rules={[
          { required: true, message: 'Please input your coupon!' },
          { pattern: /^\S+$/, message: 'Spaces are not allowed in the coupon!' },
        ]}
      >
        <Input placeholder="Enter your coupon" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="First Name"
        name="first_name"
        className={styles.input}
        rules={[
          { required: true, message: 'Please input your first name!' },
          { pattern: /^\S+$/, message: 'Spaces are not allowed!' },
        ]}
      >
        <Input placeholder="Enter your first name" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Last Name"
        name="last_name"
        className={styles.input}
        rules={[
          { required: true, message: 'Please input your last name!' },
          { pattern: /^\S+$/, message: 'Spaces are not allowed!' },
        ]}
      >
        <Input placeholder="Enter your last name" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Email address"
        name="email"
        className={styles.input}
        rules={[
          {required: true, message: 'Please input your email!'},
          {
            type: 'email',
            message: 'The input is not a valid email!',
          },
        ]}
      >
        <Input placeholder="Your email" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Telephone"
        name="phone"
        className={styles.input}
        rules={[
          { required: true, message: 'Please input your phone number!' },
          {
            pattern: /^\+?[0-9]{10,15}$/,
            message: 'Please enter a valid phone number!',
          },
        ]}
      >
        <Input placeholder="+357" />
      </Form.Item>
      <Form.Item<FieldTypeSingUp>
        label="Password"
        name="password"
        className={styles.input}
        rules={[
          {required: true, message: 'Please input your password!' },
          {min: 8, message: 'Password must be at least 8 characters!'},
        ]}
      >
        <Input.Password placeholder="Create password" />
      </Form.Item>
    </div>
    <Form.Item>
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <SmileSvg />
        <p>Registration</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SingUp;
