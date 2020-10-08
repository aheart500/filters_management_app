import "../styles/globals.css";
import "../styles/customGlobal.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/ApolloClient";
import Head from "next/head";
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Head>
        <title>الإدارة</title>
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
