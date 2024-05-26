import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import Script from "next/script";

const APP_KEY = process.env.KAKAO_APP_KEY || "";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "bora-n-maria",
  description: "당신의 결혼식을 위한 청첩장을 만들어보세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Toaster />
        {children}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
