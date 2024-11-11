import styles from "./Loading.module.css";
import {Spin} from "antd";

const Loading = () => (
  <div className={styles.loading}>
    <Spin size="large" />
  </div>
);

export default Loading;
