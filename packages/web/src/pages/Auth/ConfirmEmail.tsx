import React from 'react';
import styles from "./Auth.module.css";
import {Form, Input} from "antd";
import Button from "../../components/Button/Button";
import SmileSvg from "../../components/svg/SmileSvg";

export type FieldTypeConfirmEmail = {
  email: string;
};

interface Props {
  submit: (value: FieldTypeConfirmEmail) => void;
  loading: boolean;
}

const ConfirmEmail = ({submit, loading}: Props) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeConfirmEmail>
        label="Please enter your email to get confirmation code."
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
    </div>
    <Form.Item>
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <SmileSvg />
        <p>Send Code</p>
      </Button>
    </Form.Item>
  </Form>
);

export default ConfirmEmail;
