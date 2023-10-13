import "@/styles/globals.css";
import type { AppProps } from "next/app";
import DynamicTheme from "@/themes/DynamicTheme";

function App({ Component, pageProps }: AppProps) {
  return (
    <DynamicTheme>
      <Component {...pageProps} />
    </DynamicTheme>
  );
}

export default App;
