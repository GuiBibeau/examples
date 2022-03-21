import "../styles/globals.css";
import { WenProvider } from "wen-connect";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WenProvider config={{ ssr: true }}>
      <Component {...pageProps} />
    </WenProvider>
  );
}

export default MyApp;
