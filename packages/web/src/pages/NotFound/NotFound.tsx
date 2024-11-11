import React from 'react';
import styles from './NotFound.module.css'
import Button from "../../components/Button/Button";
import {useNavigate} from "react-router-dom";
import LogoSvg, {logoType} from "../../components/svg/LogoSvg";
import {PageConfig} from "../../utils/utils";

const NotFound: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <LogoSvg size={144} type={logoType.HORIZONTAL} className={styles.logo}/>
      <h1 className={styles.title}>404 - Oops, Something Went Wrong!</h1>
      <p className={styles.message}>
        Sorry, the page you’re looking for does not exist.
      </p>
      <p className={styles.message}>
        But don’t worry, we have plenty of delicious options for you
        to try!
      </p>
      <Button className={styles.button} onClick={() => navigate(PageConfig.home)}>Back to Menu</Button>
    </div>
  );
};

export default NotFound;
