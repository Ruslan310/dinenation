import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
import smile from "../../assets/image/smile.svg";

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
        rules={[
          {required: true, message: 'Enter your code!'},
          {min: 6, message: 'Code must be at least 6 characters!'},
        ]}
      >
        <Input className={styles.input} placeholder="Your email" />
      </Form.Item>
    </div>
    <Form.Item >
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <img src={smile} alt='' className={styles.logoImg}/>
        <p>Confirm</p>
      </Button>
      <Button type="button" onClick={resend} className={styles.sendCodeButton}>
        <p>Resend Code</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SendCode;
