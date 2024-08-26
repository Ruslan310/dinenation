import React, {useRef, useState} from 'react';
import styles from "../Auth/Auth.module.css";
import login_main from "../../assets/image/login_main.png";
import {FormProps, Modal} from 'antd';
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import SingIn, {FieldTypeSingIn} from "./SingIn";
import SingUp, {FieldTypeSingUp} from "./SingUp";
import SendCode, {FieldTypeSendCode} from "./SendCode";
import {AuthError, confirmSignUp, resendSignUpCode, signIn, signUp} from 'aws-amplify/auth';
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {CheckCoupon, CheckDomain, CheckMail} from "../../utils/type";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";


const isConfirm = "CONFIRM_SIGN_UP";
const isDone = "DONE";


interface NewUserForm {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  coupon_id: number;
}

interface User {
  email: string;
  password: string;
}

const singInText = 'Login'
const singUpText = "Registration"

const Auth = () => {
  const [authMessage, setAuthMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [authError, setAuthError] = useState<AuthError>()
  const [typeAuth, setTypeAuth] = useState<string>(singInText);
  const [isResendCode, setResendCode] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [attribute, setAttribute] = useState<string>();
  const controlRef = useRef<HTMLDivElement | null>(null)

  const segments = [
    { value: singInText, label: singInText, ref: useRef<HTMLDivElement | null>(null) },
    { value: singUpText, label: singUpText, ref: useRef<HTMLDivElement | null>(null) },
  ];

  const [_, addUser] = useTypedMutation((opts: NewUserForm) => ({
    addUser: {
      __args: opts,
      id: true
    },
  }));

  const [checkUser] = useTypedQuery({
    query: {
      checkUser: {
        checkEmail: {
          coupon_id: true,
          email: true,
        },
        checkDomain: {
          coupon_id: true,
          domain: true
        },
        coupons: {
          id: true,
          title: true,
          has_domain: true,
        },
      },
    },
  });

  const onSingIn: FormProps<FieldTypeSingIn>['onFinish'] = async (values) => {
    setLoading(false)
    try {
      const {isSignedIn, nextStep} = await signIn({
        username: values.email,
        password: values.password,
      })
      if (isSignedIn) {
        localStorage.setItem('cartList', '')
        window.location.href = '/';
      } else {
        console.log('----nextStep', nextStep)
        setCurrentUser({...values})
        setResendCode(nextStep?.signInStep === isConfirm)
        await onResend(values.email)
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      console.log('----err', err)
      setAuthError(err as AuthError)
    }
  };

  const onSingUp: FormProps<FieldTypeSingUp>['onFinish'] = async (values) => {

    const {coupon, password, email, phone, last_name, first_name} = values
    const isCoupon = checkUser.data?.checkUser.coupons.find((item: CheckCoupon) => item?.title === coupon)
    if (!isCoupon) {
      setAuthMessage('your coupon is not registered')
      return
    }
    const isEmail = checkUser.data?.checkUser.checkEmail.find((item: CheckMail) => item.email === email)
    const isDomain = checkUser.data?.checkUser.checkDomain.find((item: CheckDomain) => item.domain === email.split('@')[1])

    const handleSignUp = async () => {
      try {
        setLoading(false);
        const {nextStep} = await signUp({
          username: values.email,
          password,
          options: {
            userAttributes: {
              email,
              phone_number: values.phone,
            },
          },
        });
        await addUser({
          coupon_id: isCoupon.id,
          first_name,
          last_name,
          email,
          phone,
        })
        console.log('----nextStep', nextStep);
        setCurrentUser({
          ...values,
        });
        setResendCode(nextStep?.signUpStep === isConfirm);
      } catch (err) {
        console.log('----err', err);
        setAuthError(err as AuthError);
      } finally {
        setLoading(true);
      }
    };

    if (isCoupon.has_domain) {
      if (isEmail || isDomain) {
        await handleSignUp();
      } else {
        setAuthMessage('The provided email is not associated with the specified coupon.');
        return;
      }
    } else {
      await handleSignUp();
    }
  };

  const onSendCode: FormProps<FieldTypeSendCode>['onFinish'] = async (values) => {
    setLoading(false)
    try {
      if (currentUser?.email) {
        const {nextStep} = await confirmSignUp({
          username: currentUser?.email || '',
          confirmationCode: values.confirmationCode
        });
        if (nextStep?.signUpStep === isDone) {
          onSingIn(currentUser)
          setResendCode(false)
        }
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      console.log('----err', err)
      setAuthError(err as AuthError)
    }
  }

  const onResend = async (email?: string) => {
    setLoading(false)
    try {
      const username= currentUser?.email || email;
      if (username) {
        const result = await resendSignUpCode({username});
        setAttribute(result?.destination);
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      console.log('----err', err)
      setAuthError(err as AuthError)
    }
  }

  return (
    <div className={styles.page}>
      <Modal
        closeIcon={false}
        open={!!authError}
        onCancel={() => setAuthError(undefined)}
        footer={false}
        width={460}>
        <div className={styles.modalMessageContainer}>
          <h2>{typeAuth}</h2>
          <p>{authError?.message || 'Wrong data'}</p>
        </div>
      </Modal>
      <Modal
        closeIcon={false}
        open={!!authMessage}
        onCancel={() => setAuthMessage('')}
        footer={false}
        width={460}>
        <div className={styles.modalMessageContainer}>
          <h2>{typeAuth}</h2>
          <p>{authMessage}</p>
        </div>
      </Modal>
      <div className={styles.imageMainBlock}>
        <img src={login_main} alt="component photo" className={styles.imageMain}/>
      </div>
      <div className={styles.formBlock}>
        <div className={styles.form}>
          <LogoSvg type={logoType.HORIZONTAL}/>
          {attribute ?
            <p>Your code is on the way. To log in, enter the code we emailed to {attribute}. It may take a minute to arrive.</p>
            : <p className={styles.subText}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              Lorem
              Ipsum has been the industry's standard dummy text ever since the </p>
          }
          {isResendCode ?
            <SendCode loading={loading} submit={onSendCode} resend={onResend} /> :
            <>
              <SegmentedControl
                name="example"
                segments={segments}
                callback={setTypeAuth}
                controlRef={controlRef}
              />
              {typeAuth === singInText
                ? <SingIn loading={loading} submit={onSingIn} />
                : <SingUp loading={loading} submit={onSingUp} />
              }
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Auth;
