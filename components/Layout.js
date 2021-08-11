import Header from "./Header";
import styles from "../styles/Layout.module.css";

export default function Layout(props){
    return(
        <div>
            <Header/>
            <div className={styles.body}>
            {props.children}
            </div>
        </div>
    )
}