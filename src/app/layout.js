import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const pixelify_sans = Pixelify_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Sliding Puzzle",
  description:
    "Enjoy a classic sliding puzzle game with various difficulty levels and engaging challenges!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={pixelify_sans.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
