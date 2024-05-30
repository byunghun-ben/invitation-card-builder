import { cn } from "@/lib/utils";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import Script from "next/script";
import { Toaster } from "react-hot-toast";
import "./globals.css";
import { ContainerWidthProvider } from "./[id]/model/ContainerWidthContext/ContainerWidthContext";

const APP_KEY = process.env.KAKAO_APP_KEY || "";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

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
    <html lang="ko" suppressHydrationWarning>
      <body
        data-component="Container"
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          fontSans.variable,
        )}
      >
        <Toaster />
        {children}
        <Script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${APP_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
        <SpeedInsights />
      </body>
    </html>
  );
}
