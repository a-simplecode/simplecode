import styles from "../styles/Footer.module.css";
import SVGInstagram from "./icons/SVGInstagram";
import SVGFacebook from "./icons/SVGFacebook";
import SVGLinkedin from "./icons/SVGLinkedin";
import SVGGithub from "./icons/SVGGithub";
import {
  INSTAGRAM,
  FACEBOOK,
  LINKEDIN,
  GITHUB,
} from "../helpers/global-variables";
import dayjs from "dayjs";

const ICON = (SVG, url) => (
  <span className={styles.icons} onClick={() => window.open(url)}>
    {SVG}
  </span>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div>
        {ICON(<SVGGithub />, GITHUB)}
        {ICON(<SVGLinkedin />, LINKEDIN)}
        {ICON(<SVGInstagram />, INSTAGRAM)}
        {ICON(<SVGFacebook />, FACEBOOK)}
      </div>
      <div className="mt-4">
        Powered by <b className="link" onClick={()=>window.open('https://serverless-aminects.vercel.app/')}> &lt;SimpleCode/&gt; </b> - {dayjs().year()}
      </div>
    </footer>
  );
}
