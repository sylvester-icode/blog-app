import NavigationBar from "./components/NavBar";
import AuthSessionProvider from "./components/SessionProvider"

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
       
      <body className="min-h-full flex flex-col">
        <AuthSessionProvider>
           <NavigationBar/>
         {children}

        </AuthSessionProvider>
        </body>
    </html>
  );
}
