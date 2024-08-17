import React, {useRef, useState} from 'react';
import styles from "../Auth/Auth.module.css";
import login_main from "../../assets/image/login_main.png";
import logo from "../../assets/image/Logo.svg";
import {FormProps, Modal} from 'antd';
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import SingIn, {FieldTypeSingIn} from "./SingIn";
import SingOut, {FieldTypeSingOut} from "./SingOut";
import SendCode, {FieldTypeSendCode} from "./SendCode";
import {signIn, signUp, confirmSignUp, resendSignUpCode, AuthError} from 'aws-amplify/auth';
import {useTypedMutation} from "@dinenation-postgresql/graphql/urql";


const isConfirm = "CONFIRM_SIGN_UP";
const isDone = "DONE";


interface NewUserForm {
  full_name: string;
  email: string;
  phone: string;
  coupon: string;
  domain_id: number;
}

interface User extends NewUserForm {
  password: string;
}

const Auth = () => {
  const [open, setOpen] = useState<boolean>(false)
  const [authError, setAuthError] = useState<AuthError>()
  const [typeAuth, setTypeAuth] = useState<string>('login');
  const [isResendCode, setResendCode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const controlRef = useRef<HTMLDivElement>(null);

  const segments = [
    { value: "login", label: "Login", ref: useRef<HTMLDivElement>(null) },
    { value: "registration", label: "Registration", ref: useRef<HTMLDivElement>(null) },
  ];

  const [newUser, addUser] = useTypedMutation((opts: NewUserForm) => ({
    addUser: {
      __args: opts,
      full_name: true,
      email: true,
      phone: true,
      coupon: true,
      domain_id: true,
    },
  }));
  // console.log('-----newUser', newUser)

  const onSingIn: FormProps<FieldTypeSingIn>['onFinish'] = async (values) => {
    try {
      const {isSignedIn, nextStep}= await signIn({
        username: values.email,
        password: values.password,
      })
      if (isSignedIn) {
        window.location.href = '/';
      }
      console.log('----nextStep', nextStep)
    } catch (err) {
      console.log('----err', err)
      setAuthError(err as AuthError)
      setOpen(true)
    }
  };

  const onSingOut: FormProps<FieldTypeSingOut>['onFinish'] = async (values) => {
    try {
      const {nextStep} = await signUp({
        username: values.email,
        password: values.password,
        options: {
          userAttributes: {
            email: values.email,
            phone_number: values.phone,
          },
        }
      });
      console.log('----nextStep', nextStep)
      setCurrentUser({
        ...values,
        domain_id: 1, //TODO
      })
      setResendCode(nextStep?.signUpStep === isConfirm)
    } catch (err) {
      console.log('----err', err)
      setAuthError(err as AuthError)
      setOpen(true)
    }
  };

  const onSendCode: FormProps<FieldTypeSendCode>['onFinish'] = async (values) => {
    try {
      if (currentUser) {
        const {nextStep} = await confirmSignUp({
          username: currentUser?.email,
          confirmationCode: values.confirmationCode
        });
        if (nextStep?.signUpStep === isDone) {
          let result = addUser({
            full_name: currentUser.full_name,
            email: currentUser.email,
            phone: currentUser.phone,
            coupon: currentUser.coupon,
            domain_id: 1
          })

          console.log('-----result', result)
          onSingIn(currentUser)
        }
        console.log('----nextStep', nextStep)
      }
    } catch (err) {
      console.log('----err', err)
      setAuthError(err as AuthError)
      setOpen(true)
    }
  }

  const onResend = async () => {
    try {
      if (currentUser) {
        await resendSignUpCode({
          username: currentUser?.email,
        });
      }
    } catch (err) {
      console.log('----err', err)
      setAuthError(err as AuthError)
      setOpen(true)
    }
  }

  return (
    <div className={styles.page}>
      <Modal
        closeIcon={false}
        open={open}
        onCancel={() => setOpen(false)}
        footer={false}
        width={460}>
        <>
          <h1>{typeAuth}</h1>
          <p>{authError?.message || 'Wrong data'}</p>
        </>
      </Modal>
      <div className={styles.imageMainBlock}>
        <img src={login_main} alt="component photo" className={styles.imageMain}/>
      </div>
      <div className={styles.formBlock}>
        <div className={styles.form}>
          <img alt='' src={logo} className={styles.logoImg}/>
          <p className={styles.subText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
            Ipsum has been the industry's standard dummy text ever since the </p>
          {isResendCode ?
            <SendCode submit={onSendCode} resend={onResend} /> :
            <>
              <SegmentedControl
                name="example"
                segments={segments}
                callback={setTypeAuth}
                controlRef={controlRef}
              />
              {typeAuth === 'login'
                ? <SingIn submit={onSingIn} />
                : <SingOut submit={onSingOut} />
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Auth;
