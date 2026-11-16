import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

//metadata
export const metadata : Metadata = {
 title: "Notes app",
  description: "A simple notes application built with Next.js",
}

import NavigationBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider"
import { NotificationProvider } from "./components/NotificationContext"
import Notification from "./components/Notification"


export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
       
      <body className="min-h-screen bg-background text-foreground">
        <AuthSessionProvider>
          <NotificationProvider>
           <NavigationBar/>
           <Notification/>
         {children}
          </NotificationProvider>
        </AuthSessionProvider>
        </body>
    </html>
  );
}
