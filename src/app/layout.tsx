import { Sora } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
// import TransitionLayout from '../components/ui/PageTransition';
import "./globals.css";

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
          <main className="flex-grow">{children}</main>
        </div>
      </body>
    </html>
  );
}















// import './globals.css';
// import TransitionLayout from '../components/ui/PageTransition';
// import { Metadata } from 'next';

// export const metadata: Metadata = {
//   title: 'My Portfolio',
//   description: 'My awesome portfolio website',
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en">
//       <body>
//         <TransitionLayout>
//           {children}
//         </TransitionLayout>
//       </body>
//     </html>
//   );
// }
