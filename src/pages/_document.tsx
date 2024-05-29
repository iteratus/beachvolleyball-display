import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="de">
      <Head />
      <body className="flex items-center overflow-hidden h-screen bg-mainPanel text-mainColor">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
