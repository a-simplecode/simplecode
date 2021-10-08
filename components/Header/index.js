import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/client";
import cn from "classnames";
import Image from "next/image";
import Button from "../Button";
import styles from "./Header.module.css";
import SVGBurgerMenu from "../icons/SVGBurgerMenu";
import { useEffect, useState } from "react";

const menuList = [
  { name: "Home", url: "/" },
  { name: "Packages", url: "/packages" },
  { name: "Admin", url: "/admin" },
  { name: "Get in touch", url: "/get-in-touch" },
];

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

  const RenderPCMenu = () => {
    let active = false;

   return menuList.map((menu) => {
      active = false;
      if (Router.pathname === "/" && menu.url === "/") {
        active = true;
      } else if (Router.pathname.includes(menu.url) && menu.url !== "/") {
        active = true;
      }
      return (
        <span
          key={"pc_" + menu.url}
          className={cn(
            styles.menuItemPC,
            "hidden_mobile",
            active ? styles.active : ""
          )}
          onClick={(e) => goTo(e, menu.url)}
        >
          {menu.name}
        </span>
      );
    });
  };

  return (
    <div className={cn(styles.container, "col-12")}>
      <div className="row">
        <div className="col-3">
          <span
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              Router.push("/");
            }}
          >
            <Image
              src="/images/simpleCode.png"
              alt="SimpleCode image"
              width={50}
              height={50}
            />
            <span className={cn(styles.logoText)}>SimpleCode</span>
          </span>
        </div>
        <div className={cn("col-9", styles.buttons)}>
          <span
            className="pointer hidden_pc"
            onClick={(e) => {
              e.preventDefault();
              setOpenMenu(!openMenu);
            }}
          >
            <SVGBurgerMenu />
          </span>
          {RenderPCMenu()}
          {session && Object.keys(session).length > 0 && (
            <span className="hidden_mobile">
              <Button color="btn-danger" title="Logout" onClick={Logout} />
            </span>
          )}
        </div>
      </div>
      {openMenu && (
        <div className={styles.menu + " row"}>
          {menuList.map((menu) => (
            <div
              key={"mb_" + menu.url}
              className={cn(
                styles.col12,
                Router.pathname === menu.url ? styles.active : ""
              )}
              onClick={(e) => goTo(e, menu.url)}
            >
              {menu.name}
            </div>
          ))}
          {session && Object.keys(session).length > 0 && (
            <div className={styles.col11}>
              <Button color="btn-danger" title="Logout" onClick={Logout} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
