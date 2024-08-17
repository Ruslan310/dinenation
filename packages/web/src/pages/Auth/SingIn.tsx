import React from 'react';
import {Form, Input} from "antd";
import styles from "./Auth.module.css";
import {EyeOutlined} from "@ant-design/icons";
import closeEye from "../../assets/image/EyeClosed.svg";
import Button from "../../components/Button/Button";
import smile from "../../assets/image/smile.svg";

export type FieldTypeSingIn = {
  email: string;
  password: string;
};

const SingIn = ({submit}: {submit: (value: FieldTypeSingIn) => void}) => (
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
        rules={[{ required: true, message: 'Please input your email!' }]}
      >
        <Input className={styles.input} placeholder="Your email" />
      </Form.Item>
      <Form.Item<FieldTypeSingIn>
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password
          placeholder="Create password"
          iconRender={visible => visible
            ? <EyeOutlined />
            : <img style={{cursor: "pointer"}} src={closeEye} alt='' />}
        />
      </Form.Item>
    </div>
    <Form.Item >
      <Button className={styles.submitButton} type="submit">
        <img src={smile} alt='' className={styles.logoImg}/>
        <p>Log in</p>
      </Button>
    </Form.Item>
  </Form>
);

export default SingIn;
