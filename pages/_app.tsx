import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
const queryClient = new QueryClient();
export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />;
        <ToastContainer />
      </QueryClientProvider>
    </SessionProvider>
  )
}
