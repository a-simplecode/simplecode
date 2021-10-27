import Head from "next/head";
import Router from "next/router";
import { ToastContainer, Slide } from "react-toastify";
import NProgress from "nprogress"; //nprogress module
import "bootstrap/dist/css/bootstrap.min.css";
import "react-next-table/dist/SmartTable.css";
import "react-toastify/dist/ReactToastify.css";
import "nprogress/nprogress.css"; //styles of nprogress
import "../styles/globals.css";
import Layout from "../components/Layout";
import { useState } from "react";
import CustomSpinner from "../components/CustomSpinner";

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);

  //Binding events.
  Router.events.on("routeChangeStart", () => {
    NProgress.start();
    setLoading(true);
  });
  Router.events.on("routeChangeComplete", () => {
    NProgress.done();
    setLoading(false);
  });
  Router.events.on("routeChangeError", () => {
    NProgress.done();
    setLoading(false);
  });

  return (
    <>
      <Head>
        <title>Amine Amine</title>
        <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover' />
        <meta
          name="description"
          content="I'am a full stack developer specialized in Web Development as Next JS (Pre-rendering), React JS (Hooks and context), JavaScript, Redux, HTML, CSS. I also write the simplest code possible, fully SEO and code reusability with high performance for having the best websites."
        />
        <link rel="icon" href="/images/simpleCode2.ico" />
      </Head>
      <Layout>
        {loading ? (
          <div className="pageLoader">
            <CustomSpinner/>
          </div>
        ) : (
          <Component {...pageProps} />
        )}
      </Layout>
      <ToastContainer
        position="top-right"
        style={{ top: "55px" }}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={true}
        rtl={false}
        pauseOnHover
        transition={Slide}
      />
    </>
  );
}

export default MyApp;
