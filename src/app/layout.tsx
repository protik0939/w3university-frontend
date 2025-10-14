import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "./globals.css";
import TopNavBar from "@/Components/NavBar/TopNavBar";
import { LocaleProvider } from "@/lib/LocaleContext";
import IntlProvider from "@/Components/Providers/IntlProvider";


const hindSiliguri = Hind_Siliguri({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // normal, medium, bold
  variable: "--font-hind-siliguri",
});

export const metadata: Metadata = {
  title: "W3University",
  description: "W3University — Learn to Code. Build the Future.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="./assets/icons/icon.svg"
          type="image/<generated>"
          sizes="<generated>"
        />
      </head>
      <body className={`${hindSiliguri.className} antialiased`}>
        <LocaleProvider>
          <IntlProvider>
            <TopNavBar />
            {children}
          </IntlProvider>
        </LocaleProvider>
      </body>
    </html>
  );
}
