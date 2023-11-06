import ThemeClient from "@/app/components/themes/ThemeClient";
import { Layout } from "@/app/components/layout";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <ThemeClient>
        <Head>
          <link
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            rel="stylesheet"
          />
          <title>Jungle</title>
        </Head>

        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeClient>
    </SessionProvider>
  );
}
