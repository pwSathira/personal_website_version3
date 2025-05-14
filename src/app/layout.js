import { Inter } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "../components/NavigationWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: 'Sathira Williams | Software Engineer',
  description: 'Personal website of Sathira Williams, a Software Engineer and Fullstack Developer based in Vancouver, Canada',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`min-h-screen bg-black text-white ${inter.className} overscroll-none`}>
        <NavigationWrapper />
        <main className="pt-20">
          {children}
        </main>
      </body>
    </html>
  );
}
