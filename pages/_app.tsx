import Layout from "@/components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "@/theme/theme";
import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/700.css";
import Toaster from "@/components/Helpers/toaster";

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
};

export default App;
