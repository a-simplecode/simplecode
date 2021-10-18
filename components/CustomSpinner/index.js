import Image from "next/image";
import styles from "./CustomSpinner.module.css";

export default function CustomSpinner() {
  return (
    <div className={styles.simplecodeSpinner} role="status">
      <Image
        src="/images/simpleCode.png"
        alt="SimpleCode image"
        width={50}
        height={50}
      />
    </div>
  );
}
