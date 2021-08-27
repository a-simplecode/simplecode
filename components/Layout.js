import Header from "./Header";
import Footer from "./Footer";
import styles from "../styles/Layout.module.css";

export default function Layout(props) {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>{props.children}</div>
      <Footer />
    </div>
  );
}
