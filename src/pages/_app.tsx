import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Lato } from "next/font/google";

const lato = Lato({ weight: "400", subsets: ["latin"] });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <style suppressHydrationWarning>{`
        html {
          font-family: ${lato.style.fontFamily};
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
};

export default App;
