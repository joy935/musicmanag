import type { Metadata } from "next";
import { Noto_Serif, Roboto } from "next/font/google";
import "./globals.css";
import Header from "./components/ui/Header";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Music Playlist Manager",
  description: "Create and manage your music playlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${notoSerif.variable} ${roboto.variable} antialiased`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
