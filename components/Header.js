import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import cn from "classnames";
import Image from "next/image";
import Button from "./Button";
import styles from "../styles/Header.module.css";
import SVGBurgerMenu from "./icons/SVGBurgerMenu";
import { useEffect, useState } from "react";

export default function Header() {
  const Router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const [session] = useSession();

  const Logout = async () => {
    const res = await signOut({ redirect: false });
    Router.replace("/admin/login");
  };

  useEffect(() => {
    setOpenMenu(false);
  }, [Router.pathname]);

  const goTo = (e, url) => {
    e.preventDefault();
    setOpenMenu(false);
    Router.push(url);
  };

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
              <Image
                src="/images/simpleCode.png"
                alt="SimpleCode image"
                width={30}
                height={25}
              />{" "}
              SimpleCode
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
            <div className={styles.col12} onClick={(e) => goTo(e, "/")}>
              Home
            </div>

            <div className={styles.col12} onClick={(e) => goTo(e, "/packages")}>
              Packages
            </div>

            <div className={styles.col12} onClick={(e) => goTo(e, "/admin")}>
              Admin
            </div>

            {session && Object.keys(session).length > 0 && (
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
