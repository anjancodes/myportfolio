import { Sora } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";
import TransitionLayout from "@/components/layout/TransitionLayout";
import Footer from "@/components/layout/Footer";

const sora = Sora({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sora",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={sora.variable}>
      <body className={`${sora.className} relative min-h-screen bg-black`}>
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <TransitionLayout>
            <main className="flex-grow">{children}</main>
          </TransitionLayout>
          {/* <Footer /> */}
        </div>
      </body>
    </html>
  );
}
