import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "@/styles/globals.css";

import { activeColorScheme } from "@/config/theme";
import { env } from "@/lib/env";
import { AppProviders } from "@/shared/components/providers/app-providers";
import { Toaster } from "@/shared/components/ui/sonner";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${env.NEXT_PUBLIC_APP_NAME} | Operations`,
    template: `%s | ${env.NEXT_PUBLIC_APP_NAME}`,
  },
  description: "OVI enterprise operations platform for short-term rental teams.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning data-color-scheme={activeColorScheme}>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
        <AppProviders>{children}</AppProviders>
        <Toaster />
      </body>
    </html>
  );
}
