import Image from "next/image";
import { ParallaxProvider, Parallax } from "react-scroll-parallax";
import styles from "./SubLayout.module.css";

export default function SubLayout(props) {
  return (
    <ParallaxProvider>
      <div className={styles.container}>
        <Image
          className={styles.imgBackground}
          alt="background image"
          src="/images/background-image.jpeg"
          width={469}
          height={200}
        />

        <main className={styles.main}>
          <div className={styles.imageContainer}>
            <Parallax className="custom-class" y={[-60, 20]} tagOuter="figure">
              <Image
                className={styles.image}
                alt="profile image"
                src="/images/AMINE AMINE - BRIGHT LAB.jpg"
                width={800}
                height={800}
              />
            </Parallax>
          </div>
          {props.children}
        </main>
      </div>
    </ParallaxProvider>
  );
}
