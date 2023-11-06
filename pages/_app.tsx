import ThemeClient from "@/app/components/themes/ThemeClient";
import { Layout } from "@/app/components/layout";

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeClient>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeClient>
  );
}
