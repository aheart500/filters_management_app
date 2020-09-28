import "../styles/globals.css";
import "../styles/customGlobal.css";
import { ApolloProvider } from "@apollo/client";
import apolloClient from "../utils/ApolloClient";
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
