import cn from "classnames";
import styles from "../styles/Home.module.css";
import Card from "../components/Card";
import {
  INSTAGRAM,
  FACEBOOK,
  LINKEDIN,
  GITHUB,
} from "../helpers/global-variables";
import SubLayout from "../components/SubLayout";

export default function Home(props) {
  return (
    <SubLayout>
      <h1 className={styles.title}>
        <b>Amine Amine</b>
      </h1>
      <h2 className="secondaryColor">Software Engineer | Web Developer</h2>

      <div className="fullWidth mt-4 card">
        <h3 className="pb-4">About</h3>
        <div>{props.aboutMe}</div>
      </div>

      <div className="p-5">
        <i>
          <b>Einstein’s</b> famous quote — “{props.einsteinQuote}”
        </i>
      </div>
      <div className={cn(styles.einstein, "fullWidth")}>
        <h3 className="pb-4">{props.einsteinTitle}</h3>
        <p className="pb-2">{props.einsteinSection1}</p>
        <p className="pb-2">{props.einsteinSection2}</p>
        <p className="pb-2">{props.einsteinSection3}</p>
        <p className="pb-4">{props.einsteinSection4}</p>
      </div>
      <div className={styles.grid}>
        <Card
          url={LINKEDIN}
          title="Linked In"
          desc="Check my work Experience in full stack development."
        />

        <Card
          url={GITHUB}
          title="Github"
          desc="Check my projects and applications."
        />

        <Card
          url={INSTAGRAM}
          title="Instagram"
          desc="Check my posts and stories."
        />

        <Card url={FACEBOOK} title="Facebook" desc="Check my facebook page." />
      </div>
    </SubLayout>
  );
}

export async function getStaticProps() {
  return {
    props: {
      einsteinQuote:
        "Everything should be made as simple as possible, but not simpler.",
      einsteinTitle: "My Thoughts on Simplicity",
      einsteinSection1:
        "I’m a fan of simple and simplicity. When I tackle a topic, I don’t think I’m done until I’ve found the simplest way to look at it. I think of simplicity as a process. You can’t always start there, but you can find it or create more of it as you go. I also think of simplicity as a by-product.",
      einsteinSection2:
        "It happens when I find the elegant path or the simple truth.",
      einsteinSection3:
        "Sometimes I see simplicity as a means to an end — where the end is a simpler understanding or a simpler result or a simpler way to share. Sometimes I have to look backward to find simplicity — I can’t always find simple up front, but sometimes when I look back, it was there all along, either hidden among the chaos, or I just didn’t have the right lens.",
      einsteinSection4:
        "The most important thing I’ve learned about simplicity is that simplicity wins in the long run. Simple is stickier than complexity, and it survives. I think nature teaches us that, and we learn it time and again in work and in life.",
      aboutMe:
        "I'am a full stack developer specialized in Web Development as Next JS (Pre-rendering), React JS (Hooks and context), JavaScript, Redux, HTML, CSS. I also write the simplest code possible, fully SEO and code reusability with high performance for having the best websites.",
    },
  };
}
