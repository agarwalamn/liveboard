import '../styles/globals.css';
import type { AppProps } from 'next/app';

import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer autoClose={2000} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
