import { League_Spartan, Montserrat } from "next/font/google";
import "./globals.css";

const leagueSpartan = League_Spartan({
  variable: "--font-league-spartan",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  preload: false,
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  preload: false,
});

export const metadata = {
  title: "Million Dollar Agent Blueprint | Tyron Ash International",
  description:
    "The definitive blueprint to building a 7-figure real estate career across the UK and Dubai.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
