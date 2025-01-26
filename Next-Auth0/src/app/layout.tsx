import { UserProvider } from "@auth0/nextjs-auth0/client";
import NavBar from "@/Components/Navbar";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next Auth0 Application",
  description: "Next.JS Auth0 Application"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className={`mx-auto min-h-screen justify-center w-full`}
        >
          <NavBar />
          <div className="p-8">
            {children}
          </div>
        </body>
      </UserProvider>
    </html>
  )
};