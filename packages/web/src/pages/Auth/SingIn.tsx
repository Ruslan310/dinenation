import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import Button from "../../components/Button/Button";
import SmileSvg from "../../components/svg/SmileSvg";
import {TypeAuth} from "./Auth";

export type FieldTypeSingIn = {
  email: string;
  password: string;
};

interface Props {
  submit: (value: FieldTypeSingIn) => void
  typeAuth: (value: TypeAuth) => void;
  loading: boolean;
}

const SingIn = ({submit, loading, typeAuth}: Props) => (
  <Form
    name="basic"
    layout="vertical"
    onFinish={submit}
    autoComplete="off"
    requiredMark={false}
    className={styles.formContent}
  >
    <div>
      <Form.Item<FieldTypeSingIn>
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
      <Form.Item<FieldTypeSingIn>
        label="Password"
        name="password"
        className={styles.input}
        rules={[{required: true, message: 'Please input your password!'}]}
      >
        <Input.Password placeholder="Your password" />
      </Form.Item>
    </div>
    <Form.Item>
      <Button loading={!loading} className={styles.submitButton} type="submit">
        <SmileSvg />
        <p>Log in</p>
      </Button>
    </Form.Item>

    <p onClick={() => typeAuth(TypeAuth.CONFIRM_EMAIL)} className={styles.forgotPass}>
      Forgot password? Click here.
    </p>
  </Form>
);

export default SingIn;
