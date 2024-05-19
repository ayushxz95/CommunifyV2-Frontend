'use client';
import { Inter } from "next/font/google";
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
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
          <Providers>{children}</Providers>
          <ToastContainer />
        </Provider>
      </body>
    </html>
  );
}
