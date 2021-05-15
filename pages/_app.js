import { initialState, useStore } from '../redux'
import { Provider } from "react-redux";

import '../styles/globals.css'
import { Header } from '../components/header';

function MyApp({ Component, pageProps }) {
  const store = useStore(initialState)

  return (
    <Provider store={store}>
      <Header />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
