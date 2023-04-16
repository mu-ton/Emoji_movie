import "@/styles/globals.css";
import { BIZ_UDGothic } from "@next/font/google";

const biz = BIZ_UDGothic({ preload: false, weight: "400" });

export default function App({ Component, pageProps }) {
  return (
    <div data-theme="bumblebee">
      <Component {...pageProps} />
      <style jsx global>
        {`
          :root {
            --font-biz: ${biz.style.fontFamily};
          }
        `}
      </style>
    </div>
  );
}
