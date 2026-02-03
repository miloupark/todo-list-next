import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/common/Header";

export const metadata: Metadata = {
  title: "Todo App",
  description: "Next.js Todo Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <Header />
        <main className="mx-auto max-w-312">{children}</main>
      </body>
    </html>
  );
}
