import React, {useState} from 'react';
import styles from "./ContactUs.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {Form, FormProps, Input} from "antd";
import Button from "../../components/Button/Button";
import {COMPANY_ADDRESS, COMPANY_EMAIL, COMPANY_PHONE, GOOGLE_API_KEY} from "../../constants";
import {FieldTypeAddress} from "../Address/Address";
import ContactSvg from "../../components/svg/ContactSvg";
import SendNowSvg from "../../components/svg/SendNowSvg";
import {colorTheme} from "../../utils/theme";

const {TextArea} = Input;

export type FieldTypeContactUs = {
  fullName: string;
  address: string;
  phone: string;
  text: string;
};

const defaultProps = {
  marker: {
    lat: 34.68391548984974,
    lng: 33.0379399980012
  },
  center: {
    lat: 34.68391548984974,
    lng: 33.0372399980012
  },
  zoom: 19
};

const ContactUs = () => {
  const [form] = Form.useForm();
  const [isFormValid, setIsFormValid] = useState(false);

  const submit: FormProps<FieldTypeAddress>['onFinish'] = (values) => {
    console.log('Success onSingIn:', values);
    // setData(values)
    // setOpen(true)
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <APIProvider apiKey={GOOGLE_API_KEY}>
          <Map
            // disableDefaultUI={true}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker position={defaultProps.marker} />
          </Map>
        </APIProvider>
        <div className={styles.menuContainer}>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='ADDRESS'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>ADDRESS</h3>
              <p>{COMPANY_ADDRESS}</p>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='PHONE'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>PHONE</h3>
              <p>{COMPANY_PHONE}</p>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='EMAIL'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>EMAIL</h3>
              <p style={{textDecoration: 'underline'}}>{COMPANY_EMAIL}</p>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='SOCIAL'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>SOCIAL MEDIA</h3>
              <div style={{display: 'flex'}}>
                <ContactSvg style={{marginRight: '12px'}} type='FACEBOOK'/>
                <ContactSvg type='INSTAGRAM'/>
              </div>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='CONTACT'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>GET IN TOUCH</h3>
              <Form
                form={form}
                name="basic"
                layout="vertical"
                onFinish={submit}
                autoComplete="off"
                requiredMark={false}
                className={styles.menuFormContainer}
                onValuesChange={() => {
                  const {fullName, address, phone, text} = form.getFieldsValue(['fullName', 'address', 'phone', 'text'])
                  if (fullName && address && phone && text) {
                    setIsFormValid(true)
                  } else {
                    setIsFormValid(false)
                  }
                }}
              >
                <Form.Item<FieldTypeContactUs>
                  label="Full Name"
                  name="fullName"
                  rules={[{required: true, message: 'Enter your full name'}]}
                >
                  <Input className={styles.input} placeholder="Enter your full name"/>
                </Form.Item>
                <Form.Item<FieldTypeContactUs>
                  label="Email address"
                  name="address"
                  rules={[{required: true, message: 'Enter your email address'}]}
                >
                  <Input className={styles.input} placeholder="Enter your email address"/>
                </Form.Item>
                <Form.Item<FieldTypeContactUs>
                  label="Telephone"
                  name="phone"
                  rules={[{required: true, message: 'Enter your phone'}]}
                >
                  <Input className={styles.input} placeholder="Enter your phone"/>
                </Form.Item>
                <Form.Item<FieldTypeContactUs>
                  className={styles.input}
                  label="Your message"
                  name="text"
                  rules={[{required: true, message: 'Enter your phone'}]}
                >
                  <TextArea rows={4} placeholder="Enter your text"/>
                </Form.Item>
                <Button
                  icon={<SendNowSvg color={colorTheme.white} />}
                  className={styles.submitButton}
                  disabled={!isFormValid}
                  type="submit"
                >
                  <p>Send now</p>
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
