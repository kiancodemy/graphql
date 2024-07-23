import type { Metadata } from "next";
import { ApolloWrapper } from "@/app/Apolowraper";
import "./globals.css";
import ToastProvider from "./Toastify";

export const metadata: Metadata = {
  title: "expense calculator",
  description: "you can calculate your exprenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-[100vh] flex flex-col">
        <ApolloWrapper>
          <ToastProvider>{children}</ToastProvider>
        </ApolloWrapper>
      </body>
    </html>
  );
}
