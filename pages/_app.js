import Head from "next/head";
import Router from "next/router";
import { ToastContainer, Slide } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "../styles/globals.css";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps }) {

// Router.events.on('routeChangeStart', (url) => {
//   console.log(`Loading: ${url}`)
// })

// Router.events.on('routeChangeComplete', () => console.log("finish"))
  return (
    <>
      <Head>
        <title>Amine Amine</title>
        <meta name="viewport" content="initial-scale=1.0 width=device-width" />
        <meta
          name="description"
          content="Connect with a great web developer for building websites"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout>
      <Component {...pageProps} />
      </Layout>
      <ToastContainer
        position="top-right"
        style={{top:"55px"}}
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
