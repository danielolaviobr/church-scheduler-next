import "../styles/global.css";
import "../styles/pages/admin-celula-page.css";
import "../styles/pages/admin-galeria-page.css";
import "../styles/pages/admin-page.css";
import "../styles/pages/celula-page.css";
import "../styles/pages/galeria-page.css";
import "../styles/pages/landing-page.css";
import "react-datepicker/dist/react-datepicker.css";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
