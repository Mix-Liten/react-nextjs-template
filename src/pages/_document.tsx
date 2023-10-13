import Document, {
  DocumentContext,
  DocumentInitialProps,
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";
import { ServerStyleSheet } from "styled-components";

export default class CustomDocument extends Document<DocumentInitialProps> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render = () => {
    return (
      <Html lang="zh-TW">
        <Head
          prefix="og: http://ogp.me/ns#"
          itemScope
          itemType="https://schema.org/WebSite"
        >
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />

          <meta
            name="theme-color"
            media="(prefers-color-scheme: light)"
            content="#ffffff"
          />
          <meta
            name="theme-color"
            media="(prefers-color-scheme: dark)"
            content="#000000"
          />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          {/* https://github.com/whatwg/html/issues/4504 */}
          <meta name="supported-color-schemes" content="dark" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  };
}
