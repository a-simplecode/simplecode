import Link from 'next/link';
import styles from "../styles/Card.module.css";

export default function Card({url, title, desc}){

    return (
        <div className={styles.card}>
            <Link href={url ?? "/"}>
              <a target="_blank" rel="noopener noreferrer">
                <h2>{title} &rarr;</h2>
                <p>{desc}</p>
              </a>
            </Link>
          </div>
    )
}