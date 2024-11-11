import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
import SmileSvg from "../../components/svg/SmileSvg";

export type FieldTypeSendCode = {
  confirmationCode: string;
};

interface Props {
  submit: (value: FieldTypeSendCode) => void;
  resend: () => void;
  loading: boolean;
}

const SendCode = ({submit, resend, loading}: Props) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeSendCode>
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
    <Form.Item >
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <SmileSvg />
        <p>Confirm</p>
      </Button>
      <Button type="button" onClick={resend} className={styles.sendCodeButton}>
        <p>Resend Code</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SendCode;
