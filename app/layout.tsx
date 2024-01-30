import type { Metadata } from "next";
import "../assets/css/main.css";

export const metadata: Metadata = {
  title: "Findash: Financial Control",
  description: "Hired",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
