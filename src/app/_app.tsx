import { AppProps } from "next/app";

import "../styles/globals.scss";
import "../styles/themes.mixin.scss";
import "../styles/global.styles.scss";
import "../components/Generic/components.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
