import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import cn from "classnames";
import Button from "./Button";
import styles from "../styles/Header.module.css";
import SVGBurgerMenu from "./icons/SVGBurgerMenu";
import { useEffect, useState } from "react";

export default function Header() {
  const Router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [session,loading] = useSession();
  
  const Logout = async () => {
    const res = await signOut({ redirect: false });
    Router.replace("/admin/login");
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [Router.pathname]);

  return (
    <>
      <div className={cn(styles.container, "col-12")}>
        <div className="row pb-2">
          <div className="col-8">
            <span
              className={cn(styles.logo, "h3")}
              onClick={(e) => {
                e.preventDefault();
                Router.push("/");
              }}
            >
              {" "}
              &lt;SimpleCode/&gt;{" "}
            </span>
          </div>
          <div className={cn("col-4", styles.buttons)}>
            <span
              className="pointer"
              onClick={(e) => {
                e.preventDefault();
                setOpenMenu(!openMenu);
              }}
            >
              <SVGBurgerMenu />
            </span>
          </div>
        </div>
        {openMenu && (
          <div className={styles.menu + " row"}>
                        <div
              className={styles.col12}
              onClick={(e) => {
                e.preventDefault();
                Router.push("/");
              }}
            >
              Home
            </div>
            {session && (
              <div
                className={styles.col12}
                onClick={(e) => {
                  e.preventDefault();
                  Router.push("/components/smart-table");
                }}
              >
                Smart Table
              </div>
            )}
            <div
              className={styles.col12}
              onClick={(e) => {
                e.preventDefault();
                Router.push("/admin");
              }}
            >
              Admin
            </div>

            {session && (
              <div className={styles.col11}>
                <Button color="btn-danger" title="Logout" onClick={Logout} />
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
