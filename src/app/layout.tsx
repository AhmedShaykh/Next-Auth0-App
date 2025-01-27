import { ThemeProvider } from "@/Components/ThemeProvider";
import ContextProvider from "@/Components/ContextProvider";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Full Stack Pokeman App",
  description: "Full Stack Next.JS Auth0 Pokeman Application"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <UserProvider>
          <ContextProvider>
            <body>
              {children}
            </body>
          </ContextProvider>
        </UserProvider>
      </ThemeProvider>
    </html>
  )
};