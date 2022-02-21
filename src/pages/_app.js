import { TwitterProvider } from "../context/TwitterContext";
import "../styles/globals.css";
import "../styles/hexStyles.css";

function MyApp({ Component, pageProps }) {
  return (
    <TwitterProvider>
      <Component {...pageProps} />
    </TwitterProvider>
  );
}

export default MyApp;
