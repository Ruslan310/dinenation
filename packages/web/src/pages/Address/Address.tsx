import React, {useState} from 'react';
import styles from "./Address.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {Form, FormProps, Input, InputNumber} from "antd";
import Button from "../../components/Button/Button";
import AddressSvg from "../../components/svg/AddressSvg";
import {colorTheme} from "../../utils/theme";

export type FieldTypeAddress = {
  address?: string;
  addressNumber?: number;
  city?: string;
  postcode?: string;
};

const Address = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);


  const submit: FormProps<FieldTypeAddress>['onFinish'] = (values) => {
    console.log('Success onSingIn:', values);
    // setData(values)
    // setOpen(true)
  };

  return (
    <div className={styles.page}>
      <Navbar/>
      <div className={styles.container}>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          onFinish={submit}
          autoComplete="off"
          requiredMark={false}
          className={styles.menuContainer}
          onValuesChange={() => {
            const {address, city, postcode} = form.getFieldsValue(['address', 'city', 'postcode'])
            if (address && city && postcode) {
              setIsFormValid(true)
            } else {
              setIsFormValid(false)
            }
          }}
        >
          <p style={{marginBottom: 10}}>Add New Address</p>
          <div className={styles.addressBlock}>
            <Form.Item<FieldTypeAddress>
              className={styles.inputAddress}
              name="address"
              rules={[{required: true, message: 'Enter your new address'}]}
            >
              <Input placeholder="Enter your new address"/>
            </Form.Item>
            <Form.Item<FieldTypeAddress>
              name="addressNumber"
              rules={[{required: true, message: 'Enter №'}]}
            >
              <InputNumber placeholder="№"/>
            </Form.Item>
          </div>

          <Form.Item<FieldTypeAddress>
            label="Town / City"
            name="city"
            rules={[{required: true, message: 'Your city'}]}
          >
            <Input className={styles.input} placeholder="Your city"/>
          </Form.Item>
          <Form.Item<FieldTypeAddress>
            label="Postcode / ZIP"
            name="postcode"
            rules={[{required: true, message: 'Enter your postcode'}]}
          >
            <Input className={styles.input} placeholder="Enter your postcode"/>
          </Form.Item>
          <Button
            className={styles.submitButton}
            disabled={!isFormValid}
            type="submit"
          >
            <AddressSvg color={colorTheme.white}/>
            <p>Add Address</p>
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Address;
