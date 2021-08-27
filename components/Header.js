import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import cn from "classnames";
import Button from "./Button";
import styles from "../styles/Header.module.css";

export default function Header() {
  const Router = useRouter();
  const [session] = useSession();

  const Logout = async () => {
    const res = await signOut({redirect: false});
    Router.replace('/admin/login');
  };

  return (
    <div className={cn(styles.container, "col-12")}>
      <div className="row">
        <div className="col-6">
          <span
            className={cn(styles.logo, "h3")}
            onClick={() => Router.push("/")}
          >
            {" "}
            &lt;SimpleCode/&gt;{" "}
          </span>
        </div>
        <div className={cn("col-6", styles.buttons)}>
          {Router.asPath.includes("admin") ? (
              <Button title="Home" onClick={() => Router.push("/")} />
          ) : (
            <Button title="Admin" onClick={() => Router.push("/admin")} />
          )}
          {" "}
          {session && <Button color="btn-danger" title="Logout" onClick={Logout} />}
        </div>
      </div>
    </div>
  );
}
