import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" suppressHydrationWarning>
      <Head />
      <body className="h-[600px] overflow-hidden">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
