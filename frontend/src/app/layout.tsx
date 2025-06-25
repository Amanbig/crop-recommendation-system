import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";



export const metadata: Metadata = {
  title: "CropAI",
  description: "Crop Recommendation System using AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
      >
        <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                  >
        {children}
                  </ThemeProvider>
      </body>
    </html>
  );
}
