import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body className="bg-mainPanel text-mainColor">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
