import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "SepsisLearn",
  description: "Learn about sepsis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-white">
      <head><link rel="icon" href="/favicon.ico" sizes="any" /></head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
