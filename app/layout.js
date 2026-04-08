import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Abin KJ | Senior Full Stack Engineer",
  description: "Interactive 3D portfolio of Abin KJ, a Senior Full Stack Engineer specializing in React, Next.js, and high-performance digital ecosystems.",
  openGraph: {
    title: "Abin KJ | Senior Full Stack Engineer",
    description: "Engineering Digital Excellence with React, Next.js, and Immersive 3D Experiences.",
    url: "https://abinkj.vercel.app",
    siteName: "Abin KJ Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Abin KJ | Full Stack Digital Engineer",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abin KJ | Senior Full Stack Engineer",
    description: "Engineering Digital Excellence with React, Next.js, and Immersive 3D Experiences.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased scroll-smooth`}
    >
      <body className="min-h-full flex flex-col bg-white overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
