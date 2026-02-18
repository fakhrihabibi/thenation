import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "THE NATION | Premium Event Organizer",
  description:
    "The Nation is a premium event organizer specializing in concerts, festivals, corporate events, and private parties. We create unforgettable experiences with world-class production.",
  keywords: [
    "event organizer",
    "concert production",
    "festival planning",
    "premium events",
    "jakarta events",
  ],
  openGraph: {
    title: "THE NATION | Premium Event Organizer",
    description:
      "Creating unforgettable experiences with world-class production quality.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.variable} ${spaceGrotesk.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
