import React from 'react';
import styles from "./Auth.module.css";
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import SmileSvg from "../../components/svg/SmileSvg";

export type FieldTypeConfirmPassword = {
  email: string;
  confirmationCode: string;
  newPassword: string;
};

interface Props {
  submit: (value: FieldTypeConfirmPassword) => void;
  loading: boolean;
}

const ConfirmPassword = ({submit, loading}: Props) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeConfirmPassword>
        label="Email"
        name="email"
        className={styles.input}
        rules={[
          {required: true, message: 'Please input your email!' },
          {
            type: 'email',
            message: 'The input is not a valid email!',
          },
        ]}
      >
        <Input placeholder="Your email" />
      </Form.Item>
      <Form.Item<FieldTypeConfirmPassword>
        label="New Password"
        name="newPassword"
        className={styles.input}
        rules={[{required: true, message: 'Please input your new password!'}]}
      >
        <Input.Password placeholder="Your password" />
      </Form.Item>
      <Form.Item<FieldTypeConfirmPassword>
        label="Confirmation Code"
        name="confirmationCode"
        className={styles.input}
        rules={[
          {required: true, message: 'Please enter your code!'},
          {len: 6, message: 'Code must be exactly 6 characters long!' }
        ]}
      >
        <Input placeholder="Enter your code" />
      </Form.Item>
    </div>
    <Form.Item>
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <SmileSvg />
        <p>Reset Password</p>
      </Button>
    </Form.Item>
  </Form>
);

export default ConfirmPassword;
