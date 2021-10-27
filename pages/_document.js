import Document, { Html, Head, Main, NextScript } from "next/document";
const APP_NAME = 'simplecode'
export default class extends Document {
  
  static async getInitialProps(ctx) {
    return await Document.getInitialProps(ctx)
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <meta name='application-name' content={APP_NAME} />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <meta name='apple-mobile-web-app-status-bar-style' content='default' />
          <meta name='apple-mobile-web-app-title' content={APP_NAME} />
          <meta name='format-detection' content='telephone=no' />
          <meta name='mobile-web-app-capable' content='yes' />
          <meta name='theme-color' content='#FFFFFF' />
          
          <link rel='manifest' href='/manifest.json' />
          <link rel='shortcut icon' href='/images/simpleCode2.ico' />
          </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
