import React from 'react';
import {Spin} from 'antd';
import styles from "./Loading.module.css";


const Loader = () => (
  <div className={styles.loaderOverlay}>
    <Spin size="large" />
  </div>
);

export default Loader;
