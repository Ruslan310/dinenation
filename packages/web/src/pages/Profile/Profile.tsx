import React, {useContext, useState} from 'react';
import styles from "./Profile.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Form, FormProps, Input, message} from "antd";
import Button from "../../components/Button/Button";
import Avatar from "../../components/Avatar/Avatar";
import {MainContext} from "../../contexts/MainProvider";
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";
import {sendBotMessage} from "../../utils/handle";
import SmileSvg from "../../components/svg/SmileSvg";

interface FieldTypeProfile {
  first_name: string;
  last_name: string;
  coupon: string;
  email: string;
  phone: string;
}

interface UpdateUserPermission {
  id: number;
  is_update: boolean;
}

const CHANGE_PROFILE = import.meta.env.VITE_CHAT_CHANGE_PROFILE

const Profile = () => {
  const [form] = Form.useForm();
  const [loadingButton, setLoadingButton] = useState(false);
  const {userData} = useContext(MainContext);

  const [_, permissionChange] = useTypedMutation((opts: UpdateUserPermission) => ({
    permissionUser: {
      __args: opts,
      id: true,
    },
  }));

  const submit: FormProps<FieldTypeProfile>['onFinish'] = async (values) => {
    setLoadingButton(true);
    try {
      if (userData) {
        const mes = `---!!Request data change!!---
Id: ${userData.id}
${userData.email}
👤 ${userData.first_name} ${userData.last_name}
🎟️ ${userData.coupon.title}
📞 ${userData.phone}
-----chage to---------
  new name: ${values.first_name} ${values.last_name}
  new coupon: ${values.coupon}
  new phone: ${values.phone}
`;
        await sendBotMessage(CHANGE_PROFILE, mes)

        await permissionChange({
          id: userData?.id,
          is_update: true,
        })
      }
      message.success({content: 'Request to change data sent successfully!', duration: 2});
    } catch (err) {
      // console.log('-----', err)
      message.error({content: 'Failed to sending!', duration: 2});
    }
    setLoadingButton(false);
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
          className={styles.menuContainer}
        >
          <div className={styles.avatarContainer}>
            <Avatar size={100} isEdit />
          </div>

          <Form.Item<FieldTypeProfile>
            label="First Name"
            name="first_name"
            initialValue={userData?.first_name}
            rules={[{required: true, message: 'Please input your first name!'}]}
          >
            <Input disabled={userData?.is_update} className={styles.input} placeholder="Enter your full name"/>
          </Form.Item>
          <Form.Item<FieldTypeProfile>
            label="Last Name"
            name="last_name"
            initialValue={userData?.last_name}
            rules={[{required: true, message: 'Please input your last name!'}]}
          >
            <Input disabled={userData?.is_update} className={styles.input} placeholder="Enter your full name"/>
          </Form.Item>

          <Form.Item<FieldTypeProfile>
            label="Your coupon"
            name="coupon"
            initialValue={userData?.coupon.title}
            rules={[{required: true, message: 'Please input your coupon!'}]}
          >
            <Input disabled={userData?.is_update} className={styles.input} placeholder="Enter your coupon"/>
          </Form.Item>

          <Form.Item<FieldTypeProfile>
            label="Email address"
            name="email"
            initialValue={userData?.email}
            rules={[
              {required: true, message: 'Please input your email!'},
              {
                type: 'email',
                message: 'The input is not a valid email!',
              },
            ]}
          >
            <Input disabled className={styles.input} placeholder="Your email"/>
          </Form.Item>

          <Form.Item<FieldTypeProfile>
            label="Telephone"
            name="phone"
            initialValue={userData?.phone}
            rules={[
              {required: true, message: 'Please input your phone!'},
              {
                pattern: /^\+?[0-9]{10,15}$/,
                message: 'Please enter a valid phone number!',
              },
            ]}
          >
            <Input disabled={userData?.is_update} className={styles.input} placeholder="+357"/>
          </Form.Item>

          <Button
            icon={<SmileSvg />}
            loading={loadingButton}
            className={styles.submitButton}
            disabled={userData?.is_update || loadingButton}
            type="submit"
          >
            <p>
              {userData?.is_update ?
                'Change request sent' :
                'Request data change'
              }
            </p>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Profile;
