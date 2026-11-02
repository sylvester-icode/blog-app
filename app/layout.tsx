import NavigationBar from "./components/nav";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
       
      <body className="min-h-full flex flex-col">
         <NavigationBar/>
         {children}</body>
    </html>
  );
}
