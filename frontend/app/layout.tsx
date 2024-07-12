import { Inter } from "next/font/google";
import "./globals.css";
import SessionWrapper from "@/app/components/SessionWrapper";
import NavigationBar from "@/app/components/global/NavigationBar";
import Footer from "@/app/components/global/Footer";


const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <SessionWrapper>
        <NavigationBar/>
        {children}
        <Footer/>
      </SessionWrapper>
      </body>
    </html>
  );
}
