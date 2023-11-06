import ThemeClient from "@/app/components/themes/ThemeClient";
import { Layout } from "@/app/components/layout";
import Head from "next/head";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeClient>
      <Head>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeClient>
  );
}
