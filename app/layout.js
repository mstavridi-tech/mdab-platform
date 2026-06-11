import { League_Spartan, Montserrat } from 'next/font/google';
import './globals.css';

const leagueSpartan = League_Spartan({
  subsets: ['latin'],
  variable: '--font-league-spartan',
  display: 'swap',
  preload: false,
});

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-montserrat',
  display: 'swap',
  preload: false,
});

export const metadata = {
  title: 'Million Dollar Agent Blueprint',
  description: "The system behind Dubai's top-performing real estate agents.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${leagueSpartan.variable} ${montserrat.variable}`}>
      <body>{children}</body>
    </html>
  );
}
