import type { Metadata } from "next";
import { JetBrains_Mono, Montserrat, Geist } from "next/font/google";
import { Toaster } from "sonner";
import { AuthGate } from "@/components/auth-gate";
import "./globals.css";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ServeAI POS",
  description: "AI-powered hotel ordering and POS SaaS frontend.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", montserrat.variable, jetBrainsMono.variable, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col font-sans">
        <AuthGate>{children}</AuthGate>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
