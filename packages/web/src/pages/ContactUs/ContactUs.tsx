import React, {useContext, useState} from 'react';
import styles from "./ContactUs.module.css";
import Navbar from "../../components/Navbar/Navbar";
import {APIProvider, Map, Marker} from '@vis.gl/react-google-maps';
import {Form, FormProps, Input, message} from "antd";
import Button from "../../components/Button/Button";
import {COMPANY_INFO} from "../../constants";
import ContactSvg from "../../components/svg/ContactSvg";
import SendNowSvg from "../../components/svg/SendNowSvg";
import {colorTheme} from "../../utils/theme";
import {sendBotMessage} from "../../utils/handle";
import SelectSvg from "../../components/svg/SelectSvg";
import {MainContext} from "../../contexts/MainProvider";
import {useResize} from "../../hooks/useResize";

const FEEDBACK = import.meta.env?.VITE_CHAT_FEEDBACK
const {TextArea} = Input;
const googleApi = import.meta.env?.VITE_GOOGLE_API_KEY

export type FieldTypeContactUs = {
  fullName: string;
  email: string;
  phone: string;
  message: string;
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
  const [isSend, setIsSend] = useState(true);
  const [loader, setLoader] = useState(false);
  const {userData} = useContext(MainContext);
  const {isScreenLg} = useResize();

  const submit: FormProps<FieldTypeContactUs>['onFinish'] = async (values) => {
    setLoader(true)

    try {
      if (userData) {
        const mes = `User_id: ${userData.id}
Email: ${values.email}
Full Name: ${values.fullName}
Phone: ${values.phone}
Message: ${values.message}`;
        await sendBotMessage(FEEDBACK, mes)
        setIsSend(false)
        setLoader(false)
        message.success({content: 'Message sent successfully', duration: 2});
      }
    } catch (err) {
      console.log(err)
      message.error({content: 'Message could not be sent', duration: 2});
      setLoader(false)
    }
  };

  return (
    <div className={styles.page}>
      <Navbar />
      <div className={styles.container}>
        <APIProvider apiKey={googleApi}>
          <Map
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
          >
            <Marker position={defaultProps.marker} />
          </Map>
        </APIProvider>
        <div style={{bottom: isSend ? '5%' : ''}} className={styles.menuContainer}>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='ADDRESS'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>ADDRESS</h3>
              <a
                href="https://www.google.com/maps?q=Simply+Fresh!,+Agias+Fylaxeos+76A,+Limassol&z=19"
                target="_blank"
                rel="noopener noreferrer"
              >
                {COMPANY_INFO.ADDRESS}
              </a>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='PHONE'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>PHONE</h3>
              <a href={`tel:${COMPANY_INFO.PHONE}`}>
                {COMPANY_INFO.PHONE}
              </a>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='EMAIL'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>EMAIL</h3>
              <a style={{textDecoration: 'underline'}} href={`mailto:${COMPANY_INFO.EMAIL}`}>
                {COMPANY_INFO.EMAIL}
              </a>
            </div>
          </div>
          <div className={styles.menuItem}>
            <div className={styles.svgMenu}>
              <ContactSvg type='SOCIAL'/>
            </div>
            <div className={styles.menuItemText}>
              <h3>SOCIAL MEDIA</h3>
              <div style={{display: 'flex'}}>
                <a href="https://www.facebook.com/share/K9So7LYNbbwQbUc9/" target="_blank">
                  <ContactSvg className={styles.socialButton} type='FACEBOOK'/>
                </a>
                <a href="https://www.instagram.com/dine_nation_cy/?igsh=MWxpczA2NzVkZHVtZQ%3D%3D" target="_blank">
                  <ContactSvg className={styles.socialButton} type='INSTAGRAM'/>
                </a>
              </div>
            </div>
          </div>
          {isSend ?
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
                >
                  <Form.Item<FieldTypeContactUs>
                    label="Full Name"
                    name="fullName"
                    className={styles.input}
                    rules={[{required: true, message: 'Enter your full name'}]}
                  >
                    <Input placeholder="Enter your full name"/>
                  </Form.Item>
                  <Form.Item<FieldTypeContactUs>
                    label="Email address"
                    name="email"
                    className={styles.input}
                    rules={[
                      {required: true, message: 'Enter your email'},
                      {
                        type: 'email',
                        message: 'The input is not a valid email!',
                      },
                    ]}
                  >
                    <Input placeholder="Enter your email"/>
                  </Form.Item>
                  <Form.Item<FieldTypeContactUs>
                    label="Phone"
                    name="phone"
                    className={styles.input}
                    rules={[{required: true, message: 'Enter your phone'}]}
                  >
                    <Input placeholder="Enter your phone"/>
                  </Form.Item>
                  <Form.Item<FieldTypeContactUs>
                    className={styles.input}
                    label="Your message"
                    name="message"
                    rules={[{required: true, message: 'Enter your message'}]}
                  >
                    <TextArea rows={4} placeholder="Enter your message"/>
                  </Form.Item>
                  <Button
                    loading={loader}
                    icon={<SendNowSvg />}
                    className={styles.submitButton}
                    type="submit"
                  >
                    <p>Send now</p>
                  </Button>
                </Form>
              </div>
            </div> :
            <div className={styles.sentMessageBlock}>
              <SelectSvg className={styles.svgSent} color={colorTheme.active} />
              <h2>Your message has been sent successfully.</h2>
              <h2>Thank you for your feedback.</h2>
            </div>
          }
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
