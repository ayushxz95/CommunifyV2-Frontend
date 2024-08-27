'use client';
import Navbar from "@/components/navBar";
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from '../store/store';
import Providers from "./auth/providers";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider store={store}>
          <Navbar></Navbar>
          <Providers>{children}</Providers>
          <ToastContainer
            position="bottom-right"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Provider>
      </body>
    </html>
  );
}
