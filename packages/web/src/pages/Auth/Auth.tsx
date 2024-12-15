import React, {useRef, useState} from 'react';
import styles from "../Auth/Auth.module.css";
import login_main from "../../assets/image/login_main-min.png";
import {FormProps, Modal} from 'antd';
import SegmentedControl from "../../components/SegmentedControl/SegmentedControl";
import SingIn, {FieldTypeSingIn} from "./SingIn";
import SingUp, {FieldTypeSingUp} from "./SingUp";
import SendCode, {FieldTypeSendCode} from "./SendCode";
import {
  AuthError,
  confirmSignUp,
  resendSignUpCode,
  signIn,
  signUp,
  resetPassword,
  confirmResetPassword
} from 'aws-amplify/auth';
import {useTypedMutation, useTypedQuery} from "@dinenation-postgresql/graphql/urql";
import {CheckCoupon, CheckDomain, CheckMail} from "../../utils/type";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";
import ConfirmEmail, {FieldTypeConfirmEmail} from "./ConfirmEmail";
import ConfirmPassword, {FieldTypeConfirmPassword} from "./ConfirmPassword";
import {PageConfig} from "../../utils/utils";

const isDone = "DONE";
const isConfirm = "CONFIRM_SIGN_UP";
const isConfirmPassword = "CONFIRM_RESET_PASSWORD_WITH_CODE";

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

interface ConfirmSignUpSignUpStep {
  signUpStep: string;
  codeDeliveryDetails: {
    destination?: string;
  }
}

export enum TypeAuth {
  SING_IN = 'Sing_in',
  SING_UP = 'Sing_up',
  SEND_CODE = 'send_code',
  CONFIRM_EMAIL = 'confirm_email',
  CONFIRM_PASSWORD = 'confirm_password',
}

const Auth = () => {
  const [authMessage, setAuthMessage] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [authError, setAuthError] = useState<AuthError>()
  const [typeAuth, setTypeAuth] = useState<TypeAuth>(TypeAuth.SING_IN);
  const [currentUser, setCurrentUser] = useState<User | undefined>();
  const [attribute, setAttribute] = useState<string>();
  const controlRef = useRef<HTMLDivElement | null>(null)

  const segments = [
    { value: TypeAuth.SING_IN, label: 'Login', ref: useRef<HTMLDivElement | null>(null) },
    { value: TypeAuth.SING_UP, label: "Registration", ref: useRef<HTMLDivElement | null>(null) },
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
      const {isSignedIn} = await signIn({
        username: values.email,
        password: values.password,
      })

      if (isSignedIn) {
        localStorage.removeItem('cartList')
        localStorage.removeItem('cartTimestamp');
        localStorage.removeItem('cartTComment');
        window.location.href = PageConfig.home;
      } else {
        setCurrentUser({...values})
        setTypeAuth(TypeAuth.SEND_CODE)
        await onResend(values.email)
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      // console.log('----err', err)
      setAuthError(err as AuthError)
    }
  };

  const onSingUp: FormProps<FieldTypeSingUp>['onFinish'] = async (values) => {

    const {coupon, password, email, phone, last_name, first_name} = values
    const isCoupon = checkUser.data?.checkUser.coupons
      .find((item: CheckCoupon) => item?.title.toLowerCase() === coupon?.trim()?.toLowerCase())

    if (!isCoupon) {
      setAuthMessage('your coupon is not registered')
      return
    }
    const isEmail = checkUser.data?.checkUser.checkEmail
      .find((item: CheckMail) => item.email.toLowerCase() === email?.trim()?.toLowerCase())
    const isDomain = checkUser.data?.checkUser.checkDomain
      .find((item: CheckDomain) => item.domain.toLowerCase() === email?.trim()?.split('@')[1])

    const handleSignUp = async () => {
      try {
        setLoading(false);
        const {nextStep} = await signUp({
          username: email,
          password,
          options: {
            userAttributes: {
              email,
              phone_number: phone,
            },
          },
        });
        if (nextStep.signUpStep === isConfirm) {
          const {codeDeliveryDetails} = nextStep as ConfirmSignUpSignUpStep;
          const {destination} = codeDeliveryDetails;
          setAttribute(destination);
        }

        await addUser({
          coupon_id: isCoupon.id,
          first_name,
          last_name,
          email: email?.toLowerCase().trim(),
          phone,
        })
        setCurrentUser({
          ...values,
        });
        setTypeAuth(TypeAuth.SEND_CODE)
      } catch (err) {
        // console.log('----err', err);
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
        }
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      // console.log('----err', err)
      setAuthError(err as AuthError)
    }
  }

  const onResend = async (email?: string) => {
    setLoading(false)
    try {
      const username= currentUser?.email || email;
      if (username) {
        const {destination} = await resendSignUpCode({username});
        setAttribute(destination);
      }
      setLoading(true)
    } catch (err) {
      setLoading(true)
      // console.log('----err', err)
      setAuthError(err as AuthError)
    }
  }

  const onConfirmEmail : FormProps<FieldTypeConfirmEmail>['onFinish'] = async (values) => {
    setLoading(false)
    try {
      const {nextStep} = await resetPassword({
        username: values.email,
      });
      if (nextStep?.resetPasswordStep === isConfirmPassword) {
        setTypeAuth(TypeAuth.CONFIRM_PASSWORD);
      }
      setLoading(true)
    } catch (err) {
      // console.log('----', err)
      setAuthError(err as AuthError)
      setLoading(true)
    }
  }

  const onSendPassword : FormProps<FieldTypeConfirmPassword>['onFinish'] = async (values) => {
    setLoading(false)
    try {
      await confirmResetPassword({
        username: values.email,
        confirmationCode: values.confirmationCode,
        newPassword: values.newPassword,
      });
      setTypeAuth(TypeAuth.SING_IN);
      setLoading(true)
    } catch (err) {
      // console.log('----', err)
      setAuthError(err as AuthError)
      setLoading(true)
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
      <img loading='lazy' src={login_main} alt="login" className={styles.imageMain}/>
      <div className={styles.formBlock}>
        <div className={styles.form}>
          <LogoSvg type={logoType.HORIZONTAL}/>
          {attribute ?
            <p className={styles.subText}>Your code is on the way. To log in, enter the code we emailed to {attribute}. It may take a minute to arrive.</p>
            : <p className={styles.subText}>Welcome! We deliver delicious meals right to your doorstep!</p>
          }

          {(typeAuth === TypeAuth.SING_IN || typeAuth === TypeAuth.SING_UP) && (
            <SegmentedControl
              name="switch"
              segments={segments}
              callback={setTypeAuth}
              controlRef={controlRef}
            />
          )}

          {typeAuth === TypeAuth.SING_IN && (
            <SingIn typeAuth={setTypeAuth} loading={loading} submit={onSingIn} />
          )}

          {typeAuth === TypeAuth.SING_UP && (
            <SingUp loading={loading} submit={onSingUp} />
          )}

          {typeAuth === TypeAuth.SEND_CODE && (
            <SendCode loading={loading} submit={onSendCode} resend={onResend} />
          )}

          {typeAuth === TypeAuth.CONFIRM_EMAIL && (
            <ConfirmEmail loading={loading} submit={onConfirmEmail} />
          )}

          {typeAuth === TypeAuth.CONFIRM_PASSWORD && (
            <ConfirmPassword loading={loading} submit={onSendPassword} />
          )}

        </div>
      </div>
    </div>
  );
};

export default Auth;
