import { AppProps } from "next/app";

import "../styles/global.styles.scss";
// щас проблема что .box не применяется на LatestNewsTabs, видимо глобльный класс .box либо не добавляется в scss на этой страничке (хотя на тросчке 4 подключен), либо .box класс опускается

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
