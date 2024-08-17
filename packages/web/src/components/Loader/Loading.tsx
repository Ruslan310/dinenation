import {CgSpinner} from "react-icons/cg";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.loading}>
    <CgSpinner className={styles.spinner} />
  </div>
);

export default Loading;
