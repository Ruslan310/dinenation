import React, {useContext, useState} from 'react';
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Form, FormProps, Input} from "antd";
import Button from "../../components/Button/Button";
import {FieldTypeAddress} from "../Address/Address";
import smile from "../../assets/image/smile.svg";
import {EyeOutlined} from "@ant-design/icons";
import closeEye from "../../assets/image/EyeClosed.svg";
import {FieldTypeSingOut} from "../Auth/SingOut";
import Avatar from "../../components/Avatar/Avatar";
import {MainContext} from "../../contexts/MainProvider";

const Profile = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);
  const {userData} = useContext(MainContext);

  const submit: FormProps<FieldTypeAddress>['onFinish'] = (values) => {
    console.log('Success onSingIn:', values);
    // setData(values)
    // setOpen(true)
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={submit}
          autoComplete="off"
          requiredMark={false}
          initialValues={userData}
          className={styles.menuContainer}
          onValuesChange={() => {
            const {
              coupon,
              fullName,
              email,
              phone,
              password,
            } = form.getFieldsValue(['coupon', 'full_name', 'email', 'phone', 'password'])
            if (coupon && fullName && email && phone && password) {
              setIsFormValid(true)
            } else {
              setIsFormValid(false)
            }
          }}
        >
          <div className={styles.avatarContainer}>
            <Avatar size={100} isEdit fullName={userData?.full_name} />
          </div>

          <Form.Item<FieldTypeSingOut>
            label="Full Name"
            name="full_name"
            rules={[{required: true, message: 'Please input your coupon!'}]}
          >
            <Input className={styles.input} placeholder="Enter your full name"/>
          </Form.Item>

          <Form.Item<FieldTypeSingOut>
            label="Your coupon"
            name="coupon"
            rules={[{required: true, message: 'Please input your coupon!'}]}
          >
            <Input className={styles.input} placeholder="Enter your coupon"/>
          </Form.Item>

          <Form.Item<FieldTypeSingOut>
            label="Email address"
            name="email"
            rules={[{required: true, message: 'Please input your email!'}]}
          >
            <Input className={styles.input} placeholder="Your email"/>
          </Form.Item>

          <Form.Item<FieldTypeSingOut>
            label="Telephone"
            name="phone"
            rules={[{required: true, message: 'Please input your phone!'}]}
          >
            <Input className={styles.input} placeholder="+357"/>
          </Form.Item>

          <Form.Item<FieldTypeSingOut>
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password
              placeholder="Create password"
              iconRender={(visible) => (visible ? <EyeOutlined/> :
                <img src={closeEye} alt='' className={styles.logoImg}/>)}
            />
          </Form.Item>
          <Button
            icon={<img src={smile} alt='' className={styles.logoImg}/>}
            className={styles.submitButton}
            disabled={!isFormValid}
            type="submit"
          >
            <p>Save</p>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
