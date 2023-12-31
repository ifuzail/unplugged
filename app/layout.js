import "./globals.css";
import { Toaster } from "@/app/components/ui/toaster";
import AuthProvider  from "@/context/AuthContext";
import { QueryProvider } from "@/lib/react-query/QueryProvider";

export const metadata = {
  title: "Unplugged | social media platform built ontop of Next js.",
  description:
    "A social media app made with Next js, React Query and appwrite cloud.",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className="custom-scrollbar">
        <main>
          <QueryProvider>
            <AuthProvider>
              { children }
            </AuthProvider>
          </QueryProvider>
        </main>
        <Toaster />
      </body>
    </html>
  );
}
